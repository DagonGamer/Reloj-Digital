async function IDaIMG(fileId) {
    // 1. Obtén metadata para saber el mimeType y nombre
    const meta = await gapi.client.drive.files.get({
        fileId,
        fields: 'name,mimeType'
    });
    const { name, mimeType } = meta.result;

    // 2. Descarga el contenido real como Blob
    const token = gapi.client.getToken().access_token;
    const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
            headers: { Authorization: 'Bearer ' + token }
        }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const blob = await res.blob();

    // 3. Crea un File (mantiene el nombre y tipo)
    return new File([blob], name, { type: mimeType });
}