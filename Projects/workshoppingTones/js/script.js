/**************************************************
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
