var Notificar = (info) => {

    let div = document.createElement("div");
    div.innerHTML = `
        <button>x</button>
        <p>${info}</p>
    `;
    document.querySelector("div.Notification").appendChild(div);

}