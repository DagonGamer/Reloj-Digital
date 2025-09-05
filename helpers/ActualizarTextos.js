var ActualizarTextos = () => {

    for (let reloj of document.querySelectorAll("div.Reloj"))
        for (let texto of reloj.querySelectorAll("p")) {
            let Partes = texto.getAttribute("Input").split("$");
            let info = Partes[0];
            for (let i = 1; i < Partes.length; i+=2)
                info += VariablesTextos[Partes[i]]() + Partes[i+1];
            texto.innerText = info;
        }

}