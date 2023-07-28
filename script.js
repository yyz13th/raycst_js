document.addEventListener('DOMContentLoaded', () => {


const SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    canvas = document.createElement('canvas');

canvas.setAttribute('width', SCREEN_WIDTH);
canvas.setAttribute('height', SCREEN_HEIGHT);
document.body.appendChild(canvas); //puts canvas into body

const tick = 30; //inits refresh rate
const c = canvas.getContext('2d');
const CELL_SIZE = 64;
const PLAYER_SIZE = 10;

const map = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
];

const player = {
    x:CELL_SIZE*1.5,
    y:CELL_SIZE*2,
    angle: 0,
    speed: 0
}
function clearScreen(){
    c.fillStyle = 'blue';
    c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function movePlayer(){

}

function getRays(){
    return [];
    
}

function renderScene(){
    
}

function renderMinimap(posX = 0, posY = 0, scale = 1, rays){
    const cellSize = scale *CELL_SIZE;
    map.forEach((row,y) => {
        row.forEach((cell, x) => {
            if(cell){
            c.fillStyle = 'grey';
            c.fillRect(posX+x*cellSize, posY+y*cellSize, cellSize, cellSize);
            };
        })
    });

    c.fillStyle = 'lime'
    c.fillRect(posX + player.x *scale - PLAYER_SIZE/2,
        posY + player.y *scale - PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE);
}


function gameloop(){
    clearScreen();
    movePlayer();
    const rays = getRays();
    renderScene (rays);
    renderMinimap(0, 0, 0.75, rays);
}

setInterval(gameloop, tick);
});