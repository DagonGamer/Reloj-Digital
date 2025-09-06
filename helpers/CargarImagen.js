var DescargarImagenes = async () => {

    let Percentage = 0;
    console.log("Descargando imágenes...");
    for (let i = 0; i < OrdenFotos.length; i++) {
        if (!OrdenFotos[i][0].includes("blob:https"))
            await IDaIMG(OrdenFotos[i][0])
                .then(file => OrdenFotos[i][0] = URL.createObjectURL(file));
        document.querySelector("div.Menu div.Progress").style = `--Progress: ${i / OrdenFotos.length * 100};`;
        document.querySelector("div.Menu p.Porcentaje").innerText = `${Math.floor(i / OrdenFotos.length * 1000) / 10}%`;
        if (Percentage != Math.floor(i / OrdenFotos.length * 10) * 10) {
            Percentage = Math.floor(i / OrdenFotos.length * 10) * 10;
            console.log(`${Percentage}% de las imágenes cargadas.`);
        }
    }

}

var CargarImagen = async (selector) => {
    
    let element = document.querySelector(selector);

    // Busca el estilo de la imagen
    let Estilo = Config.Estilos.find(el => el.Nombre == OrdenFotos[IdxImagen][1]);

    // Carga la imagen
    if (!OrdenFotos[IdxImagen][0].includes("blob:https"))
        await IDaIMG(OrdenFotos[IdxImagen][0])
            .then(file => OrdenFotos[IdxImagen][0] = URL.createObjectURL(file));
    element.querySelector("img.Fondo").src = OrdenFotos[IdxImagen][0];

    // Carga los textos
    for (let i = 0; i < Estilo.Textos.length; i++) {
        let texto = Estilo.Textos[i];

        let nuevoTexto = document.createElement("p");
        nuevoTexto.setAttribute("Input", texto.Contenido);
        nuevoTexto.style.height = texto.Altura;
        nuevoTexto.style.width = texto.Ancho;

        switch (texto.AnclajeX) {
            case "Derecha":
                nuevoTexto.style.right = texto.DesplazamientoX;
                break;
            case "Izquierda":
                nuevoTexto.style.left = texto.DesplazamientoX;
                break;
        }

        switch (texto.AnclajeY) {
            case "Arriba":
                nuevoTexto.style.top = texto.DesplazamientoY;
                break;
            case "Abajo":
                nuevoTexto.style.bottom = texto.DesplazamientoY;
                break;
        }

        nuevoTexto.style.fontSize = texto.Tamano;
        nuevoTexto.style.color = texto.Color;
        nuevoTexto.style.opacity = texto.Opacidad;
        nuevoTexto.style.textAlign = texto.Alineamiento;
        nuevoTexto.style.fontFamily = `'${texto.Fuente.Nombre}-${texto.Fuente.Modo}'`;

        if (texto.Sombra.Display)
            nuevoTexto.style.textShadow = `${texto.Sombra.Color} ${texto.Sombra.DesplazamientoX} ${texto.Sombra.DesplazamientoY} ${texto.Sombra.RadioDesenfoque}`;

        if (texto.Contorno.Display) {
            nuevoTexto.style.padding = texto.Contorno.Padding;
            nuevoTexto.style.background = texto.Contorno.Color;
            nuevoTexto.style.borderRadius = texto.Contorno.Redondeo;
            if (texto.Contorno.Sombra.Display)
                nuevoTexto.style.boxShadow = `${texto.Contorno.Sombra.DesplazamientoX} ${texto.Contorno.Sombra.DesplazamientoY} ${texto.Contorno.Sombra.RadioDesenfoque} ${texto.Contorno.Sombra.Aumento} ${texto.Contorno.Sombra.Color}`;
        }
        element.appendChild(nuevoTexto);

    }

    // Actualiza el índice
    IdxImagen++;
    if (IdxImagen == OrdenFotos.length)
        IdxImagen = 0;
    ActualizarTextos();

}

var CambiarImagen = async () => {

    document.querySelector("div.Reloj.NoWaiting").remove();

    let Waiting = document.querySelector("div.Reloj.Waiting");
    Waiting.classList.add("NoWaiting");
    Waiting.classList.remove("Waiting");

    let NewWaiting = document.createElement("div");
    NewWaiting.className = "Reloj Waiting";
    NewWaiting.innerHTML = "<img class=\"Fondo\">";
    document.querySelector("body").appendChild(NewWaiting);

    setTimeout(CambiarImagen, Config.Delay * 1000);
    console.log("Imagen cambiada.");
    await CargarImagen("div.Reloj.Waiting");

}