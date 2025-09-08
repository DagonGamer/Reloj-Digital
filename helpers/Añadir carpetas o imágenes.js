let importarImagenOCarpeta = async datos => {
    console.log(datos);
}

var anadirImagenesOCarpetas = async () => {

    let vista = new google.picker.DocsView(google.picker.ViewId.DOCS)
        // 1. Fija la carpeta raíz al abrir
        .setParent('root')
        // 2. Permite navegar y seleccionar carpetas
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true)
        // 3. Solo muestra MIME types de imagen
        .setMimeTypes('image/png,image/jpeg,image/jpg,image/gif,image/webp')
        .setQuery(Config.Imagenes.map(el => `not id = '${el.ID}'`).join(' and '));

    pickr = new google.picker.PickerBuilder()
        .addView(vista)
        .setOAuthToken(accessToken)
        .setDeveloperKey('AIzaSyCO7_To8On1vcHoEcjWbMDnOlFPkj-KRbo')
        .setCallback(importarImagenOCarpeta)
        .enableFeature(google.picker.Feature.MULTISELECT)
        .setAppId('808752279453-v65b4epu2pjqj8ee5qnj2fe9l7odgqpg.apps.googleusercontent.com')
        .build();
        
    pickr.setVisible(true);
}