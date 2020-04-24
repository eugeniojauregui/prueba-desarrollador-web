//Desarrollo del test - Books & Books - Eugenio Jáuregui
function simonSay() {
    console.log('Juego iniciado');
    sessionStorage.setItem('playing', 'true');
    getKeyScreen = document.querySelectorAll('.key');
    steps = document.getElementById('score');
    finalScore = document.getElementById('score-final');
    startMessage = document.getElementById('Start');
    gameOver = document.getElementById('gameOver');
    nombre = document.getElementById('name');
    submit = document.getElementById('submit');
    startMessage.style.display = 'none';

    function Game() {
        this.playerTurn = false;
        this.pattern = [];
        this.steps = 1;
    }

    this.newGame = function () {
        game = new Game();
        steps.innerHTML = "01";
        setTimeout(newRound, 500);
    }

    function Round() {
        let key = [];
        for (let index = 0; index < getKeyScreen.length; index++) {
            const element = getKeyScreen[index];
            key.push(element.dataset.key);
        }
        let randomKey = key[Math.floor(Math.random() * key.length)];
        let keyArray = [];
        if (localStorage.getItem('keys')) {
            keyArray = JSON.parse(localStorage.getItem('keys'));
        }
        game.pattern.push(randomKey);
        localStorage.setItem('keys', JSON.stringify(game.pattern));
        this.patternLength = game.steps;
        this.pattern = game.pattern;
        console.log(this.pattern);
        this.playerPattern = [];
        this.counter = 0;
        this.speed = 1200 - this.patternLength * 20;
    }

    function newRound() {
        round = new Round();
        showPattern();
        console.log(round.pattern);
    }

    function showPattern() {
        game.playerTurn = false;
        play.innerHTML = '<i class="fa fa-circle"></i>';
        for (var x = 0; x < round.patternLength; x++) {
            setTimeout(highligthKey.bind(null, round.pattern[x], 500), round.speed * x);
        }
        setTimeout(function () {
            game.playerTurn = true;
            play.innerHTML = '<i class="fa fa-circle-o"></i>';
        }, round.speed * round.patternLength);
    }

    function keyPressed(key) {
        if (game.playerTurn) {
            var keyIndex = pressKey();
            round.playerPattern.push(parseInt(keyIndex));
            highligthKey(keyIndex);
            check();
        }
    }

    function check() {
        if (parseInt(round.playerPattern[round.counter]) === parseInt(round.pattern[round.counter])) {
            round.counter++;
            console.log('va bien');
            console.log(round.counter);
            console.log(round.pattern);
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
        } else {
            console.log('va error');
            game.playerTurn = false;
            round.counter = 0;
            round.playerPattern = [];
            steps.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
            setTimeout(function () {
                sessionStorage.clear('playing');
                steps.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
                finalScore.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
                gameOver.style.display = 'flex';
            }, 1500);
        }
    }

    function highligthKey(keyElement) {
        for (let index = 0; index < getKeyScreen.length; index++) {
            const element = getKeyScreen[index];
            // var interval = 1000;
            if (element.dataset.key == keyElement) {
                element.classList.add("active");
                setTimeout(function () {
                    element.classList.remove("active");
                }, 500);
            }
        }
    }

    function pressKey() {
        const keyName = event.keyCode;
        for (let index = 0; index < getKeyScreen.length; index++) {
            const element = getKeyScreen[index];
            if (element.dataset.key == keyName) {
                element.classList.add("active");
                if (element.dataset.key == parseInt(round.pattern[round.counter])) {
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
        return keyName;
    }
    document.addEventListener('keydown', (event) => {
        keyPressed();

    });
    submit.addEventListener('click', event => {
        
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var scores = [];
        var user = {
            nombre: document.querySelector('#name').value,
            puntaje: game.steps < 10 ? "0" + game.steps : game.steps,
            fecha: date
        }
        let scores = [];
        if (localStorage.getItem('scores')) {
            keyArray = JSON.parse(localStorage.getItem('scores'));
        }
        scores.push(user);
        localStorage.setItem('scores', JSON.stringify(scores));
        startMessage.style.display = 'block';
        gameOver.style.display = 'none';
        setTimeout(function () {
            sessionStorage.clear('playing');
        }, 500);
        
    });
}

document.addEventListener('keydown', (event) => {
    if (sessionStorage.getItem('playing') !== 'true') {
        var newGame = new simonSay();
        newGame.newGame();

    }
});