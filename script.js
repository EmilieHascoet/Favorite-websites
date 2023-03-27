const indication = document.getElementById("indication");
let init = true;

// Function drop for websites
function dragover_handler(ev) {
    ev.preventDefault();
}

function drop_handler(ev) {
    ev.preventDefault();
    // Vérifie si l'utilisateur à glisser l'url dans le bon div
    const className = ev.target. getAttribute("class");
    if (className == "website") {
        // Récupère l'url et l'image(favicon) du site
        const data = ev.dataTransfer.getData("text/plain");
        const url = new URL(data);
        const src = "https://logo.clearbit.com/" + url.host;
        const srcOnerror = "this.onerror=null;this.src='http://www.google.com/s2/favicons?domain=" + url.href + " ' ";
        
        // Modifie le DOM, supprime l'indication et ajoute un link
        if (init == true) {
            ev.target.removeChild(indication); 
            init = false;
        }
        
        const a = document.createElement("a");
        a.setAttribute("href", data);
        a.setAttribute("target", "_blank");
        a.setAttribute("class", "link");
        const div = document.createElement("div");
        div.setAttribute("class", "title");
        div.innerHTML = url.hostname;
        const img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("onerror", srcOnerror);
    
        a.appendChild(img);
        a.appendChild(div);
        ev.target.appendChild(a);
    }
}