
const MACHINE_COUNT = 13;

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click", spin);

// -------------------------
// FAIR RANDOM PICK
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

    // 1. Decide outcome FIRST (important for fairness)
    const result = pickMachine();

    // 2. Add slight randomness to spin timing (feels more natural)
    const t1 = 900 + Math.random() * 250;
    const t2 = 1300 + Math.random() * 250;
    const t3 = 1700 + Math.random() * 250;

    // 3. Start spinning reels visually
    spinReel(reel1, t1);
    spinReel(reel2, t2);
    spinReel(reel3, t3);

    // 4. Force final result after reels stop
    setTimeout(() => {

        reel1.src = `images/machine${result}.png`;
        reel2.src = `images/machine${result}.png`;
        reel3.src = `images/machine${result}.png`;

    }, 1900);

    // 5. Redirect after reveal
    setTimeout(() => {

        window.location.href = `machine.html?id=${result}`;

    }, 2600);
}

// -------------------------
// REEL ANIMATION STUFF 
// -------------------------
function spinReel(reel, duration) {

    const interval = setInterval(() => {

        const frame = randomFrame();

        reel.src = `images/machine${frame}.png`;

    }, 70);

    setTimeout(() => {
        clearInterval(interval);
    }, duration);
}
