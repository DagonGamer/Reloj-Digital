tokenClient.callback = async () => {

    // Busca la configuración en el drive
    let ArchivosDataFolder;
    try {
        ArchivosDataFolder = await gapi.client.drive.files.list({
            pageSize: 10,
            spaces: "AppDataFolder"
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }

    console.log(ArchivosDataFolder.data);

}