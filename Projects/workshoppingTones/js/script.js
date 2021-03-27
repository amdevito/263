/**************************************************
P2: Workshopping Tutorial for Generative Synthesis
**************************************************/
let ready = false;
let osc;

let osc2;

let wave;
let wave2;

//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  osc = new Tone.Oscillator(); /// default freq. 440 ---> A4
  osc.frequency.value = 220; ///A3
  // osc.connect(Tone.Master); //'speaker' / output
  osc.toDestination(); /// shorthand for "connect(Tone.Master)"

  osc2 = new Tone.Oscillator(); /// default freq. 440 ---> A4
  osc2.frequency.value = 220; ///A3
  // osc.connect(Tone.Master); //'speaker' / output
  osc2.toDestination(); /// shorthand for "connect(Tone.Master)"

  wave = new Tone.Waveform();
  osc.connect(wave); ///take the osc and connected it to the waveform to see the waveform of that oscillator.

  // wave2 = new Tone.Waveform();
  // osc2.connect(wave2); ///take the osc and connected it to the waveform to see the waveform of that oscillator.

  // volume is a parameter signal - u can use an OSC to control the volume of another oscillator i.e like a VCA

  // Tone.Master.volume.value = -16;

  Tone.Master.volume.rampTo(-20, 2); //ramp from the current volume to the first value at the 2nd value's time.
}

///on window resize , update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (ready) {
    //do audio
    osc.frequency.value = map(mouseX, 0, width, 110, 880); //connect the mouseX position to the frequency of the oscillator to change the freq.
    // osc2.frequency.value = map(mouseX, 0, width, 110, 880);
    stroke(255);
    let buffer = wave.getValue(0);
    for (
      let i = 0;
      i < buffer.length;
      i++ /// start at 0, while the number is under the amount of the array of the buffer length add 1 to the number.
    ) {
      let x = map(i, 0, buffer.length, 0, width);
      let y = map(buffer[i], -1, 1, 0, height);
      fill(200, 30, 2); ///why isn't this working?
      point(x, y);
    }
  } else {
    fill(255, 0, 255);
    textAlign(CENTER, CENTER);
    text("CLICK TO START", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {
    //start  audio objects
    osc.start();
    osc2.start();

    ready = true;
  }
}
