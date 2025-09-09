var Notificar = (info) => {

    let div = document.createElement("div");
    div.innerHTML = `
        <button>x</button>
        <p>${info}</p>
    `;
    document.querySelector("div.Notification").insertBefore(div, document.querySelector("div.Notification div"));

    setTimeout(() => {
        div.style.opacity = 0;
        div.style.margin = "-" + div.getBoundingClientRect().height/2 + "px 0px";
        setTimeout(() => div.remove(), 600);
    }, Config.retrasoNotificaciones*1000);

    div.querySelector("button").onclick = () => div.remove();

}