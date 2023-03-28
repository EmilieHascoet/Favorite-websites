const divWebsite = document.querySelector(".website");
console.log(divWebsite);
const form = document.querySelector("form");
form.addEventListener('submit', addLink)
const indication = document.getElementById("indication");
const divAddLink = document.getElementById("addLink");
let init = true;


// Function drop for websites
function dragover_handler(ev) {
    ev.preventDefault();
}

function drop_handler(ev) {
    ev.preventDefault();
    // Vérifie si l'utilisateur à glisser l'url dans le bon div
    const className = ev.target.getAttribute("class");
    if (className == "website") {
        // Récupère l'url et l'image(favicon) du site
        const data = ev.dataTransfer.getData("text/plain");
        const url = new URL(data);
        newLink(url.hostname, url);
    }
}

function newLink(title, url) {
    // Cherche l'image du site à partir de son url
    const src = "https://logo.clearbit.com/" + url.host;
    const srcOnerror = "this.onerror=null;this.src='http://www.google.com/s2/favicons?domain=" + url.href + " ' ";

    // Modifie le DOM, supprime l'indication et ajoute un link
    if (init == true) {
        divWebsite.removeChild(indication); 
        init = false;
    }
    const a = document.createElement("a");
    a.setAttribute("href", url.href);
    a.setAttribute("target", "_blank");
    a.setAttribute("class", "link");
    const div = document.createElement("div");
    div.setAttribute("class", "title");
    div.innerHTML = title;
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("onerror", srcOnerror);
    
    a.appendChild(img);
    a.appendChild(div);
    divWebsite.appendChild(a);

}

function addLink(e) {
    e.preventDefault();
    // Récupère le formulaire où ont été entré les données, puis le numéro de card
    const form = e.target;
    // Récupère le titre et l'url du site
    const title = form.elements['title'].value;
    const data = form.elements['url'].value;
    const url = new URL(data);

    newLink(title, url);
    divAddLink.style.display="none" 
}

function hideAddLink() {
    divAddLink.style.display="none" 
}

function showAddLink() {
    divAddLink.style.display="block" 
}