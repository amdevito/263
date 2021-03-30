/**************************************************
P2: Final project prototype for the Synth engine of the Any Day Music Machine (Part 2 of Prototype)
inspired by: the tutorials, “Generative Processes: Week 6, Part 1 - TONE.JS, DRONES” and “Generative Processes: Week 6, Part 2” (https://www.youtube.com/watch?v=ddVrGY1dveY&ab_channel=DavidBouchard and https://www.youtube.com/watch?v=CkjM8et49lI&ab_channel=DavidBouchard)

  Tone.js Documentation: https://tonejs.github.io/docs/14.7.77/
**************************************************/
let masterVolume = -9; ///in decibel
//need to click page to activate the sound
let ready = false;

//creating a synth object
let synth;

//variable to house the looping sound
let loop;

//connect to effects using this mixer variable
let mixer;

//store the scale being used for the composition
let scale;

//check what the previous note is, to determine what the next note will be
let prevNote;

//variables for the different waveforms used in FMsynthesis
let wave;
let wave2;

//Set up canvas of the UI and the standard Audio elements that will be used throughout the project
function setup() {
  createCanvas(windowWidth, windowHeight);

  //assign the mixer variable to a new gain object (like creating a fader channel)
  mixer = new Tone.Gain(); //connect sound nodes

  let reverb = new Tone.Reverb({
    wet: 0.8, //mostly wet 80% with 20% dry(1 is fully windowHeight),
    decay: 40, //length of the reverb tail
  });

  //add effect on to that mixer 'channel'
  mixer.connect(reverb);

  //the effected channel is patched to the output
  reverb.toDestination(); // same as / short hand of "connect(Tone.Master)" - so like patching to the Master out fader channel.

  //fetch the scale from Tonal and set to the scale variable
  scale = Tonal.Scale.get("c3 major").notes;
}

//create and set up audio after mouse pressed
function initializeAudio() {
  //*NEXT -  create another voice with a slightly different noise values (random CV) controlling the notes that are played in the same scale.
  synth = new Tone.FMSynth(); //check on the FMSynth specific parameters to feed this
  synth.oscillator.type = `sine`;
  synth.connect(mixer); //same as synth.connect(Tone.Master);

  loop = new Tone.Loop((time) => {
    //anonymous function - declaring the loop function as part of the function
    // let note = random(110, 880);//call random notes between the frq 110 to 880
    // let note = `c4`; //can name notes in this format as well
    // let note = random(scale);

    ///using noise to control the more linear movement through the scale, rather than random - there must be a way to control which notes in the harmony are played (i.e quartal harmony )
    let n = noise(frameCount * 0.1);
    let i = floor(map(n, 0, 1, 0, scale.length)); //floor rounds down
    let note = scale[i];

    if (prevNote != note) {
      //(freq, noteDuration, time)< last value is how much time before the note plays 'pause'. The default = now
      //default BPM 120 - 1n = 1 beat, 4n = quarter note
      synth.triggerAttackRelease(note, "1n", time); //attack, duration
    }
    prevNote = note;
  }, "2n");
  loop.start();
  // //4 different types of osc - sin (default), square, tri, saw
  // osc = new Tone.Oscillator({
  //   type: `sine`,
  //   frequency: 220,
  //   volume: -1,
  // }); /// default freq. 440 ---> A4
  //
  // // osc.type = `triangle`;
  // // osc.volume.value = -6;
  //
  // // osc.frequency.value = 220; ///A3
  // // osc.connect(Tone.Master); //'speaker' / output
  //
  // osc.toDestination(); /// shorthand for "connect(Tone.Master)"
  //
  // osc2 = new Tone.Oscillator({
  //   type: `triangle`,
  //   frequency: 220,
  //   volume: -1,
  // }); /// default freq. 440 ---> A4
  // // osc2.frequency.value = 220; ///A3
  // // osc.connect(Tone.Master); //'speaker' / output
  // osc2.toDestination(); /// shorthand for "connect(Tone.Master)"
  //
  // lfo = new Tone.LFO("0.2hz", 210, 230);
  // lfo.connect(osc.frequency);

  //drawing the waveform
  wave = new Tone.Waveform();
  Tone.Master.connect(wave); ///take the osc and connected it to the waveform to see the waveform of that oscillator.
  Tone.Master.volume.value = masterVolume;
  // wave2 = new Tone.Waveform();
  // osc2.connect(wave2); ///take the osc and connected it to the waveform to see the waveform of that oscillator.

  // volume is a parameter signal - u can use an OSC to control the volume of another oscillator i.e like a VCA

  // Tone.Master.volume.value = -30;

  // Tone.Master.volume.rampTo(-20, 2); //ramp from the current volume to the first value at the 2nd value's time.
  Tone.Transport.start(); /// timing for musical events
}
///on window resize , update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //responsive webpage
}
//
// function loopStep(time) {
//   // let note = random(110, 880);//call random notes between the frq 110 to 880
//   // let note = `c4`; //can name notes in this format as well
//   // let note = random(scale);
//
//   ///using noise to control the more linear movement through the scale, rather than random - there must be a way to control which notes in the harmony are played (i.e quartal harmony )
//   let n = noise(frameCount * 0.1);
//   let i = floor(map(n, 0, 1, 0, scale.length)); //floor rounds down
//   let note = scale[i];
//
//   if (prevNote != note) {
//     //(freq, noteDuration, time)< last value is how much time before the note plays 'pause' default = now
//     //default BPM 120 - 1n = 1 beat, 4n = quarter note
//     synth.triggerAttackRelease(note, "16n", time); //attack, duration
//   }
//   prevNote = note;
// }

//draw loops through code continuously
function draw() {
  background(0);

  if (ready) {
    //do audio
    drawWaveform(wave);
  } else {
    //entry page, to click and activate sound
    fill(255, 0, 255);
    textAlign(CENTER, CENTER);
    text("CLICK TO START", width / 2, height / 2);
  }
}

//create the modulating wave form
function drawWaveform(wave, w = width, h = height) {
  // osc.frequency.value = map(mouseX, 0, width, 110, 880); //connect the mouseX position to the frequency of the oscillator to change the freq.
  // osc2.frequency.value = map(mouseX, 0, width, 110, 880);
  stroke(40, 200, 2);
  let buffer = wave.getValue(0);

  for (
    let i = 0;
    i < buffer.length;
    i++ /// start at 0, while the number is under the amount of the array of the buffer length add 1 to the number.
  ) {
    let x = map(i, 0, buffer.length, 0, w);
    let y = map(buffer[i], -1, 1, 0, h);

    point(x, y);
  }
}

//press mouse to begin the music
function mousePressed() {
  if (!ready) {
    //start  audio objects
    // osc.start();
    // osc2.start();
    // lfo.start();

    ready = true;
    //create rhythmic sequences
    initializeAudio();
  }
}
