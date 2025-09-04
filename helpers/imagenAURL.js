async function imagenAURL(fileId) {
    // 1. Lee metadata (nombre y mimeType)
    const metaRes = await gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'name,mimeType'
    });
    const { name, mimeType } = metaRes.result;

    // 2. Descarga contenido bruto
    const mediaRes = await gapi.client.request({
        path: `/drive/v3/files/${fileId}`,
        method: 'GET',
        params: { alt: 'media' }
    });
    const rawBody = mediaRes.body;

    // 3. Crea un Blob con el tipo MIME correcto
    const blob = new Blob([rawBody], { type: mimeType });

    // 4. Opcional: crear un File para mantener name + blob
    const file = new File([blob], name, { type: mimeType })

    return URL.createObjectURL(file);
}