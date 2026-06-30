
const MACHINE_COUNT = 13;

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spinBtn = document.getElementById("spinBtn");

// Emoji symbols (visual only)
const symbols = [
    "🧵","☕","💢","🐇","🍿","🍀",
    "❄️","🫀","⚡","📚","🧿","🌸","🌷", 
    "🚬", "☁️"
];

spinBtn.addEventListener("click", spin);

// -------------------------
// FAIR MACHINE PICK
// -------------------------
function pickMachine() {
    return Math.floor(Math.random() * MACHINE_COUNT) + 1;
}

// -------------------------
// RANDOM FRAME FOR ANIMATION
// -------------------------
function randomFrame() {
    return Math.floor(Math.random() * MACHINE_COUNT) + 1;
}

// -------------------------
// MAIN SPIN FUNCTION
// -------------------------
function spin() {

    spinBtn.disabled = true;

    // 1. Decide outcome FIRST (fair system)
    const result = pickMachine();

    // 2. Staggered spin durations (feels more real)
    const t1 = 900 + Math.random() * 250;
    const t2 = 1300 + Math.random() * 250;
    const t3 = 1700 + Math.random() * 250;

    // 3. Start spinning animation
    spinReel(reel1, t1);
    spinReel(reel2, t2);
    spinReel(reel3, t3);

    // 4. Force final symbol after spin ends
    setTimeout(() => {

        const finalSymbol = symbols[result - 1];

        reel1.textContent = finalSymbol;
        reel2.textContent = finalSymbol;
        reel3.textContent = finalSymbol;

    }, 1900);

    // 5. Redirect after reveal moment
    setTimeout(() => {

        window.location.href =
            `machine.html?id=${result}`;

    }, 2600);
}

// -------------------------
// REEL ANIMATION FUNCTION
// -------------------------
function spinReel(reel, duration) {

    const interval = setInterval(() => {

        const frame = randomFrame();
        reel.textContent = symbols[frame - 1];

    }, 70);

    setTimeout(() => {
        clearInterval(interval);
    }, duration);
}
