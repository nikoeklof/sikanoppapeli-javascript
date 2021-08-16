var dices = ['<img src="img/dice-1.svg" alt="dice1" width="64px" height="64px">', '<img src="img/dice-2.svg" alt="dice2" width="64px" height="64px">', '<img src="img/dice-3.svg" alt="dice3" width="64px" height="64px">', '<img src="img/dice-4.svg" alt="dice4" width="64px" height="64px">', '<img src="img/dice-5.svg" alt="dice5" width="64px" height="64px">', '<img src="img/dice-6.svg" alt="dice6" width="64px" height="64px">']
var playerAmount = 0;
var defaultWinAmount = 100;
var players = [];
var diceAmount;
var playerTurn = 0;
var firstroll;
var secondtroll;
var points = 0;

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

            x++;
        }


    }
    if (x >= playerAmount) {
        diceSetup()
    }
}

function diceSetup() {
    document.getElementById('gameContainer').innerHTML = '<Button class="btn-game" onclick="diceAmount=1, winAmountSetup()">1 Noppa</button> <br> <br> <Button class="btn-game" onclick="diceAmount=2, winAmountSetup()">2 Noppaa</button>'
}

function winAmountSetup() {
    document.getElementById('gameContainer').innerHTML = '<label for="winAmount"> Anna pistemäärä mihin peli päättyy, 100 on oletusarvo</label> <br> <br> <input id="winAmount" type=text><button onclick="setWinAmount() ,gameStart()">OK</button>'

}

function gameStart() {
    if (diceAmount == 1) {
        startWithOneDice()
        document.getElementById("gameContainer").innerHTML += '<div id="playerthrowpopup"></div>'
        document.getElementById("gameContainer").innerHTML += '<div id="potentialPoints"></div>'
    } else {
        startWithTwoDice()
        document.getElementById("gameContainer").innerHTML += '<div id="playerthrowpopup"></div>'
        document.getElementById("gameContainer").innerHTML += '<div id="potentialPoints"></div>'
    }
}

function playerRoll() {
    document.getElementById("playerthrowpopup").innerHTML = ''
    document.getElementById("diceContainer").innerHTML = dices[roll()];

    if (document.getElementById("diceContainer").innerHTML == dices[0]) {

        document.getElementById("playerthrowpopup").innerHTML = '<p style="color:red; font-weight: bold;">' + players[playerTurn].name + ' heitti ykkösen! vuoro päättyy </p>'
        points = 0;
    } else {
        switch (firstroll) {
            case 1:
                points = points + 2
                break;
            case 2:
                points = points + 3
                break;
            case 3:
                points = points + 4
                break;
            case 4:
                points = points + 5
                break;
            case 5:
                points = points + 6
                break;

        }
        document.getElementById('potentialPoints').innerHTML = '<br> <p> Tämän vuoron mahdolliset pisteet: ' + points + '</p>'



    }
}

function startWithOneDice() {
    document.getElementById("gameContainer").innerHTML = '<div id="diceContainer"></div> <br> <div id="playerContainer"></div>'
    document.getElementById('playerContainer').innerHTML = '<h2>Pisteet:</h2> <br>'
    for (let i = 0; i < playerAmount; i++) {
        document.getElementById("playerContainer").innerHTML += '<span id="player' + i + '">' + players[i].name + ': </span> <span id="player' + i + '">' + players[i].points + '</span> <br>'
    }
    document.getElementById("diceContainer").innerHTML = dices[roll()];
    document.getElementById("gameContainer").innerHTML += '<br><br><button class="btn-game" onclick="playerRoll()">Heitä</button> <button class="btn-game" onclick"endTurn()>Lopeta vuoro</button> '
}

function setWinAmount() {
    var winAmount = document.getElementById('winAmount').value
    if (winAmount == null || winAmount == undefined) {
        defaultWinAmount = 100;
    } else {
        defaultWinAmount = parseInt(winAmount);

    }
}

function playerTurnChange() {
    if (playerTurn > playerAmount) {
        playerTurn = 0
    } else {
        playerTurn += 1
    }

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
    var roll1 = Math.floor(Math.random() * 5);
    firstroll = roll1
    secondtroll = roll2
    if (diceAmount == 2) {
        var roll2 = Math.floor(Math.random() * 5);
        return [firstroll, secondtroll]
    } else {
        return firstroll
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