// initial variables
// using the Canvas API to draw graphics on the screen for the game
const canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 4;
let dy = -4;
let ballRadius = 10;

// variables to handle the movement of paddles
let leftUpPressed = false;
let leftDownPressed = false;
let rightUpPressed = false;
let rightDownPressed = false;

// functions to handle key events when buttons are pressed
function DownHandler(e) {
    if(e.keyCode == 90){
        leftUpPressed = true;
    } else if (e.keyCode == 38){
        leftDownPressed  = true
    } else if (e.keyCode == 38){
        rightUpPressed =  true
    } else if (e.keyCode == 40){
        rightDownPressed = true
    }
}

function UpHandler(e) {
    if(e.keyCode == 90){
        leftUpPressed = false;
    } else if (e.keyCode == 38){
        leftDownPressed  = false
    } else if (e.keyCode == 38){
        rightUpPressed =  false
    } else if (e.keyCode == 40){
        rightDownPressed = false
    }
}

function Ball() {
    ctx.beginPath();
    ctx.arc(x,y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

let leftScore = 0;
let rightScore = 0;

function Scores() {
    ctx.font = "80px Arial"
    ctx.fillStyle = "blue";
    ctx.fillText(leftScore, (canvas.width/2) - 80, 70);
    ctx.fillText(rightScore, (canvas.width / 2) + 40, 70)
}