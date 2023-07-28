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
const COLORS = {
    rays: '#ffa600'
}
const FOV = toRadians(60);

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
    c.fillStyle = 'grey';
    c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function movePlayer(){
    player.x += Math.cos(player.angle)*player.speed;
    player.y += Math.sin(player.angle)*player.speed;

}

function outOfMapBounds(x, y) {
    return x < 0 || x>= map[0].length || y < 0 || y >= map.length;
}

function distance (x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); //pyphogorean formula
}
// Calculates the collision of a vertical ray with the walls

function  getVCollision(angle){
    const right = Math.abs(Math.floor((angle-Math.PI/2) /Math.PI) % 2)
    const firstX = right ? Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE : Math.floor(player.x / CELL_SIZE) * CELL_SIZE;
    const firstY = player.y + (firstX - player.x) * Math.tan(angle);

    const xA = right ? CELL_SIZE : -CELL_SIZE;
    const yA = xA * Math.tan(angle);

    let wall;
    let nextX = firstX;
    let nextY = firstY;
    while(!wall){
        const cellX = right ? Math.floor(nextX / CELL_SIZE) : Math.floor(nextX / CELL_SIZE) -1;
        const cellY = Math.floor(nextY / CELL_SIZE);

    if(outOfMapBounds(cellX, cellY)){
        break;
    }
    wall = map[cellY][cellX];
    if(!wall){
        nextX += xA;
        nextY += yA;
        }
    }
    return {angle, distance: distance(player.x, player.y, nextX, nextY), vertical: true}
}

//Calculates the collision point of a ray cast at a given angle

function castRay(angle){
    const vCollision = getVCollision(angle);
    // const hCollision = getHCollision(angle);

    return vCollision;
        
    return hCollision.distance >= vCollision.distance ? hCollision : vCollision;
}

function getRays(){
    const initialAngle = player.angle - FOV /2;
    const numberOfRays = SCREEN_WIDTH;
    const angleStep = FOV / numberOfRays;
    return Array.from( {length: numberOfRays}, (_, i) => {
        const angle = initialAngle + i * angleStep;
        const ray = castRay(angle);
        return ray;
    })   
}

function renderScene(){
    
}

function renderMinimap(posX = 0, posY = 0, scale = 1, rays){
    const cellSize = scale *CELL_SIZE;
    map.forEach((row,y) => {
        row.forEach((cell, x) => {
            if(cell){
            c.fillStyle = 'lime';
            c.fillRect(posX+x*cellSize, posY+y*cellSize, cellSize, cellSize);
            };
        })
    });

    c.strokeStyle = COLORS.rays;  //must be rendered before player otherwise it will override
    rays.forEach(ray => {
        c.beginPath();
        c.moveTo(player.x * scale+posX, player.y * scale+posY);
        c.lineTo(
            (player.x + Math.cos(ray.angle)*ray.distance)*scale,
            (player.y + Math.sin(ray.angle)*ray.distance)*scale,
        )
        c.closePath();
        c.stroke();
    })

        // player render 

    c.fillStyle = 'red' 
    c.fillRect(posX + player.x *scale - PLAYER_SIZE/2,
        posY + player.y *scale - PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE);

    const rayLength = PLAYER_SIZE*2;
    c.strokeStyle = 'blue';
    c.beginPath();
    c.moveTo(player.x * scale+posX, player.y * scale+posY);
    c.lineTo(
        (player.x + Math.cos(player.angle)*rayLength)*scale,
        (player.y + Math.sin(player.angle)*rayLength)*scale,
    )
    c.closePath();
    c.stroke();
}


function gameloop(){
    clearScreen();
    movePlayer();
    const rays = getRays();
    renderScene (rays);
    renderMinimap(0, 0, 0.75, rays);
}

setInterval(gameloop, tick);
    // Converts degrees to radians
function toRadians (deg) {
    return deg * Math.PI / 180;
}

//controls 
addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp'){
       player.speed = 2 
    }

    if(e.key === 'ArrowDown'){
        player.speed = -2 
     }
    });

addEventListener('keyup', (e) => {
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        player.speed = 0 
        }
    })   

addEventListener('mousemove', (e) => {
    player.angle += toRadians(e.movementX)
    })
});