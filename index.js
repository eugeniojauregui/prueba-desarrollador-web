//Desarrollo del test - Books & Books - Eugenio Jáuregui
var getKeyScreen = [];
var generatedKey = [];
var nivelContador = 0;
var nivel = 0;

function randomKey() {
    let key = [];
    let getKeyScreen = document.querySelectorAll('.key');
    for (let index = 0; index < getKeyScreen.length; index++) {
        const element = getKeyScreen[index];
        key.push(element.dataset.key);
    }
    let randomKey = key[Math.floor(Math.random() * key.length)];
    return randomKey;
}

function letsPlay() {
    generatedKey = randomKey();
    let getKeyScreen = document.querySelectorAll('.key');
    for (let index = 0; index < getKeyScreen.length; index++) {
        const element = getKeyScreen[index];

        if (element.dataset.key == generatedKey) {
            element.classList.add("active");
            setTimeout(function () {
                element.classList.remove("active");
            }, 500);
        }
    }

}

function Game() {
    this.playerTurn = false;
    this.pattern = [];
    this.steps = 1;
}

function newRound() {
    round = new Round();
    showPattern();
    console.log(round.pattern); // HINT
}

function showPattern() {
    game.playerTurn = false;
    play.innerHTML = '<i class="fa fa-circle"></i>';
    for (var x = 0; x < round.patternLength; x++) {
        setTimeout(buttonGlow.bind(null, round.pattern[x], 500), round.speed * x);
    }
    setTimeout(function () {
        game.playerTurn = true;
        play.innerHTML = '<i class="fa fa-circle-o"></i>';
    }, round.speed * round.patternLength);
}

function buttonClick(button) {
    if (game.playerTurn) {
        var buttonIndex = button.target.id;
        round.playerPattern.push(parseInt(buttonIndex));
        buttonGlow(button);
        check();
    }
}

function check() {
    if (round.playerPattern[round.counter] === round.pattern[round.counter]) {
        round.counter++;
        if (round.counter === round.patternLength) {
            game.playerTurn = false;
            game.steps++;
            if (game.steps === 21) {
                steps.innerHTML = '<i class="fa fa-trophy"></i>';
                setTimeout(newGame, 4000);
            } else {
                steps.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
                setTimeout(newRound, 1500);
            }
        }
    } else if (isStrict) {
        steps.innerHTML = '<i class="fa fa-exclamation-triangle"></i>';
        setTimeout(newGame, 2000);
    } else {
        game.playerTurn = false;
        round.counter = 0;
        round.playerPattern = [];
        steps.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
        setTimeout(function () {
            steps.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
            showPattern();
        }, 1500);
    }
}

function pressKey() {
    const keyName = event.keyCode;
    console.log(keyName);
    console.log(generatedKey);
    var getKeyScreen = document.querySelectorAll('.key');
    for (let index = 0; index < getKeyScreen.length; index++) {
        const element = getKeyScreen[index];
        // console.log(element.dataset.key);
        if (element.dataset.key == keyName) {
            element.classList.add("active");
            if (element.dataset.key == generatedKey) {
                element.classList.add("success");
                setTimeout(function () {
                    element.classList.remove("success");
                }, 500);
            } else {
                element.classList.add("fail");
                setTimeout(function () {
                    element.classList.remove("fail");
                }, 500);
            }
            setTimeout(function () {
                element.classList.remove("active");
            }, 500);
        };
    }
}
letsPlay();
document.addEventListener('keydown', (event) => {
    pressKey();
});