var CargarImagen = async (selector) => {

    let element = document.querySelector(selector);
    if (OrdenFotos[IdxImagen][0].contains("blob:https")) 
        await IDaIMG(OrdenFotos[IdxImagen][0])
            .then(file => OrdenFotos[IdxImagen][0] = URL.createObjectURL(file));
    element.querySelector("img.Fondo").src = OrdenFotos[IdxImagen][0];
    IdxImagen++;

}