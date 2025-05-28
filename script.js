var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreText = document.getElementById("score");
var error = document.querySelector(".error");

var score = 0;
var isGameOver = false;

document.body.onkeyup = function (e) {
    if (e.code === "Space") {
        if (isGameOver) {
            restartGame();
        } else {
            jump();
        }
    }
};

function jump() {
    if (isGameOver) return;
    error.style.display = "none";

    if (!block.classList.contains("blockAnimate")) {
        block.classList.add("blockAnimate");
    }

    if (!character.classList.contains("animate")) {
        character.classList.add("animate");
    }

    setTimeout(() => {
        character.classList.remove("animate");
    }, 500);
}

var checkDead = setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 50 && blockLeft > 0 && characterTop >= 130) {
        gameOver();
    }
}, 10);

function updateScore() {
    if (!isGameOver) {
        score++;
        scoreText.innerHTML = "Score: " + score;
    }
}

block.addEventListener("animationiteration", updateScore);

function gameOver() {
    isGameOver = true;
    error.style.display = "block";
    error.innerHTML = "Game over! Press SPACE to restart.";
    block.classList.remove("blockAnimate");
}

function restartGame() {
    isGameOver = false;
    score = 0;
    scoreText.innerHTML = "Score: " + score;
    error.style.display = "none";
    block.classList.remove("blockAnimate");

    setTimeout(() => {
        block.classList.add("blockAnimate");
    }, 100);
}
