let bg;
let maskOne;
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
let maskOneHeight = 150;
let maskOneWidth = 150;
let maskOneX = 20;
let maskOneStartY = 500 - maskOneHeight - 50; // testing numbers

// all object variables - coconut
let coconutOneX = 200;
let coconutOneY = 20;
let coconutOneLength = 60;
let coconutOneHeight = 60; // testing numbers

// array of objects to loop over to drop the coconuts
let objectArray = [
  {x: coconutOneX, y: coconutOneY},
  {x: coconutOneX + 1200, y: coconutOneY + 200},
  {x: coconutOneX + 2000, y: coconutOneY + 350},
];

function preload() {
    bg = loadImage('../img/bg-game.jpg');
    maskOne = loadImage('../img/mask1.png');
    coconutOne = loadImage('../img/Coconut_7.png');

    // mask2 = loadImage('../img/mask2.png');
    // mask3 = loadImage('../img/mask3.png');
    // mask4 = loadImage('../img/mask4.png');
    // mask5 = loadImage('../img/mask5.png');
    // mask6 = loadImage('../img/mask6.png');
}

function setup() {
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
  image(maskOne, 200, 400, 60, 100);
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
    objectArray[i].x -= 6;

    // collision 
    if (
      maskOneStartY >= objectArray[i].y + 20 &&
      maskOneStartY <= objectArray[i].y + coconutOneHeight - 40 &&
      maskOneX + maskOneWidth >= objectArray[i].x &&
      maskOneX <= objectArray[i].x + coconutOneLength
    ) {
      gameIsOver = true;
    }

    //this if statement checks if the image has past 0 and then resets the x so it will come again from the right
    if (objectArray[i].x < -500) {
      objectArray[i].x = 2000;
    }
  }  
  }


//this is what happens when the game is over. Hide the game screen, stop the draw function and reset the objects and show the game over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  //no loop is used to stop the draw function so it is not always running behind the scenes
  noLoop();
}

function decayVelocity(vel) {
  // implement decaying velocities
  const decay = vel > 0 ? -0.05 : vel < 0 ? 0.05 : 0;
  vel += decay;
  const overshootFromTop = vel < 0 && decay < 0;
  const overshootFromBot = vel > 0 && decay > 0;
  if (overshootFromTop || overshootFromBot) {
    return 0;
  }
  return vel;
}

window.onload = () => {
  // wire up the start/restart buttons to use the startGame function
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    startGame();
  }
}

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