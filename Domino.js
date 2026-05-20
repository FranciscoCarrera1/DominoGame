const startBtn = document.getElementById("startBtn");
const instructionsBtn = document.getElementById("instructionsBtn");

startBtn.onclick = function () {
    window.location.href = "Page2.html";
};

instructionsBtn.onclick = function () {
    window.open("https://www.dominorules.com/straight-dominoes", "_blank");
};

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const dominoImage = new Image();
dominoImage.src = '/DominoImgs.png';

const WIDTH = canvas.width = 600;
const HEIGHT = canvas.height = 600;

function animate(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(dominoImage, 0, 0, WIDTH, HEIGHT);
    requestAnimationFrame(animate);
};
animate();