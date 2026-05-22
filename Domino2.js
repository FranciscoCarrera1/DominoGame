const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const dominoImage = new Image();
dominoImage.src = 'DominoSet.png';

const COLS = 7;
const ROWS = 4;

const TILE_WIDTH = 580;
const TILE_HEIGHT = 1160;

const SCALE = 0.1;

const DRAW_WIDTH = TILE_WIDTH * SCALE;
const DRAW_HEIGHT = TILE_HEIGHT * SCALE;

class Domino {
  constructor(sx, sy, x, y) {
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.width = DRAW_WIDTH;
    this.height = DRAW_HEIGHT;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  draw() {
    ctx.drawImage(dominoImage, this.sx, this.sy, TILE_WIDTH, TILE_HEIGHT, this.x, this.y, this.width, this.height);
  }

  contains(mouseX, mouseY) {
    return (
      mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height
    );
  }
}
const dominoes = [];

dominoImage.onload = () => {
  for(let row = 0; row < ROWS; row++){
    for(let col = 0; col < COLS; col++){
      const sx = col * TILE_WIDTH;
      const sy = row * TILE_HEIGHT;

      const x = Math.random() * (CANVAS_WIDTH - DRAW_WIDTH);
      const y = Math.random() * (CANVAS_HEIGHT - DRAW_HEIGHT);

      dominoes.push(new Domino(sx, sy, x, y));
    }
  }
  animate();
};

let selectedDomino = null;

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for(let i = dominoes.length - 1; i >= 0; i--){
    if(dominoes[i].contains(mouseX, mouseY)){
      selectedDomino = dominoes[i];

      selectedDomino.dragging = true;

      selectedDomino.offsetX = mouseX - selectedDomino.x;
      selectedDomino.offsetY = mouseY - selectedDomino.y;

      dominoes.splice(i, 1);
      dominoes.push(selectedDomino);

      break;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!selectedDomino){
    return;
  }
  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  selectedDomino.x = mouseX - selectedDomino.offsetX;
  selectedDomino.y = mouseY - selectedDomino.offsetY;
});

canvas.addEventListener('mouseup', () => {
  if(selectedDomino){
    selectedDomino.dragging = false;
  }
  selectedDomino = null;
});

canvas.addEventListener('mouseleave', () => {
  if(selectedDomino){
    selectedDomino.dragging = false;
  }
  selectedDomino = null;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  dominoes.forEach(domino => {
    domino.draw();
  });

  requestAnimationFrame(animate);
}