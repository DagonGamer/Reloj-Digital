let importarImagenOCarpeta = async datos => {
    console.log(datos);
}

var anadirImagenesOCarpetas = async () => {
    pickr = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.DOCS_IMAGES)
        .addView(google.picker.ViewId.FOLDERS)
        .addView(new google.picker
            .setQuery(Config.Imagenes.map(el => `not id = '${el.ID}'`).join(' and ')))
        .setOAuthToken(accessToken)
        .setDeveloperKey('AIzaSyCO7_To8On1vcHoEcjWbMDnOlFPkj-KRbo')
        .setCallback(importarImagenOCarpeta)
        .setAppId('808752279453-v65b4epu2pjqj8ee5qnj2fe9l7odgqpg.apps.googleusercontent.com')
        .build();
    pickr.setVisible(true);
}