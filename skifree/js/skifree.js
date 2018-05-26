(function () {

    const FPS = 60;
    const TAMX = 500;
    const TAMY = 600;
    const PROB_OBSTACULO = 3;
    var gameLoop;
    var montanha;
    var skier;
    var direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
    var classes = ['arvore', 'burning_bush', 'rock', 'big_tree', 'tree_stump']
    var obstaculos = [];
    var vidas_div;
    var distancia_div;

    function init() {
        montanha = new Montanha();
        skier = new Skier();
        obstaculos = [];
        vidas_div = document.getElementById("vidas");
        distancia_div = document.getElementById("distancia");
        gameLoop = setInterval(run, 1000 / FPS);
    }

    function restart() {
        montanha = new Montanha();
        skier = new Skier();
        obstaculos.forEach(obstaculo => {
            obstaculo.element.remove();
        });
        obstaculos = [];
        vidas_div.innerHTML = "";
        distancia_div.innerHTML = "";

    }

    window.addEventListener('keydown', function (e) {
        if (e.key == 'a') skier.mudarDirecao(-1);
        else if (e.key == 'd') skier.mudarDirecao(1);
        else if (e.key == 'f') skier.acelerar();
    });

    window.addEventListener('keyup', function (e) {
        if (e.key == 'f') skier.frear();
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
        this.acelerado = false;
        this.vidas = 3;
        this.invuneravel = false;
        this.element.className = 'para-frente';
        this.element.style.top = '150px';
        this.element.style.left = parseInt(TAMX / 2) - 7 + 'px';
        this.central_x = parseInt(this.element.style.left) + parseInt(this.element.clientWidth / 2);
        this.bottom_y = parseInt(this.element.style.top) + parseInt(this.element.clientHeight);
        this.distancia = 0;

        this.mudarDirecao = function (giro) {
            if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
                this.direcao += giro;
                this.element.className = direcoes[this.direcao];
            }
        }

        this.setarDirecao = function (dir) {
            this.direcao = dir;
            this.element.className = direcoes[this.direcao];
        }

        this.andar = function () {
            var x0_position = parseInt(this.element.style.left);
            var x1_position = parseInt(this.element.clientWidth) + x0_position;
            if (x0_position < 0) {
                this.setarDirecao(1);
                this.element.style.left = x0_position + 1 + "px";
            } else if (x1_position >= TAMX) {
                this.setarDirecao(1);
                this.element.style.left = parseInt(this.element.style.left) - 2 + "px";
            }

            if (this.direcao == 0) {
                this.element.style.left = (parseInt(this.element.style.left) - skier.y_vel) + "px";
            } else if (this.direcao == 2) {
                this.element.style.left = (parseInt(this.element.style.left) + skier.y_vel) + "px";
            }
            if (this.acelerado) {
                this.distancia += 30 / FPS;
            } else {
                this.distancia += 20 / FPS;
            }
            this.central_x = parseInt(this.element.style.left) + parseInt(this.element.clientWidth / 2);
        }

        this.acelerar = function () {
            this.x_vel = 2;
            this.y_vel = 2;
            this.acelerado = true;
        }

        this.frear = function () {
            this.x_vel = 1;
            this.y_vel = 1;
            this.acelerado = false;
        }

        this.dano = function () {
            this.vidas -= 1;
            if (this.vidas == 0) {
                restart();
            }
        }
    }

    function Obstaculo() {
        this.element = document.createElement('div');
        montanha.element.appendChild(this.element);
        var idx = Math.floor(Math.random() * classes.length);
        this.element.className = classes[idx];
        this.element.style.top = TAMY + "px";
        this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

        // Verifica se há árvores colidindo com o esquiador

        this.verificaColisao = function () {
            var obstaculo_y0 = parseInt(this.element.style.top) + (parseInt(this.element.clientHeight) / 2);
            var obstaculo_x0 = parseInt(this.element.style.left);
            var obstaculo_y1 = parseInt(this.element.style.top) + this.element.clientHeight
            var obstaculo_x1 = obstaculo_x0 + this.element.clientWidth;

            var skier_x = skier.central_x;
            var skier_y = skier.bottom_y;

            if (skier_x >= obstaculo_x0 && skier_x <= obstaculo_x1) {
                if (skier_y >= obstaculo_y0 && skier_y <= obstaculo_y1) {
                    return true;
                }
            }
        }
        return false;
    }

    function update() {

        // A cada frame calcula a chance de inserir novas árvores

        var random = Math.floor(Math.random() * 1000);
        if (random <= PROB_OBSTACULO * 10 * skier.x_vel) {
            var obstaculo = new Obstaculo();
            obstaculos.push(obstaculo);
        }

        // Remove árvores que estão fora da tela
        for (var i = obstaculos.length - 1; i >= 0; i--) {
            var obstaculo_y = parseInt(obstaculos[i].element.style.top);
            if (obstaculo_y < -40) {
                obstaculos[i].element.remove();
                obstaculos.splice(i, 1);
                break;
            }
            if (obstaculos[i].verificaColisao()) {
                skier.dano();
                obstaculos[i].element.remove();
                obstaculos.splice(i, 1);
                break;
            }
        }
        skier.andar();
    }

    function draw() {
        for (var i = 0; i < obstaculos.length; i++) {
            var obstaculo_y = parseInt(obstaculos[i].element.style.top);
            obstaculos[i].element.style.top = (obstaculo_y - skier.x_vel) + "px";
        }
        distancia_div.innerHTML = Math.round(skier.distancia);
        vidas_div.innerHTML = skier.vidas;
    }

    function run() {
        update();
        draw();
    }

    init();

})();