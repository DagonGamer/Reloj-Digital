let anadirFotosCarpeta = async (id, estilo) => {

    await listAllFilesInFolder(id)
        .then(async fotos => {
            
            for (let dato of fotos) {
                if (dato.mimeType === 'application/vnd.google-apps.folder') {
                    TotalCarpetas++;
                    await anadirFotosCarpeta(dato.id, estilo);
                } else if (dato.mimeType.includes("image")) {
                    TotalImagenes++;
                    OrdenFotos.push([dato.id, estilo]);
                }
            }

        });

}

var OrganizarFotos = async () => {

    OrdenFotos = [];

    document.querySelector("p.ContadorSelecciones").innerText = `${Config.Imagenes.length} selecci${Config.Imagenes.length == 1 ? "ón" : "ones"}`;
    for (let dato of Config.Imagenes) {
        if (dato.Tipo == "Imagen") {
            OrdenFotos.push([dato.ID, dato.Estilo])
            TotalImagenes++;
        } else {
            TotalCarpetas++;
            await anadirFotosCarpeta(dato.ID, dato.Estilo);
        }
    }
    
    document.querySelector("p.ContadorImagenesCarpetas").innerText = `${TotalImagenes} foto${TotalImagenes == 1 ? "" : "s"} en ${TotalCarpetas} carpeta${TotalCarpetas == 1 ? "": "s"}`;
    console.log("Orden de las fotos: ", OrdenFotos);

}