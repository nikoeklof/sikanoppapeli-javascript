var dices = ['<img src="img/dice-1.svg" alt="dice1" width="64px" height="64px">', '<img src="img/dice-2.svg" alt="dice2" width="64px" height="64px">', '<img src="img/dice-3.svg" alt="dice3" width="64px" height="64px">', '<img src="img/dice-4.svg" alt="dice4" width="64px" height="64px">', '<img src="img/dice-5.svg" alt="dice5" width="64px" height="64px">', '<img src="img/dice-6.svg" alt="dice6" width="64px" height="64px">']
var playerAmount = 0;
var defaultWinAmount = 100;
var players = [];
var diceAmount;
var playerTurn = 0;
var firstroll;
var secondtroll;
var points = 0;
var tuplat;
var rolled = false;

function playerSetup() {

    document.getElementById('gameContainer').innerHTML = '<label for="playerAmount">Anna Pelaajamäärä: </label> <input type=text id="playerAmount"/><button onclick="setPlayerAmount(), playerNames()">OK</button>'

}

function playerNames() {
    if (isNaN(playerAmount) == true) {

        alert('Kirjoita pelaajamäärä numeroina!')
        playerSetup()
    } else {
        document.getElementById('gameContainer').innerHTML = '';
        for (let i = 1; i <= playerAmount; i++) {
            document.getElementById('gameContainer').innerHTML += '<label for="playername' + i + '">Pelaajan ' + i + ' Nimi: </label><input type=text id="playername' + i + '"/> <br>'
        }
        document.getElementById('gameContainer').innerHTML += '<br> <button class="btn-game" onclick="checkIfValid()">Jatka</button>'
    }
}

function checkIfValid() {

    namesvalid = true

    for (let i = 1; i <= playerAmount; i++) {
        var playername = document.getElementById('playername' + i).value
        if (playername == '') {
            alert('Pelaajalla ' + i + ' ei ole nimeä, syötä nimi!')
            namesvalid = false
        } else {
            var y = new Player(playername)
            players.push(y)
        }
    }
    if (namesvalid == true) { diceSetup() }


}





function diceSetup() {
    document.getElementById('gameContainer').innerHTML = '<Button class="btn-game" onclick="diceAmount=1, winAmountSetup()">1 Noppa</button> <br> <br> <Button class="btn-game" onclick="diceAmount=2, winAmountSetup()">2 Noppaa</button>'
}

function winAmountSetup() {
    document.getElementById('gameContainer').innerHTML = '<label for="winAmount"> Anna pistemäärä mihin peli päättyy, 100 on oletusarvo</label> <br> <br> <input id="winAmount" type=text><button onclick="setWinAmount() ,startGame()">OK</button>'

}


