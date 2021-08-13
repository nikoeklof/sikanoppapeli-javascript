var dices = ['<img src="img/dice-1.svg" alt="dice1" width="64px" height="64px">', '<img src="img/dice-2.svg" alt="dice2" width="64px" height="64px">', '<img src="img/dice-3.svg" alt="dice3" width="64px" height="64px">', '<img src="img/dice-4.svg" alt="dice4" width="64px" height="64px">', '<img src="img/dice-5.svg" alt="dice5" width="64px" height="64px">', '<img src="img/dice-6.svg" alt="dice6" width="64px" height="64px">']
var playerAmount = 0;
var defaultWinAmount = 100;
var players = [];

function playerSetup() {

    document.getElementById('gameContainer').innerHTML = '<label for="playerAmount">Anna Pelaajamäärä: </label> <input type=text id="playerAmount"/><button onclick="setPlayerAmount(), playerNames()">OK</button>'
}

function playerNames() {
    document.getElementById('gameContainer').innerHTML = '';
    for (let i = 1; i <= playerAmount; i++) {

        document.getElementById('gameContainer').innerHTML += '<label for="playername' + i + '">Pelaajan ' + i + ' Nimi: </label><input type=text id="playername' + i + '"/><button onclick="newPlayer(playername' + i + '.value), hidden">OK</button> <br>'

    }
    document.getElementById('gameContainer').innerHTML += '<br> <button class="btn-game" onclick="checkIfValid()">Jatka</button> <br> <p> HUOM! lisää nimet järjestyksessä </p><br>'



}

function checkIfValid() {
    var x = 0

    for (var i = 0; i < playerAmount; i++) {
        if (players[i] == undefined) {

            alert("Pelaajalla " + (i + 1) + " ei ole nimeä, anna nimi ennenkuin jatkat!")
        } else {
            console.log("all good")
            x++;
        }


    }
    if (x >= playerAmount) {
        diceSetup()
    }
}

function diceSetup() {
    console.log("dice")
}


function setPlayerAmount() {
    var amount = document.getElementById('playerAmount').value
    playerAmount = parseInt(amount);

}

function newPlayer(name) {
    if (name == "") {
        alert('Anna Nimi!')
    } else {
        var player = new Player(name);

        players.push(player);
    }


}

function roll() {
    var roll1 = Math.floor(Math.random() * 6) + 1;
    if (diceAmount == 2) {
        var roll2 = Math.floor(Math.random() * 6) + 1;
        return [roll1, roll2]
    } else {
        return [roll1]
    }
}
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }
    addPoints(amount) {
        this.points = this.points + amount;
        return this.points;
    }
    getName() {
        return toString(this.name);
    }


}

function getName(i) {
    return players[i].getName();
}