tokenClient.callback = async () => {

    // Busca la configuración en el drive
    var ArchivosDataFolder;
    try {
        ArchivosDataFolder = await gapi.client.drive.files.list({
            pageSize: 10,
            spaces: "AppDataFolder"
        });
    } catch (err) {
        console.error(err);
        return;
    }

    var ArchivoConfiguracion;
    // Existe configuración?
    if (ArchivosDataFolder.result.files.length == 0) {
        // Crear la configuración y cargarla
        try {
            console.log("Intentando subir archivo");
            fetch("./defaultConfig.json").then(async res => {
                ArchivoConfiguracion = await gapi.client.drive.files.create({
                    requestBody: {
                        space: "AppDataFolder",
                        parent: "root",
                        name: "config.json"
                    },
                    media: res.body.values()
                });
            });
        } catch (err) {
            console.error(err);
            return;
        }
    } else {
        // Cargar la configuración
    }



}

/*
    Buscar en la carpeta mi unidad
    await gapi.client.drive.files.list({
            pageSize: 10,
            spaces: "drive",
			q: "'root' in parents"
        });
    para buscar en otra carpeta escribir su ID entre las comillas simples
*/