function loadPage(pageUrl) {
    console.log("clicked...", pageUrl);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main-content").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", pageUrl, true);
    xhttp.send();
}

loadPage("cv.html");
