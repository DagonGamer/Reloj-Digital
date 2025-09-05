var SubirConfiguracion = async () => {
    // Crear la configuración
    try {
        console.log("Subiendo Configuración...");
        
        let accessToken = gapi.client.getToken().access_token;

        // Coge la configuración
        let defaultConfig;
        await fetch("./defaultConfig.json")
            .then(res => res.blob())
            .then(blob => defaultConfig = blob)

        // Escribe los metadatos
        let metadata = {
            name: "Config.json",
            parents: ['appDataFolder']
        };

        // Crea los datos para el body
        let form = new FormData();
        form.append(
            'metadata',
            new Blob([JSON.stringify(metadata)], { type: 'application/json' })
        );
        form.append(
            'file',
            defaultConfig
        );

        // Llamada HTTP para subir archivo
        let response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
            {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + accessToken },
                body: form
            }
        );

        console.log(response)

    } catch (err) {
        console.error(err);
        return;
    }
}