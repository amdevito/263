/**************************************************
Responsive Voice activity

Alana DeVito
Here is a description of this template p5 project.
**************************************************/
"use strict";

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
}

function mousePressed() {
  responsiveVoice.speak(
    "Hello world, how are you today?",
    "UK English Female",
    {
      pitch: 0.01,
      rate: 0.02,
      volume: 1,
    }
  );
}
