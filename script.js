const divWebsite = document.querySelector(".website");
console.log(divWebsite);
const form = document.querySelector("form");
form.addEventListener('submit', addLink)
const indication = document.getElementById("indication");
const divAddLink = document.getElementById("addLink");
const divchangeLink = document.getElementById("changeLink");
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

    const button = document.createElement("button");
    button.setAttribute("class", "menu");
    button.addEventListener("click", openMenu);
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-ellipsis");

    const div = document.createElement("div");
    div.setAttribute("class", "title");
    div.innerHTML = title;

    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("onerror", srcOnerror);
    
    button.appendChild(icon);
    a.appendChild(button);
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
    divAddLink.style.opacity = "0"; 
    divAddLink.style.zIndex = "-100";
}

/* close frame généraliser */
function closeAddLink() {
    divAddLink.style.opacity = "0"; 
    divAddLink.style.zIndex = "-100" ;
}
function closechangeLink() {
    divchangeLink.style.opacity = "0"; 
    divchangeLink.style.zIndex = "-100" ;
}

/* open frame */
function openAddLink() {
    divAddLink.style.opacity = "1";
    divAddLink.style.zIndex = "100";
}

function openMenu(ev) {
    // const link = ev.target.parentNode.parentNode;
    // const url = link.getAttribute("href");
    // const title = link.lastChild.innerHTML;

}