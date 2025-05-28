var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreText = document.getElementById("score");
var error = document.querySelector(".error");

var score = 0;
var isGameOver = false;

// Listen for spacebar press
document.body.onkeyup = function(e) {
    if (e.key == " " || e.code == "Space") {
        if (isGameOver) {
            restartGame(); // Restart if game over
        } else {
            jump();
        }
    }
};

function jump() {
    if (isGameOver) return; // Prevent jumping after game over

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

// Collision detection and score tracking
var checkDead = setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    // Check if character collides with block
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        gameOver();
    }
}, 10);

// Score update logic
function updateScore() {
    if (!isGameOver) {
        score++;
        scoreText.innerHTML = "Score: " + score;
    }
}

// Start score tracking when block fully passes the character
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

    // Restart animation with delay for smooth reset
    setTimeout(() => {
        block.classList.add("blockAnimate");
    }, 100);
} 
