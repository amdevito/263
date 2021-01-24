/**************************************************
263: Exercise 1 - Find the Nintendo World Intruder!!!
Alana DeVito

A bunch of classic Nintendo characters with a 'hidding' Sonic the Hedgehog that you can find by clicking.
Sonic spins when found. ??? Sonic loses = sonic die sounds?
**************************************************/
"use strict";
// set constants as number of images for the animals in program and the number displayed overall
const NUM_CHARACTER_IMAGES = 11;
const NUM_CHARACTERS = 125;

//set arrays for images and the duplicated images of animals
let characterImages = [];
let characters = [];

let sonicImage = undefined;
let sonic = undefined;

let welcome = undefined;

///
function preload() {
  for (let i = 0; i < NUM_CHARACTER_IMAGES; i++) {
    let characterImage = loadImage(`assets/images/character${i}.gif`);
    characterImages.push(characterImage); //push the character image loaded into the characterImage variable into the characterImages Array
  }
  sonicImage = loadImage(`assets/images/sonic.gif`);
  welcome = loadImage(`assets/images/welcome.gif`);
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
}

function draw() {
  background(welcome);

  for (let i = 0; i < characters.length; i++) {
    characters[i].update();
  }

  sonic.update();
}

function mousePressed() {
  sonic.mousePressed();
}
