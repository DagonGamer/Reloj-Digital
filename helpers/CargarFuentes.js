var CargarFuentes = () => {

    let css = document.createElement("style");

    for (let fuente of Object.keys(OpcionesFuentes))
        for (let opcion of OpcionesFuentes[fuente])
            css.innerHTML += `
                @font-face {
                    font-family: '${texto.Fuente.Nombre}-${texto.Fuente.Modo}';
                    src: url("Fuentes/${texto.Fuente.Nombre}/${texto.Fuente.Nombre}-${texto.Fuente.Modo}");
                }
            `;

    document.querySelector("body").appendChild(css);

}