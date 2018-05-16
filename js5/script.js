var div_array = []
var height_array = []
var div_names = []
var text_names = []
var largura, botao;

window.onload = function () {

    div_names = ['d1', 'd2', 'd3', 'd4', 'd5']
    text_names = ['a1', 'a2', 'a3', 'a4', 'a5']

    for (var i = 0; i < 5; i++) {
        div_array[i] = document.getElementById(div_names[i]);
        height_array[i] = document.getElementById(text_names[i]);
    }

    largura = document.getElementById("largura");
    botao = document.getElementById("botao");

    botao.onclick = function () {
        var max_value = maxElement(height_array);
        for (var i = 0; i < 5; i++) {
            var div = div_array[i];
            var val_altura = height_array[i].value;
            var val_largura = largura.value;

            div.style.height = val_altura + "px";
            div.style.top = (max_value - parseInt(val_altura)).toString() + "px";
            div.style.width = val_largura + "px";
            div.style.backgroundColor = "red";
        }
    }
}

var maxElement = function (height_array) {
    var max = 0;
    for (var i = 0; i < 5; i++) {
        var value = parseInt(height_array[i].value);
        if (max < value)
            max = value;
    }
    return max;
}
