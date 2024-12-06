function loadPage(pageUrl) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main-content").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", pageUrl, true);
    xhttp.send();
    if (pageUrl == "articles.html") {
        filterCards("all");
    }
}

function filterCards(tag) {
    var cards = document.getElementsByClassName("article-item");
    var filters = document.querySelectorAll('#filters button');

    setTimeout(function () {
        filters.forEach(button => {
            if (button.className === 'filter-' + tag) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });

        for (var i = 0; i < cards.length; i++) {
            var tags = cards[i].getAttribute("data-tags");
            if (tag === "all" || tags.includes(tag)) {
                cards[i].style.display = ""; // Show card
            } else {
                cards[i].style.display = "none"; // Hide card
            }
        }
    }, 50);
}

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
window.onload = function() {
    loadMediumArticles();
};
const basePath = "images/Photography/";
const categories = {
    "Flowers": ["flower1.jpg", "flower2.jpg", "flower3.jpg"],  // Example filenames
    "Skys": ["sky1.jpg", "sky2.jpg", "sky3.jpg"],
    "Sunsets": ["sunset1.jpg", "sunset2.jpg", "sunset3.jpg"]
};

function loadImagesFromCategory(category) {
    const images = categories[category];
    const selectedImages = [];
    const numImages = 3; // Change this to display more or fewer images

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
    container.innerHTML = ''; // Clear existing content

    Object.keys(categories).forEach(category => {
        const imagePaths = loadImagesFromCategory(category);
        imagePaths.forEach(path => {
            const imgElement = document.createElement('img');
            imgElement.src = path;
            imgElement.alt = `${category} image`;
            container.appendChild(imgElement);
        });
    });
}

// Function to load content dynamically into the main section
function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('main-content').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading page:', error);
    });
}

// Load "about.html" by default when the page loads
window.addEventListener('DOMContentLoaded', () => {
  loadPage('about.html');
});

window.onload = displayImages;
