// Código executado via nodejs

var someFn, adicionar;

(function () {
    var val = 0;
    someFn = function (val) {
        this.val = val;
        return this.val;
    };
    adicionar = function (val) {
        this.val += val;
        return this.val;
    };
}());

var counter = someFn(1);
console.log('Primeira chamada', adicionar(3));
console.log('Segunda chamada', adicionar(1));
console.log('Terceira chamada', adicionar(5));