const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Test by drawing a simple shape
ctx.fillStyle = 'lime';
ctx.fillRect(10, 10, 100, 100);

class Fruit {
    constructor(x, y, speedX, speedY, radius, color) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
        this.color = color;
        this.isSliced = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isSliced ? 'gray' : this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.1; // Simulate gravity
    }
}

let mouseX, mouseY;

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function checkSlice(fruit) {
    const distance = Math.sqrt((fruit.x - mouseX) ** 2 + (fruit.y - mouseY) ** 2);
    return distance < fruit.radius;
}

const fruits = [];

// Spawn a fruit every second
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 50; // Start slightly below the canvas
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = -Math.random() * 8 - 5; // Launch upwards
    const radius = 20 + Math.random() * 20; // Random size
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    fruits.push(new Fruit(x, y, speedX, speedY, radius, color));
}, 1000);


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
        const fruit = fruits[i];
        fruit.update();
        fruit.draw();

        // Check if fruit is sliced
        if (!fruit.isSliced && checkSlice(fruit)) {
            fruit.isSliced = true; // Mark as sliced
        }

        // Remove fruits that fall off the screen
        if (fruit.y - fruit.radius > canvas.height) {
            fruits.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();


if (fruit.isSliced) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(fruit.x - fruit.radius, fruit.y);
    ctx.lineTo(fruit.x + fruit.radius, fruit.y);
    ctx.stroke();
}


let score = 0;

if (fruit.isSliced) {
    score++;
    console.log('Score:', score);
}
