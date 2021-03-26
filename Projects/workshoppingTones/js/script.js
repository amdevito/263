/**************************************************
<<<<<<< HEAD
P2: Workshopping Tutorial for Generative Synthesis
**************************************************/
let ready = false;
let osc;
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  osc = new Tone.Oscillator(); /// default freq. 440 ---> A4

  osc.connect(Tone.Master); //'speaker' / output
}

///on window resize , update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

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
    //start  audio objects
    osc.start();
    ready = true;
  }
}
=======
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

}

// draw()
//
// Description of draw() goes here.
function draw() {

}
>>>>>>> f0549b248d967fd0a81d4c4e1841e1654f310598
