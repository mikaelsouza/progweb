var raio, area, circ, botao;

window.onload = function () {
    raio = document.getElementById("raio");
    area = document.getElementById("area");
    circ = document.getElementById("circ");
    botao = document.getElementById("botao");

    botao.onclick = function () {
        var val_raio = parseFloat(raio.value);
        var val_area = Math.PI * val_raio * val_raio;
        var val_circ = Math.PI * 2 * val_raio;

        area.value = val_area;
        circ.value = val_circ;
    };
};

