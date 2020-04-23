//Desarrollo del test - Books & Books - Eugenio Jáuregui

function simonSay() {
    console.log('Juego iniciado');
    sessionStorage.setItem('playing', 'true');
    getKeyScreen = document.querySelectorAll('.key');
    var startMessage = document.getElementById('Start');
    startMessage.style.display = 'none';
    let generatedKey = [];
    let playerTurn = false;


    function randomKey() {
        let key = [];
        for (let index = 0; index < getKeyScreen.length; index++) {
            const element = getKeyScreen[index];
            key.push(element.dataset.key);
        }
        let randomKey = key[Math.floor(Math.random() * key.length)];
        let keyArray = [];
        if (localStorage.getItem('keys')) {
            let keyArray = localStorage.getItem('keys');
        }
        let getKeyScreen = document.querySelectorAll('.key');
        for (let index = 0; index < getKeyScreen.length; index++) {
            const element = getKeyScreen[index];
            keyArray.forEach(keyElement => {
                if (element.dataset.key == keyElement) {
                    element.classList.add("active");
                    setTimeout(function () {
                        element.classList.remove("active");
                    }, 500);

                }
            });
            turns();
        }
        keyArray.push(randomKey);
        localStorage.setItem('keys', keyArray);
        return keyArray;
    }

    this.letsPlay = function () {
        generatedKey = randomKey();
    }

    function turns() {
        if (playerTurn === false) {
            playerTurn = true;
            document.addEventListener('keydown', (event) => {
                pressKey();
            });
        } else {
            playerTurn = false;

        }
        console.log(playerTurn);
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
        let userKeyArray = [];
        userKeyArray.push(keyName);
        localStorage.setItem('userkeys', userKeyArray);
        let getKeyScreen = document.querySelectorAll('.key');
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
                    turns()
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

}
// letsPlay();
document.addEventListener('keydown', (event) => {
    if (sessionStorage.getItem('playing') !== 'true') {
        var newGame = new simonSay();
        newGame.letsPlay();
    }
});
// window.onload = function () {
//     if (window.location.href == sessionStorage.getItem("playing")) {
//         sessionStorage.clear();
//     }
// }