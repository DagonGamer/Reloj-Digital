let importarImagenOCarpeta = async datos => {
    if (datos.action != "picked")
        return;
    for (let doc of datos.docs)
        if (!noSeleccionables.includes(doc.id))
            Config.Imagenes.push({
                Tipo: doc.mimeType == "application/vnd.google-apps.folder" ? "Carpeta" : "Imagen",
                Espacio: "drive",
                ID: doc.id,
                Estilo: "Estilo por defecto"
            });
    Notificar("Se han añadido las selecciones. Guarda la configuración.")
}

var anadirImagenesOCarpetas = async () => {

    let vista = new google.picker.DocsView(google.picker.ViewId.DOCS)
        // 1. Fija la carpeta raíz al abrir
        .setParent('root')
        // 2. Permite navegar y seleccionar carpetas
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true)
        // 3. Solo muestra MIME types de imagen
        .setMimeTypes('image/png,image/jpeg,image/jpg,image/gif,image/webp');

    pickr = new google.picker.PickerBuilder()
        .addView(vista)
        .setOAuthToken(accessToken)
        .setDeveloperKey('AIzaSyCO7_To8On1vcHoEcjWbMDnOlFPkj-KRbo')
        .setCallback(importarImagenOCarpeta)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId('808752279453-v65b4epu2pjqj8ee5qnj2fe9l7odgqpg.apps.googleusercontent.com')
        .build();
        
    pickr.setVisible(true);
}