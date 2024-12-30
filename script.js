// Load page content dynamically
function loadPage(page) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) loadingIndicator.style.display = 'block';
  
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('main-content').innerHTML = data;
  
        if (page === 'articles.html') {
          initializeFilters();
          reverseArticles();
        }
      })
      .catch(error => {
        console.error('Error loading page:', error);
        document.getElementById('main-content').innerHTML = '<p>Sorry, an error occurred while loading the page.</p>';
      })
      .finally(() => {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
      });
  }
  
  // Initialize filter buttons
  function initializeFilters() {
    const filters = document.querySelectorAll('#filters button');
    filters.forEach(button => {
      button.addEventListener('click', () => {
        // Remove 'selected' class and update ARIA
        filters.forEach(btn => {
          btn.classList.remove('selected');
          btn.setAttribute('aria-pressed', 'false');
        });
        // Add 'selected' class and update ARIA
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
        // Filter articles
        filterCards(button.getAttribute('data-tag'));
      });
    });
    // Show all articles by default
    filterCards('all');
  }
  
  // Filter articles based on tag
  function filterCards(tag) {
    const articles = document.querySelectorAll('.article-item');
    articles.forEach(article => {
      const tags = article.getAttribute('data-tags').split(' ');
      if (tag === 'all' || tags.includes(tag)) {
        article.style.display = 'flex';
      } else {
        article.style.display = 'none';
      }
    });
  }
  
  // Reverse the order of articles
  function reverseArticles() {
    const container = document.querySelector('.articles-container');
    const articles = Array.from(container.children);
    articles.reverse().forEach(article => container.appendChild(article));
  }
  
  // Load Medium articles
  function loadMediumArticles() {
    fetch('https://api.medium.com/@yourusername/latest')
      .then(response => response.json())
      .then(data => {
        const articles = data.map(article => `
          <article>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </article>
        `).join('');
        document.getElementById('medium-articles').innerHTML = articles;
      })
      .catch(error => console.error('Error loading Medium articles:', error));
  }
  
  // Image Categories
  const basePath = "images/Photography/";
  const categories = {
    "Flowers": ["flower1.jpg", "flower2.jpg", "flower3.jpg"],
    "Skys": ["sky1.jpg", "sky2.jpg", "sky3.jpg"],
    "Sunsets": ["sunset1.jpg", "sunset2.jpg", "sunset3.jpg"]
  };
  
  function loadImagesFromCategory(category) {
    const images = categories[category];
    const selectedImages = [];
    const numImages = 3;
  
    while (selectedImages.length < numImages) {
      const randomIndex = Math.floor(Math.random() * images.length);
      if (!selectedImages.includes(images[randomIndex])) {
        selectedImages.push(images[randomIndex]);
      }
    }
  
    return selectedImages.map(image => `${basePath}${category}/${image}`);
  }
  
  function displayImages() {
    const container = document.querySelector('.photo-grid');
    if (!container) return;
    container.innerHTML = '';
  
    Object.keys(categories).forEach(category => {
      const imagePaths = loadImagesFromCategory(category);
      imagePaths.forEach(path => {
        const imgElement = document.createElement('img');
        imgElement.src = path;
        imgElement.alt = `${category} image`;
        imgElement.loading = 'lazy';
        container.appendChild(imgElement);
      });
    });
  }
  
  // Load "about.html" by default when the page loads
  window.addEventListener('DOMContentLoaded', () => {
    loadPage('about.html');
    loadMediumArticles();
    displayImages();
  });
  