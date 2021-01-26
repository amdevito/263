/**************************************************
CART 263: Exercise 1 - Find the Nintendo World Intruder!!! (aka Where's Sausage Dog Plus)
Alana DeVito

Amongst the Nintendo World characters, find the intruder! When you have found them click and they will spin off screen and out of the world!

Meets the brief:
Enter and end screen with instruction to CLICK to begin the search game. Refresh screen to start again.
Background is a 8-bit Nintendo skyline and a bunch of classic Nintendo characters with a 'hidden' Sonic the Hedgehog that you find by clicking (Sonic is the Nintendo World Intruder since Sonic is from Sega World)
Sonic spins and moves diagonally, down and off screen when found.
Sonic Death song plays.

Additional Elements:
1. Sound pans with the direction of sonic's movement.
2. Game music (nintendoGameMusic) plays after CLICKing to enter game


**************************************************/
"use strict";
// set constants as number of images for the nintendo character in program and the number displayed overall
const NUM_CHARACTER_IMAGES = 11;
const NUM_CHARACTERS = 175;

//set arrays for images and the duplicated images of nintendo characters
let characterImages = [];
let characters = [];

//set variable for the Sonic character image
let sonicImage = undefined;
let sonic = undefined;

//set background image
let nintendo = undefined;

//set variables for the game sounds
let sonicDeath = undefined;

let gameMusic = undefined;

//set variables for enter screen and end screens.
let enterScreen = {
  string: `Find the Nintendo World Intruder!!! \n Please CLICK to Begin the SEARCH!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

let endScreen = {
  string: `So long Sonic! \n Refresh to play again!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

//set inital state as 'enter'
let state = `enter`; //different states: enter>game>end

//load images from assets, use array to set images in the 11 different character slots
function preload() {
  for (let i = 0; i < NUM_CHARACTER_IMAGES; i++) {
    let characterImage = loadImage(`assets/images/character${i}.gif`);
    characterImages.push(characterImage); //push the character image loaded into the characterImage variable into the characterImages Array
  }
  sonicImage = loadImage(`assets/images/sonic.gif`);
  nintendo = loadImage(`assets/images/welcome.gif`);

  //set different sound formats for differnt browsers
  soundFormats("wav", "mp3", "ogg");

  //set music to sound variables
  sonicDeath = loadSound(`assets/sounds/sonicDeath.mp3`);
  gameMusic = loadSound(`assets/sounds/nintendoGameMusic.mp3`);
}
//
//set up canvas, random locations for the characters and the sonic characters
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the characters, push characters in to the 175 character slots, fetch Character from class, push to character array
  for (let i = 0; i < NUM_CHARACTERS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let characterImage = random(characterImages);
    let character = new Character(x, y, characterImage);
    characters.push(character);
  }
  let x = random(0, width);
  let y = random(0, height);
  sonic = new Sonic(x, y, sonicImage);

  //call the enter and end screen set up functions
  setUpEnterScreen();
  setUpEndScreen();
}

function draw() {
  background(nintendo); //set background to the nintendo skyline.

  //as states change call functions to run different game screens
  if (state === `enter`) {
    enterStart();
  } else if (state === `game`) {
    gameStart();
  } else if (state === `end`) {
    gameEnd();
  }
}

//both enter and end screens set with same values
function setUpEnterScreen() {
  enterScreen.x = width / 2;
  enterScreen.y = 200;
  enterScreen.vx = 5;
  enterScreen.vy = 1;
  enterScreen.size = 30;
}

function setUpEndScreen() {
  endScreen.x = width / 2;
  endScreen.y = 200;
  endScreen.vx = 5;
  endScreen.vy = 1;
  endScreen.size = 30;
}

// function to create enterStart screen with text and instructions

function enterStart() {
  background(nintendo);
  textSize(enterScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Monaco");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(enterScreen.string, enterScreen.x, enterScreen.y);
}

//game start function, update characters from class into the array, also update sonic character from extended class
function gameStart() {
  for (let i = 0; i < characters.length; i++) {
    characters[i].update();
  }

  sonic.update();
}

//set the game end screen
function gameEnd() {
  push();
  background(nintendo);
  textSize(endScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Monaco");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(endScreen.string, endScreen.x, endScreen.y);
  pop();
}

//when mousePressed change state to enter, start and loop gameMusic and if state is 'game' then fetch the mousePressed function in the extended character class for Sonic
function mousePressed() {
  if (state === `enter`) {
    gameMusic.play();
    gameMusic.loop();
    state = `game`;
  } else if (state === `game`) {
    sonic.mousePressed();
  }
}
