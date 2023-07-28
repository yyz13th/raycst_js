document.addEventListener('DOMContentLoaded', () => {


const screenWidth = window.innerWidth,
    screenHeight = window.innerHeight,
    canvas = document.createElement('canvas');

canvas.setAttribute('width', screenWidth);
canvas.setAttribute('height', screenHeight);
document.body.appendChild(canvas); //puts canvas into body

const tick = 30; //inits refresh rate
const c = canvas.getContext('2d');

function clearScreen(){
    c.fillStyle = 'blue';
    c.fillRect(0, 0, screenWidth, screenHeight);
}

function movePlayer(){

}

function getRays(){
    
}

function renderScene(){
    
}

function renderMinimap(x, y, scale, rays){
    
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