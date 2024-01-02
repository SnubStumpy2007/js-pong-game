// initial variables
// using the Canvas API to draw graphics on the screen for the game
const canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
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
  if (e.keyCode == 90) {
    leftUpPressed = true;
  } else if (e.keyCode == 83) {
    leftDownPressed = true;
  } else if (e.keyCode == 38) {
    rightUpPressed = true;
  } else if (e.keyCode == 40) {
    rightDownPressed = true;
  }
}

function UpHandler(e) {
  if (e.keyCode == 90) {
    leftUpPressed = false;
  } else if (e.keyCode == 83) {
    leftDownPressed = false;
  } if (e.keyCode == 38) {
    rightUpPressed = false;
  } else if (e.keyCode == 40) {
    rightDownPressed = false;
  }
}

function Ball() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

let leftScore = 0;
let rightScore = 0;

function Scores() {
  ctx.font = "80px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText(leftScore, canvas.width / 2 - 80, 70);
  ctx.fillText(rightScore, canvas.width / 2 + 40, 70);
}

function collisionsWithLeftPaddle() {
  if (x - ballRadius <= 5 + l_PaddleWidth) {
    if (y > l_PaddleY && y < l_PaddleY + l_PaddleHeight) dx = -dx;
    else if (x - ballRadius <= 0) {
      rightScore++;

      // alert(Game Over)
      x = canvas.width / 2;
      y = canvas.height / 2;
      dx = -dx;
      dy = -dy;
      // document.location.reload()
      if (rightScore === 5) {
        alert("Right Player Wins")
        window.location.reload();
      }
    }
  }
}

function collisionsWithRightPaddle() {
  if (x + ballRadius >= canvas.width - (r_PaddleWidth + 5)) {
    if (y > r_PaddleY && y < r_PaddleY + r_PaddleHeight) dx = -dx;
    else if (x + ballRadius >= canvas.width) {
      leftScore++;

      // alert(Game Over)
      x = canvas.width / 2;
      y = canvas.height / 2;
      dx = -dx;
      dy = -dy;
      // document.location.reload()
      if (leftScore === 5){
        alert("Left player wins")
        localStorage.setItem(leftScore, "Left Player")
        window.location.reload();
      }
    }
  }
}

function computeCollisionsWithWallsAndPaddle() {
  collisionsWithLeftPaddle();
  collisionsWithRightPaddle();
  if (y - ballRadius <= 0 || y + ballRadius >= canvas.height) {
    dy = -dy;
  }
}

// for left-hand side player
let l_PaddleHeight = 80;
let l_PaddleWidth = 10;
let l_PaddleX = 5;
let l_PaddleY = canvas.height / 2 - l_PaddleHeight / 2;

function drawLeftPaddle() {
  ctx.beginPath();
  ctx.rect(l_PaddleX, l_PaddleY, l_PaddleWidth, l_PaddleHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
  if (leftDownPressed && l_PaddleY < canvas.height - l_PaddleHeight) {
    l_PaddleY += 7;
  } else if (leftUpPressed && l_PaddleY > 0) {
    l_PaddleY -= 7;
  }
}

// for right-hand side player
let r_PaddleHeight = 80;
let r_PaddleWidth = 10;
let r_PaddleX = canvas.width - (r_PaddleWidth + 5);
let r_PaddleY = canvas.height / 2 - r_PaddleHeight / 2;

function drawRightPaddle() {
  ctx.beginPath();
  ctx.rect(r_PaddleX, r_PaddleY, r_PaddleWidth, r_PaddleHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
  if (rightDownPressed && r_PaddleY < canvas.height - r_PaddleHeight) {
    r_PaddleY += 7;
  } else if (rightUpPressed && r_PaddleY > 0) {
    r_PaddleY -= 7;
  }
}

// draw out the scene
function Scene() {
  ctx.beginPath();
  ctx.rect(canvas.width / 2 - 1, 0, 3, canvas.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Scores();
  Scene();
  drawLeftPaddle();
  drawRightPaddle();
  Ball();
  computeCollisionsWithWallsAndPaddle();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
document.addEventListener("keydown", DownHandler, false);
document.addEventListener("keyup", UpHandler, false);
