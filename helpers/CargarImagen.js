var CargarImagen = async (selector) => {

    let element = document.querySelector(selector);
    if (!OrdenFotos[IdxImagen][0].includes("blob:https")) 
        await IDaIMG(OrdenFotos[IdxImagen][0])
            .then(file => OrdenFotos[IdxImagen][0] = URL.createObjectURL(file));
    element.querySelector("img.Fondo").src = OrdenFotos[IdxImagen][0];

    IdxImagen++;
    if (IdxImagen == OrdenFotos.length)
        IdxImagen = 0;

}

var CambiarImagen = async () => {

    let NoWaiting = document.querySelector("div.Reloj.NoWaiting");
    let Waiting = document.querySelector("div.Reloj.Waiting");

    NoWaiting.style.opacity = 0;
    NoWaiting.classList.remove("NoWaiting");
    Waiting.classList.add("NoWaiting");
    Waiting.classList.remove("Waiting");
    NoWaiting.classList.add("Waiting");
    NoWaiting.style.opacity = 1;

    setTimeout(CambiarImagen, Config.Delay*1000);
    await CargarImagen("div.Reloj.Waiting");

}