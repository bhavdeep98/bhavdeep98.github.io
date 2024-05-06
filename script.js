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
        filterCards("tag1");
    }
}

window.onload = function () {
    loadPage("about.html");
};

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
