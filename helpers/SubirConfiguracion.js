var SubirConfiguracion = async () => {
    // Crear la configuración
    try {
        console.log("Subiendo Configuración...");

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

var ActualizarConfiguracion = async () => {

    const fileId = await gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        q: `name = 'Config.json' and trashed = false`,
        fields: 'files(id, name, mimeType)',
        pageSize: 1
    }).result.files[0].id;

    const form = new FormData();
    form.append(
        'metadata',
        new Blob([JSON.stringify({})], { type: 'application/json' })
    );
    form.append(
        'file',
        new Blob([JSON.stringify(Config)], { type: 'application/json' })
    );

    // 4. Llamada PATCH para actualizar
    await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart&fields=id,name,modifiedTime`,
        {
            method: 'PATCH',
            headers: { Authorization: 'Bearer ' + accessToken },
            body: form
        }
    );
}