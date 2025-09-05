async function listAllFilesInFolder(folderId) {
  const allFiles = [];
  let pageToken = null;

  do {
    // Llamada a la API para esta página
    const res = await gapi.client.drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, mimeType)',
      pageSize: 1000,       // Máximo permitido por Drive
      pageToken: pageToken  // Token de la página anterior (null en la primera iteración)
    });

    // Acumula resultados
    const { files = [], nextPageToken } = res.result;
    allFiles.push(...files);

    // Prepara la siguiente iteración
    pageToken = nextPageToken;
  } while (pageToken);

  return allFiles;
}