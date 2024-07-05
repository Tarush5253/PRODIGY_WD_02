const selectBox = document.querySelector('.select-box'),
    selectXBtn = selectBox.querySelector('.playerX'),
    selectOBtn = selectBox.querySelector('.playerO'),
    playBoard = document.querySelector('.play-board'),
    allBox = document.querySelectorAll('section span'),
    players = document.querySelector('.players'),
    resultBox = document.querySelector('.result-box'),
    wonText = resultBox.querySelector('.won-text'),
    replayBtn = resultBox.querySelector('button');

window.onload = () => {
    for (let box of allBox) {
        box.setAttribute('onclick', 'clickedBox(this)');
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player");
    }
}
const playerXIcon = 'fa-solid fa-xmark';
const playerOIcon = 'fa-regular fa-circle';
let playerSign = 'x';
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains('player')) {
        playerSign = 'o';
        element.innerHTML = `<i class='${playerOIcon}'></i>`;
        players.classList.remove("active");
        element.setAttribute('id', playerSign);
    } else {
        element.innerHTML = `<i class='${playerXIcon}'></i>`;
        players.classList.add("active");
        element.setAttribute('id', playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.floor(Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}

function bot(runBot) {
    if (runBot) {
        playerSign = 'o';
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains('player')) {
                allBox[randomBox].innerHTML = `<i class='${playerXIcon}'></i>`;
                players.classList.add("active");
                playerSign = 'x';
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class='${playerOIcon}'></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
        }
        selectWinner();
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = 'x';
    }
}

// find winner

function getId(classname) {
    return document.querySelector('.box' + classname).id;
}

function checkThreeId(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkThreeId(1, 2, 3, playerSign) || checkThreeId(4, 5, 6, playerSign) || checkThreeId(7, 8, 9, playerSign) || checkThreeId(1, 5, 9, playerSign) || checkThreeId(3, 5, 7, playerSign) || checkThreeId(1, 4, 7, playerSign) || checkThreeId(2, 5, 8, playerSign) || checkThreeId(3, 6, 9, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);
        wonText.innerHTML = ` Player <p>${playerSign}</p> Won the game!`;
    } else {
        if (getId(1) != '' && getId(2) != '' && getId(3) != '' && getId(4) != '' && getId(5) != '' && getId(6) != '' && getId(7) != '' && getId(8) != '' && getId(9) != '') {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove('show');
                resultBox.classList.add('show');
            }, 700);
            wonText.textContent = ` Match has been drawn!`;
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}