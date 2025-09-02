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

    // Existe configuración?
    if (ArchivosDataFolder.result.files.length == 0) {
        // Crear la configuración y cargarla
    } else {
        // Cargar la configuración
    }



}