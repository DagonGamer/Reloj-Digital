var Config, OrdenFotos, IntervaloCarga, IdxImagen = 0;

var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var Start = async () => {

    tokenClient.callback = async () => {

        let accessToken = gapi.client.getToken().access_token;

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
            await SubirConfiguracion();

            // Reactualiza los archivos
            ArchivosDataFolder = await gapi.client.drive.files.list({
                pageSize: 10,
                spaces: "AppDataFolder"
            });
        }

        // Carga la configuración
        console.log("Cargando Configuración...");
        await gapi.client.request({
            path: `/drive/v3/files/${ArchivosDataFolder.result.files[0].id}`,
            method: 'GET',
            params: { alt: 'media' }
        }).then(res => Config = JSON.parse(res.body))
        console.log(Config);

        // Organiza el orden de las fotos
        console.log("Organizando fotos...");
        await OrganizarFotos();
        shuffleArray(OrdenFotos);

        CargarImagen("div.Reloj.NoWaiting");
        CargarImagen("div.Reloj.Waiting");
        IntervaloCarga = setInterval(CambiarImagen, Config.Delay*1000);

    }

}

/* Para subir archivo

fileName    = 'mi-config.json';
      fileContent = JSON.stringify({ ultimaVisita: Date.now(), prefs: { theme: 'dark' } }, null, 2);

      // Metadata para Drive
      metadata = {
        name: fileName,
        parents: ['appDataFolder']
      };

      // Para multipart necesitamos un FormData
      form = new FormData();
      form.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );
      form.append(
        'file',
        new Blob([fileContent], { type: 'application/json' })
      );

      // Token de acceso

      // Llamada HTTP multipart
      response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
        {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + gapi.client.getToken().access_token },
          body: form
        }
      );

*/

/* Elimina todos los archivos
async function deleteAppDataFiles() {
      try {
        // 1. Listar archivos en appDataFolder
        const listRes = await gapi.client.drive.files.list({
          spaces: 'appDataFolder',
          fields: 'files(id, name)'
        });
        const files = listRes.result.files;

        if (!files || files.length === 0) {
          alert('No hay archivos en appDataFolder.');
          return;
        }

        // 2. Eliminar cada archivo
        for (const file of files) {
          try {
            await gapi.client.drive.files.delete({ fileId: file.id });
            console.log(`Eliminado: ${file.name} (${file.id})`);
          } catch (err) {
            console.error(`Error eliminando ${file.name}:`, err);
          }
        }

        alert(`Proceso completado. Se procesaron ${files.length} archivos.`);
      } catch (err) {
        console.error('Error listando o eliminando archivos:', err);
        alert('Ocurrió un error. Revisa la consola para más detalles.');
      }
    }

*/

/*
 *
 * Actualiza el contenido y/o nombre de un archivo en appDataFolder.
 *
 * @param {string} fileId      ID del archivo en Drive.
 * @param {string} newName     Nuevo nombre (puede ser el mismo que el actual).
 * @param {string|Blob} content Nuevo contenido: cadena JSON u otro Blob.
 * @returns {Promise<Object>}   Promesa con los metadatos del archivo actualizado.
 *
async function updateAppDataFile(fileId, newName, content) {
  // 1. Configura metadata si quieres renombrar
  const resource = { name: newName };

  // 2. Define el media con el contenido y su tipo MIME
  const media = {
    mimeType: typeof content === 'string' ? 'application/json' : content.type || 'application/octet-stream',
    body: typeof content === 'string' ? content : content
  };

  // 3. Ejecuta la llamada de actualización
  const response = await gapi.client.drive.files.update({
    fileId: fileId,
    resource: resource,
    media: media,
    fields: 'id, name, modifiedTime'
  });

  // 4. Retorna el resultado
  return response.result;
}
*/

/*
 * Descarga el contenido bruto de un archivo de appDataFolder.
 *
 * @param {string} fileId  ID del archivo en Drive.
 * @returns {Promise<string|ArrayBuffer>}  Texto plano o datos binarios.
 *
async function readAppDataFileWithGapi(fileId) {
  // Hacemos la petición GET con alt=media para recuperar solo el contenido
  const response = await gapi.client.request({
    path: `/drive/v3/files/${fileId}`,
    method: 'GET',
    params: { alt: 'media' }
  });

  // gapi devuelve el cuerpo en response.body
  return response.body;
}

// Ejemplo de uso
readAppDataFileWithGapi('TU_FILE_ID')
  .then(content => {
    // Si es JSON
    const data = JSON.parse(content);
    console.log('Contenido JSON:', data);
  })
  .catch(err => console.error('Error descargando:', err));
*/