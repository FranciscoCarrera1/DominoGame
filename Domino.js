const startBtn = document.getElementById("startBtn");
const instructionsBtn = document.getElementById("instructionsBtn");

startBtn.onclick = function () {
    window.location.href = "Page2.html";
};

instructionsBtn.onclick = function () {
    window.open("https://www.dominorules.com/straight-dominoes", "_blank");
};

