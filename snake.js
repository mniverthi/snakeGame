const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const right = new Audio();
const left = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

var snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

var food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

var score = 0;
var d;

document.addEventListener("keydown", direction);

function direction(event){
    if( event.keyCode == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    } else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    } else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    } else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.drawImage(ground,0,0);
    
    for(let i = 0; i < snake.length ; i++){
        ctx.fillStyle = (i == 0) ? "green" : "dark green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    let headX = snake[0].x;
    let headY = snake[0].y;

    if(d == "LEFT") 
        headX -= box;
    if(d == "UP") 
        headY -= box;
    if(d == "RIGHT") 
        headX += box;
    if(d == "DOWN") 
        headY += box;
    
    if(headX == food.x && headY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    } else {
        snake.pop();
    }
    let newHead = {
        x : headX,
        y : headY
    }
    if(headX < box || headX > 17 * box || headY < 3 * box || headY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        ctx.fillStyle = "white";
        ctx.fillText("Game Over",  6.5 * box, 10 * box);
    }
    
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Calibri";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);


















