/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let ready = false;
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  if (ready) {
    //do audio
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    text("CLICK TO START", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {
    //start out audio objects
    ready = true;
  }
}
