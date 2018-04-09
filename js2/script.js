var playerScore = 0
var computerScore = 0
var pieces = [
    'Pedra',
    'Papel',
    'Tesoura',
]

function printOptions() {
    console.log("Escolha sua jogada")
    console.log("1 - Pedra")
    console.log("2 - Papel")
    console.log("3 - Tesoura")
}

function checkWinner(p1, p2) {
    var calc = p1 - p2
    if (calc == 0) {
        return 0
    } else if (calc == -1 || calc == 2) {
        return 1;
    } else {
        return 2;
    }
}

function computeResults(player, computer) {
    var result = player - computer
    console.log("Computador escolheu: " + pieces[computer - 1])
    if (result == 0) {
        console.log("Empate!");
    } else if (result == 1) {
        console.log("A supremacia das máquinas está chegando!")
        console.log("Computador venceu!")
        computerScore += 1
    } else {
        console.log("Humano, você ganhou!")
        playerScore += 1
    }
}

function checkPlayerCheating(input) {
    if (input != 1 && input != 2 && input != 3) {
        return true;
    } else {
        return false;
    }
}

function getPlayerInput() {
    var player = parseInt(prompt("Diga o valor da sua peça! " +
        "1-Pedra, 2-Papel, 3-Tesoura"))
    while (checkPlayerCheating(player)) {
        var player = parseInt(prompt("Opa! Parece que você digitou uma " +
            "peça inválida. Opções: 1-Pedra, 2-Papel, 3-Tesoura"))
    } return player
}

function gameLoop() {
    for (var i = 0; i < 3; i++) {
        printOptions()
        var player = getPlayerInput()
        var computer = Math.floor(Math.random() * 3 + 1)
        computeResults(player, computer)
    }
    console.log("Placar final:")
    console.log("Jogador " + playerScore + "x" + computerScore + " Computador")
}

gameLoop()