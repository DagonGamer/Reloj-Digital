var Notificar = (info) => {

    let div = document.createElement("div");
    div.innerHTML = `
        <button>x</button>
        <p>${info}</p>
    `;
    document.querySelector("div.Notification").insertBefore(div, document.querySelector("div.Notification div"));

    setTimeout(() => {
        div.style.opacity = 0;
        setTimeout(() => {
            div.style.height = "0px";
            setTimeout(div.remove, 600);
        }, 600);
    }, Config.retrasoNotificaciones*1000);

    div.querySelector("button").onclick = div.remove;

}