let gameIsOver = false;
let bg;
let maskOne;
let interval = 0;
let coconuts;
let score = 0;
let missedCoconuts = [];
// let mask2;
// let mask3;
// let mask4;
// let mask5;
// let mask6;
// let selectedMask;

// let coconutOne;
// let coconutTwo;

let firstScreen = document.querySelector('#game-intro');
let secondScreen = document.querySelector('#game-area');
let thirdScreen = document.querySelector('#game-over');

// all character variables - mask
let maskOneHeight = 99;
let maskOneWidth = 66;
let maskOneX = 100;
let maskOneStartY = 700 - maskOneHeight - 20; // testing numbers

// all object variables - coconut

let coconutOneX = 20;
let coconutOneY = 600;
let coconutOneLength = 60;
let coconutOneHeight = 60; // testing numbers

// array of objects to loop over to drop the coconuts
let objectArray = [
  {x: coconutOneY, y: coconutOneY},
  {x: coconutOneY + 600, y: coconutOneY + 500},
  {x: coconutOneY + 1200, y: coconutOneY + 650},
  {x: coconutOneY + 2000, y: coconutOneY + 750},
];

class coconut {
  constructor(x, y, length, width) {
  this.x = x;
  this.y = y;
  this.length = length;
  this.width = width;
  this.score = score;
  }

  update() {
    this.objectArray.forEach((objectTwo, index) => {
      objectTwo.y += 5;
      if (objectTwo.y - objectTwo.length > windowheight) {
        objectArray.splice(index, 1);
      };
    });
  };
} 

function preload() {
    bg = loadImage('../img/bg-game.jpg');
    maskOne = loadImage('../img/mask2.png');
    coconutOne = loadImage('../img/Coconut_7.png');
    // mask2 = loadImage('../img/mask2.png');
    // mask3 = loadImage('../img/mask3.png');
    // mask4 = loadImage('../img/mask4.png');
    // mask5 = loadImage('../img/mask5.png');
    // mask6 = loadImage('../img/mask6.png');
}

function setup() {
    // create canvas and attach to the game- div
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    canvas.parent('game-area');
    secondScreen.style.display = "none";
    thirdScreen.style.display = "none";
    noLoop();
}

function draw() {
  background(230, 232, 151);
  image(bg, 60, 30, 1650, 950);
  image(maskOne, maskOneX, maskOneStartY, maskOneWidth, maskOneHeight);
  interval++;

  if ((interval % 100) == 0) {
     objectArray.push(new coconut(random(100, 1600), 200, coconutOneLength, coconutOneHeight));
  }
  // image(coconutOne, 700, 400, 60, 60); // just for size-reference 
  // image(mask2, 10, 10);
  // image(mask3, 10, 10);
  // image(mask4, 10, 10);
  // image(mask5, 10, 10);
  // image(mask6, 10, 10);

  for (let i = 0; i < objectArray.length; i++) {
    image(
      coconutOne,
      objectArray[i].x,
      objectArray[i].y,
      coconutOneLength,
      coconutOneHeight
    );
    objectArray[i].y += 4;

    // collision 
    if (
      maskOneStartY >= objectArray[i].y + 200 &&
      maskOneStartY <= objectArray[i].y + coconutOneHeight - 40 &&
      maskOneY + maskOneWidth >= objectArray[i].x &&
      maskOneY <= objectArray[i].x + coconutOneLength
    ) {
      gameIsOver = true;
    }
    //this if statement checks if the image has past 0 and then resets the x so it will come again from the right
    if (objectArray[i].x < -500) {
      objectArray[i].x = 1000;
    }
  }  
  if (keyIsDown(LEFT_ARROW)) {
    maskOneX -= 15;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    maskOneX += 15;
  }
  if (keyIsDown(UP_ARROW)) {
    maskOneStartY -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    maskOneStartY += 10;
  } 
  
  if (collidesWith(objectArray, maskOne)) {
  
  // order like the function
  // console.log(collidesWith(objectArray, maskOne));
    score++;
    console.log(score);
  }

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
function collision(objectOne, objectTwo) {
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
}

// function decayVelocity(vel) {
//   // implement decaying velocities
//   const decay = vel > 0 ? -0.05 : vel < 0 ? 0.05 : 0;
//   vel += decay;
//   const overshootFromTop = vel < 0 && decay < 0;
//   const overshootFromBot = vel > 0 && decay > 0;
//   if (overshootFromTop || overshootFromBot) {
//     return 0;
//   }
//   return vel;
// }

window.onload = () => {
  // wire up the start/restart buttons to use the startGame function
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    startGame();
  }
}

// gameOverBtn.addEventListener("click", () => {
//   gameIsOver = true;
// });

function startGame() {
  // change the css, hide both game-intro and game-over screen, so that
  // we can use this function both to start/restart
  // creating variables to store the values
  // const gameIntroElement = document.querySelector("#game-intro");
  firstScreen.style.display = "none";
  // const gameOverElement = document.querySelector(".game-over");
  thirdScreen.style.display = "none";
  // show the board
  // const gameAreaElement = document.getElementById("game-area");
  secondScreen.style.display = "flex";
  // and start the draw() loop from p5
  loop();
}