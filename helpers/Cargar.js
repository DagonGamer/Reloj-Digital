var CargarFuentes = () => {

    let css = document.createElement("style");

    for (let fuente of Object.keys(OpcionesFuentes))
        for (let opcion of OpcionesFuentes[fuente])
            css.innerHTML += `
                @font-face {
                    font-family: '${fuente}-${opcion}';
                    src: url("Fuentes/${fuente}/${fuente}-${opcion}");
                }
            `;

    document.querySelector("body").appendChild(css);

}

var CargarInputsConfiguracion = () => {

    document.querySelector("input.Delay").value = Config.Delay;
    document.querySelector("input.DelayNotificaciones").value = Config.retrasoNotificaciones;

}