const goat = document.getElementById('goat');
const leaf = document.getElementById('leaf');
const bike = document.getElementById('bike');
const scoreDisplay = document.getElementById('score');
let score = 0;
let goatPosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement
let goatSpeed = 20; // Speed at which the goat moves

// Handle goat movement with Arrow Keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && goatPosition > 0) {
        goatPosition -= goatSpeed;
    } else if (event.key === 'ArrowRight' && goatPosition < 250) { // Limit goat's right-side movement
        goatPosition += goatSpeed;
    }
    goat.style.left = `${goatPosition}px`;
});

// Start the game
function startGame() {
    // Reset the initial positions of objects
    resetObject(leaf, 'leaf');
    resetObject(bike, 'bike');

    gameInterval = setInterval(() => {
        moveObject(leaf, 'leaf');
        moveObject(bike, 'bike');
        checkCollision();
        increaseGameSpeed(); // Gradually increase the speed for added difficulty
    }, 20);
}

// Move objects (leaf and bike) down the screen
function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // Reset the object if it goes off-screen
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

// Reset object position to the top and place it randomly along the x-axis
function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 250)}px`; // Random X position (adjusted to fit within game area)
}

// Check for collisions between goat and objects (leaf and bike)
function checkCollision() {
    let goatRect = goat.getBoundingClientRect();
    let leafRect = leaf.getBoundingClientRect();
    let bikeRect = bike.getBoundingClientRect();

    // Collision detection with the leaf (increases score)
    if (goatRect.left < leafRect.right &&
        goatRect.right > leafRect.left &&
        goatRect.top < leafRect.bottom &&
        goatRect.bottom > leafRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(leaf, 'leaf');
    }

    // Collision detection with the bike (ends game)
    if (goatRect.left < bikeRect.right &&
        goatRect.right > bikeRect.left &&
        goatRect.top < bikeRect.bottom &&
        goatRect.bottom > bikeRect.top) {
        clearInterval(gameInterval); // Stop the game
        alert('Game Over! Your Score: ' + score); // Display the score
        // Optionally show a restart button here instead of reload
        window.location.reload(); // Restart the game
    }
}

// Gradually increase the game speed to make it more challenging
function increaseGameSpeed() {
    if (score % 10 === 0 && gameSpeed < 15) { // Every 10 points, increase speed
        gameSpeed += 0.1;
    }
}

startGame(); // Initialize the game
