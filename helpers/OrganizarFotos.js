let anadirFotosCarpeta = async (id, estilo) => {

    await listAllFilesInFolder(id)
        .then(async fotos => {
            
            for (let dato of fotos) {
                if (dato.mimeType === 'application/vnd.google-apps.folder')
                    await anadirFotosCarpeta(dato.id, estilo);
                else OrdenFotos.push([dato.id, estilo]);
            }

        });

}

var OrganizarFotos = async () => {

    OrdenFotos = [];

    for (let dato of Config.Imagenes) {
        if (dato.Tipo == "Imagen")
            OrdenFotos.push([dato.ID, dato.Estilo])
        else await anadirFotosCarpeta(dato.ID, dato.Estilo);
    }
    
    console.log("Orden de las fotos: ", OrdenFotos);

}