var Notificar = (info) => {

    let div = document.createElement("div");
    div.innerHTML = `
        <button>x</button>
        <p>hfdsklkfds</p>
    `;
    document.querySelector("div.Notification").insertBefore(div, document.querySelector("div.Notification div"));
	div.style.position = "absolute";
	div.style.margin = "-" + div.getBoundingClientRect().height + "px 0px";
	div.style.top = "-50dvh";
	div.style.transition = "all 0.5s";

	setTimeout(() => {
		div.style.margin = "0.5rem 0px";
		div.style.position = "relative";
		div.style.top = "0dvh";
    }, 100);

    setTimeout(() => {
        div.style.opacity = 0;
        div.style.margin = "-" + div.getBoundingClientRect().height/2 + "px 0px";
        setTimeout(() => div.remove(), 600);
    }, Config.retrasoNotificaciones*1000);

    div.querySelector("button").onclick = () => div.remove();

}