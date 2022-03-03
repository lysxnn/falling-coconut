let gameIsOver = false;
let bg;
let maskOne;
let interval = 0;
let coconuts;
let score = 0;
let missedCoconuts = 0;
let objectArray = [];
let candyNight;

let firstScreen = document.querySelector('#game-intro');
let secondScreen = document.querySelector('#game-area');
let thirdScreen = document.querySelector('#game-over');
let restartBtn = document.querySelector("#restart-button");

// all character variables - mask
let maskOneHeight = 99;
let maskOneWidth = 66;
let maskOneX = 100;
let maskOneStartY = 700 - maskOneHeight - 20; // testing numbers

// all object variables - coconut
let coconutOneX = 20;
let coconutOneY = 200;
let coconutOneLength = 60;
let coconutOneHeight = 60; // testing numbers

class coconut {
  constructor(x, y, length, width) {
  this.x = x;
  this.y = y;
  this.length = length;
  this.width = width;
  this.score = score;
  }
} 

function preload() {
    bg = loadImage('../img/bg-game.png');
    maskOne = loadImage('../img/mask2.png');
    coconutOne = loadImage('../img/Coconut_7.png');
    candyNight = loadFont('../assets/Candy Night.otf');
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    canvas.parent('game-area');
    textFont(candyNight);
    secondScreen.style.display = "none";
    thirdScreen.style.display = "none";
    noLoop();
}

function draw() {
  background(250);
  image(bg, 0, 0, windowWidth, windowHeight);
  image(maskOne, maskOneX, maskOneStartY, maskOneWidth, maskOneHeight);
  interval++;
  
  if ((interval % 80) == 0) {
     objectArray.push(new coconut(random(100, 1600), 200, coconutOneLength, coconutOneHeight));
  }

  for (let i = 0; i < objectArray.length; i++) {
    image(
      coconutOne,
      objectArray[i].x,
      objectArray[i].y,
      coconutOneLength,
      coconutOneHeight
    );
    objectArray[i].y += 2;

    if (objectArray[i].y >= windowHeight && objectArray[i].y <= windowHeight + 1) {
      missedCoconuts++;
      objectArray.splice(i, 1);
    }

    if (missedCoconuts == 10) {
      gameIsOver = true;
    }
    
    // collision 
    if (
      maskOneStartY >= objectArray[i].y + 200 &&
      maskOneStartY <= objectArray[i].y + coconutOneHeight - 40 &&
      maskOneY + maskOneWidth >= objectArray[i].x &&
      maskOneY <= objectArray[i].x + coconutOneLength
    )
    //this if statement checks if the image has past 0 and then resets the x so it will come again from the right
    if (objectArray[i].x < -500) {
      objectArray[i].x = 1000;
    }
  }  

  if (keyIsDown(LEFT_ARROW)) {
    if (maskOneX > 0) {
    maskOneX -= 15;
  }}
  if (keyIsDown(RIGHT_ARROW)) {
    if (maskOneX + maskOneWidth < windowWidth) {
    maskOneX += 15;
  }}
  if (keyIsDown(UP_ARROW)) {
    if (maskOneStartY > 0) {
    maskOneStartY -= 10;
  }}
  if (keyIsDown(DOWN_ARROW)) {
    if (maskOneStartY + maskOneHeight < windowHeight) {
    maskOneStartY += 10;
  }}
  // order like the function
  if (collidesWith(objectArray, maskOne)) {
  score++;
  }

  // print the score and the missed coconuts in the game-area
  textSize(44);
  text("Score:", 600, 100);
  text(score, 750, 100);
  fill(125, 162, 46);

  textSize(44);
  text("Missed coconuts:", 900, 100);
  text(missedCoconuts, 1250, 100);
  fill(125, 162, 46);

  if (gameIsOver) {
  gameOver();
  }
}

// these arguments are generic
function collidesWith(anyArray, anyObject) {
  // check the array of obstacles, for one that collides, since
  // .find returns either undefined or the found element, we need to do a
  // boolean conversion -> !! does that. returns true when the collision is happening.
  return !!anyArray.find((element) => collision(anyObject, element)); // the order is important!
}

// this is just a generic function with generic arguments
// pass the name of the mask but a generic name for coconuts because there are many
function collision(maskOne, objectTwo) {
  // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  let isCollisionTrue = (
    maskOneX < objectTwo.x + objectTwo.width &&
    maskOneX + maskOneWidth > objectTwo.x &&
    maskOneStartY < objectTwo.y + objectTwo.length &&
    maskOneHeight + maskOneStartY > objectTwo.y
  );
  if (isCollisionTrue) {
    objectTwo.y = windowHeight + 20;
  }
  return isCollisionTrue;
}

//this is what happens when the game is over. Hide the game screen, stop the draw function and reset the objects and show the game over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  //no loop is used to stop the draw function so it is not always running behind the scenes
  noLoop();

  const scoreElement = document.querySelector("#game-over span");
  scoreElement.innerText = score;

  coconuts = new coconut;
}

window.onload = () => {
  // wire up the start/restart buttons to use the startGame function
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    score = 0;
    missedCoconuts = 0;
    objectArray = [];
    gameIsOver = false;
    startGame();
  }
}

function startGame() {
  // change the css, hide both game-intro and game-over screen, so that
  // we can use this function both to start/restart
  firstScreen.style.display = "none";
  thirdScreen.style.display = "none";
  secondScreen.style.display = "flex";
  // and start the draw() loop from p5
  loop();
}