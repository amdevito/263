/**************************************************
263: Exercise 1 - Find the Nintendo World Intruder!!!
Alana DeVito

Enter screen with instruction to press shift to begin the search game. Background is a 8-bit nintendo skyline.
A bunch of classic Nintendo characters with a 'hidding' Sonic the Hedgehog that you can find by clicking.
Sonic spins and moves down and off screen when found. Sonic Death song plays.
**************************************************/
"use strict";
// set constants as number of images for the animals in program and the number displayed overall
const NUM_CHARACTER_IMAGES = 11;
const NUM_CHARACTERS = 175;

//set arrays for images and the duplicated images of animals
let characterImages = [];
let characters = [];

let sonicImage = undefined;
let sonic = undefined;

let nintendo = undefined;

let sonicDeath = undefined;

let enterScreen = {
  string: `Find the Nintendo World Intruder!!! \n Please click <SHIFT> to Begin the SEARCH!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

//set inital state
let state = `enter`; //different states: enter>title>level1>gameover>win>level2>level3

//Set up Functions

///
function preload() {
  for (let i = 0; i < NUM_CHARACTER_IMAGES; i++) {
    let characterImage = loadImage(`assets/images/character${i}.gif`);
    characterImages.push(characterImage); //push the character image loaded into the characterImage variable into the characterImages Array
  }
  sonicImage = loadImage(`assets/images/sonic.gif`);
  nintendo = loadImage(`assets/images/welcome.gif`);

  soundFormats("wav", "mp3", "ogg");

  sonicDeath = loadSound(`assets/sounds/sonicDeath.mp3`);
}
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the characters
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

  setUpEnterScreen();
}

function draw() {
  background(nintendo);

  if (keyIsDown(SHIFT)) {
    state = `game`;
  }

  if (state === `enter`) {
    enterStart();
  } else if (state === `game`) {
    gameStart();
  }
}

function setUpEnterScreen() {
  enterScreen.x = width / 2;
  enterScreen.y = 200;
  enterScreen.vx = 5;
  enterScreen.vy = 1;
  enterScreen.size = 30;
}

function enterStart() {
  // set up click to enter screen

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

function gameStart() {
  for (let i = 0; i < characters.length; i++) {
    characters[i].update();
  }

  sonic.update();

  if (Sonic.found) {
    play.sonicDeath();
  }
}

function mousePressed() {
  sonic.mousePressed();
}
