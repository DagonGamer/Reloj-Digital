var Notificar = (info) => {

    let div = document.createElement("div");
    div.innerHTML = `
        <button>x</button>
        <p>${info}</p>
    `;
    document.querySelector("div.Notification").appendChild(div);

    setTimeout(() => {
        div.style.opacity = 0;
        setTimeout(() => div.remove(), 600);
    }, Config.retrasoNotificaciones*1000);

    div.querySelector("button").onclick = () => div.remove();

}