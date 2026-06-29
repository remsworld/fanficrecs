// -------------------------
// GET MACHINE ID
// -------------------------
const params = new URLSearchParams(window.location.search);
const machineId = params.get("id") || "1";

let machineData;

// -------------------------
// LOAD REWARDS.JSON
// -------------------------
fetch("rewards.json")
  .then(res => res.json())
  .then(data => {

    machineData = data[machineId];

    if (!machineData) {
      document.body.innerHTML = "<h1>Machine Not Found</h1>";
      return;
    }

    initMachine();

  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "<h1>Error loading machine data</h1>";
  });


// -------------------------
// INIT MACHINE PAGE
// -------------------------
function initMachine() {

  document.getElementById("machine-title").textContent =
    machineData.name;

  document.getElementById("machine").src =
    `images/machine${machineId}.png`;

  document
    .getElementById("machine")
    .addEventListener("click", drawReward);

  updateRemaining();
}


// -------------------------
// LOCAL STORAGE HANDLER
// -------------------------
function getData() {

  const today = new Date().toISOString().split("T")[0];

  let data = JSON.parse(localStorage.getItem("machineData"));

  if (!data || data.date !== today) {
    data = { date: today };
    localStorage.setItem("machineData", JSON.stringify(data));
  }

  return data;
}


// -------------------------
// SHOW REMAINING PULLS
// -------------------------
function updateRemaining() {

  const data = getData();

  const key = `machine${machineId}`;
  const used = data[key] || 0;

  const remaining = machineData.dailyLimit - used;

  document.getElementById("remaining").textContent =
    `Pulls Remaining: ${remaining}/${machineData.dailyLimit}`;
}


// -------------------------
// DRAW REWARD
// -------------------------
function drawReward() {

  const data = getData();

  const key = `machine${machineId}`;
  const used = data[key] || 0;

  if (used >= machineData.dailyLimit) {

    document.getElementById("result").textContent =
      "No pulls remaining today.";

    return;
  }

  // increment usage
  data[key] = used + 1;

  localStorage.setItem(
    "machineData",
    JSON.stringify(data)
  );

  // pick random reward
  const rewards = machineData.rewards;

  const reward =
    rewards[Math.floor(Math.random() * rewards.length)];

  document.getElementById("result").textContent = reward;

  updateRemaining();
}
