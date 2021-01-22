/**************************************************
263: Activity 1 - Where's Sausage Dog
Alana DeVito

A bunch of Animal objects with a 'hidding' sausage dog that you can find by clicking.
Sausage dog spins when found.
**************************************************/
"use strict";
// set constants as number of images for the animals in program and the number displayed overall
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

//set arrays for images and the duplicated images of animals
let animalImages = [];
let animals = [];

///
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255, 255, 0);

  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}
