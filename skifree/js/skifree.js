(function () {

    const FPS = 50;
    const TAMX = 300;
    const TAMY = 400;
    const PROB_ARVORE = 2;
    var gameLoop;
    var montanha;
    var skier;
    var direcoes = ['para-esquerda', 'para-frente', 'para-direita']
    var arvores = [];

    function init() {
        montanha = new Montanha();
        skier = new Skier();
        arvores = [];
        gameLoop = setInterval(run, 1000 / FPS);
    }

    function restart() {
        montanha = new Montanha();
        skier = new Skier();
        arvores.forEach(a => {
            a.element.remove();
        });
        arvores = [];

    }

    window.addEventListener('keydown', function (e) {
        if (e.key == 'a') skier.mudarDirecao(-1);
        else if (e.key == 'd') skier.mudarDirecao(1);
        else if (e.key == 's') skier.acelerar();
        else if (e.key == 'w') skier.frear();
    });

    function Montanha() {
        this.element = document.getElementById("montanha");
        this.element.style.width = TAMX + "px";
        this.element.style.height = TAMY + "px";
    }

    function Skier() {

        this.element = document.getElementById("skier");
        this.direcao = 1; //0-esquerda;1-frente;2-direita
        this.x_vel = 1;
        this.y_vel = 1;
        this.vidas = 3;
        this.invuneravel = false;
        this.element.className = 'para-frente';
        this.element.style.top = '30px';
        this.element.style.left = parseInt(TAMX / 2) - 7 + 'px';

        this.mudarDirecao = function (giro) {
            if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
                this.direcao += giro;
                this.element.className = direcoes[this.direcao];
            }
        }

        this.andar = function () {
            if (this.direcao == 0) {
                this.element.style.left = (parseInt(this.element.style.left) - skier.y_vel) + "px";
            }
            if (this.direcao == 2) {
                this.element.style.left = (parseInt(this.element.style.left) + skier.y_vel) + "px";
            }
        }

        this.acelerar = function () {
            this.x_vel = 3;
            this.y_vel = 2;
        }

        this.frear = function () {
            this.x_vel = 1;
            this.y_vel = 1;
        }

        this.dano = function () {
            this.vidas -= 1;
            if (this.vidas == 0) {
                restart();
            }
        }
    }

    function Arvore() {
        this.element = document.createElement('div');
        montanha.element.appendChild(this.element);
        this.element.className = 'arvore';
        this.element.style.top = TAMY + "px";
        this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

        // Verifica se há árvores colidindo com o esquiador

        this.verificaColisao = function () {
            var arvore_y0 = parseInt(this.element.style.top);
            var arvore_x0 = parseInt(this.element.style.left);
            var arvore_y1 = arvore_y0 + this.element.clientHeight
            var arvore_x1 = arvore_x0 + this.element.clientWidth;

            var skier_x = parseInt(skier.element.style.left) + (parseInt(skier.element.clientWidth) / 2);
            var skier_y = parseInt(skier.element.style.top);

            if (skier_x >= arvore_x0 && skier_x <= arvore_x1) {
                if (skier_y >= arvore_y0 && skier_y <= arvore_y1) {
                    return true;
                }
            }
        }
        return false;
    }



    function update() {

        // A cada frame calcula a chance de inserir novas árvores

        var random = Math.floor(Math.random() * 1000);
        if (random <= PROB_ARVORE * 10 * skier.x_vel) {
            var arvore = new Arvore();
            arvores.push(arvore);
        }

        // Remove árvores que estão fora da tela

        for (var i = arvores.length - 1; i >= 0; i--) {
            var arvore_y = parseInt(arvores[i].element.style.top);
            if (arvore_y < -40) {
                arvores[i].element.remove();
                arvores.splice(i, 1);
            }
            if (arvores[i].verificaColisao()) {
                skier.dano();
            }
        }

        skier.andar();
    }

    function draw() {
        for (var i = arvores.length - 1; i >= 0; i--) {
            var arvore_y = parseInt(arvores[i].element.style.top);
            arvores[i].element.style.top = (arvore_y - skier.x_vel) + "px";
        }
    }

    function run() {
        update();
        draw();
    }

    init();

})();