function playerRoll() {
    roll()
    rolled = true;
    document.getElementById("playerthrowpopup").innerHTML = ''
    document.getElementById("playerturnpopup").innerHTML = ''
    document.getElementById("diceContainer").innerHTML = dices[firstroll];
    if (diceAmount == 2) {
        document.getElementById("diceContainer").innerHTML += dices[secondtroll];
    }
    switch (diceAmount) {
        case 1:
            if (firstroll == 0) {

                document.getElementById("playerthrowpopup").innerHTML = '<p style="color:red; font-weight: bold;">' + players[playerTurn].name + ' heitti ykkösen! vuoro päättyy </p>'
                points = 0;
                playerTurnChange()
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
            break;
        case 2:
            if (firstroll == 0 && secondtroll != 0 || secondtroll == 0 && firstroll != 0) {

                document.getElementById("playerthrowpopup").innerHTML = '<p style="color:red; font-weight: bold;">' + players[playerTurn].name + ' heitti ykkösen! vuoro päättyy </p>'
                points = 0;
                playerTurnChange()
            } else {
                if (firstroll == 0 && secondtroll == 0) {
                    tuplat = tuplat + 1;
                    points = points + 25
                } else if (firstroll == secondtroll && firstroll != 0) {
                    points = points + (((firstroll + 1) + (secondtroll + 1)) * 2)
                    tuplat = tuplat + 1;
                    if (tuplat == 3) {
                        document.getElementById("playerthrowpopup").innerHTML = '<p style="color:red; font-weight: bold;">' + players[playerTurn].name + ' heitti kolme kertaa peräkkäin tuplat! vuoro päättyy </p>'
                        points = 0;
                        playerTurnChange()
                    }
                } else {
                    points = points + ((firstroll + 1) + (secondtroll + 1))
                    tuplat = 0;
                }
                document.getElementById('potentialPoints').innerHTML = '<br> <p> Tämän vuoron mahdolliset pisteet: ' + points + '</p>'
            }
    }
}



function startGame() {
    document.getElementById("gameContainer").innerHTML = '<div id="diceContainer"></div> <br> <div id="playerContainer"></div> '
    document.getElementById('playerContainer').innerHTML = '<h2>Pisteet:</h2> '
    for (let i = 0; i < playerAmount; i++) {
        document.getElementById("playerContainer").innerHTML += '<span id="player' + i + 'name">' + players[i].name + ': </span> <span id="player' + i + 'points">' + players[i].points + '</span> <br>'
    }
    if (diceAmount == 2) {
        roll()
        document.getElementById("diceContainer").innerHTML = dices[firstroll] + dices[secondtroll];
    } else {
        roll()
        document.getElementById("diceContainer").innerHTML = dices[firstroll]
    }

    document.getElementById("gameContainer").innerHTML += '<br><br><button class="btn-game" onclick="playerRoll()">Heitä</button> <button class="btn-game" onclick="endTurn()">Lopeta vuoro</button> <br> <div id="potentialPoints"></div> <br> <div id="playerthrowpopup"></div> <br> <div id="playerturnpopup"></div>'

}

function setWinAmount() {
    var winAmount = document.getElementById('winAmount').value
    if (isNaN(winAmount) == true) {
        defaultWinAmount = 100;
    } else {
        defaultWinAmount = parseInt(winAmount);

    }
}

function endTurn() {
    if (rolled == false) {
        alert('Et voi päättää vuoroa ilman heittoa!')
    } else {
        players[playerTurn].addPoints(points)

        document.getElementById('player' + playerTurn + 'points').innerHTML = players[playerTurn].points
        points = 0

        if (players[playerTurn].points >= defaultWinAmount) {
            document.getElementById('player' + playerTurn + 'points').innerHTML = players[playerTurn].points
            var endgame = confirm('Pelaaja ' + players[playerTurn].name + ' voitti pelin!')
            if (endgame == true) {
                location.reload()
            } else {
                location.reload()
            }
        }
        playerTurnChange()
    }

}

function playerTurnChange() {
    rolled = false
    if (playerTurn == playerAmount - 1) {
        playerTurn = 0
        if (document.getElementById('playerturnpopup').innerHTML == '') { document.getElementById('playerturnpopup').innerHTML += '<p>Pelaajan ' + players[playerTurn].name + ' vuoro heittää</p>' }

        document.getElementById('potentialPoints').innerHTML = '<br> <p> Tämän vuoron mahdolliset pisteet: ' + points + '</p>'
    } else {
        playerTurn += 1
        if (document.getElementById('playerturnpopup').innerHTML == '') { document.getElementById('playerturnpopup').innerHTML += '<p>Pelaajan ' + players[playerTurn].name + ' vuoro heittää</p>' }
        document.getElementById('potentialPoints').innerHTML = '<br> <p> Tämän vuoron mahdolliset pisteet: ' + points + '</p>'
    }

}


function setPlayerAmount() {
    var amount = document.getElementById('playerAmount').value
    playerAmount = parseInt(amount);
    console.log(playerAmount)

}


function roll() {
    var roll1 = Math.floor(Math.random() * 5);
    firstroll = roll1
    var roll2 = Math.floor(Math.random() * 5);
    secondtroll = roll2

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