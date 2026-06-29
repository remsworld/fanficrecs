const params =
    new URLSearchParams(window.location.search);

const machineId =
    params.get("id") || "1";

document.getElementById("machine-title")
.textContent =
    `Machine ${machineId}`;

document.getElementById("machine")
.src =
    `images/machine${machineId}.png`;

const rewardPools = {

    1: [
        "Red Token",
        "Blue Token",
        "Green Token"
    ],

    2: [
        "Apple",
        "Banana",
        "Orange"
    ],

    3: [
        "Alpha",
        "Beta",
        "Gamma"
    ]

};

const rewards =
    rewardPools[machineId] ||
    ["Default Reward"];

function getData(){

    const today =
        new Date().toISOString().split("T")[0];

    let data =
        JSON.parse(
            localStorage.getItem("machineData")
        );

    if(!data || data.date !== today){

        data = {
            date: today
        };

        localStorage.setItem(
            "machineData",
            JSON.stringify(data)
        );
    }

    return data;
}

function updateRemaining(){

    const data = getData();

    const key =
        `machine${machineId}`;

    const used =
        data[key] || 0;

    document.getElementById("remaining")
    .textContent =
        `Pulls Remaining: ${3 - used}/3`;

}

function drawReward(){

    const data = getData();

    const key =
        `machine${machineId}`;

    const used =
        data[key] || 0;

    if(used >= 3){

        document.getElementById("result")
        .textContent =
        "No pulls remaining today.";

        return;
    }

    data[key] = used + 1;

    localStorage.setItem(
        "machineData",
        JSON.stringify(data)
    );

    const reward =
        rewards[
            Math.floor(
                Math.random() * rewards.length
            )
        ];

    document.getElementById("result")
    .textContent =
        reward;

    updateRemaining();
}

document
.getElementById("machine")
.addEventListener(
    "click",
    drawReward
);

updateRemaining();
