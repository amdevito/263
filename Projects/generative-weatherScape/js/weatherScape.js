// Generative soundscape based on the weather in your location  - choose same as or opposite to (i.e. sometimes you want sunny music on a rainy day!)
//
// Reference sources:
//
// Generative music box project at Udemy
//
// And
//
// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
//
//
// https://medium.com/dev-red/tutorial-lets-make-music-with-javascript-and-tone-js-f6ac39d95b8c
//
// Ideas to do:
// - Replace the packages of mp3 sounds with the tone.js synthesizer
// - Visualization is ripples like in water, when the ripples overlap, the colours blend to make new colours
// - Need to get a google weather API
// - Then decide which elements from that API control which musical part. - frequency of notes, key, octave, distribution of note length, number of types of sounds used (1-3), bpm (always fairly slow but fluctuating between 60-90?.
// - Background colour should very slowly change/cycle
// - might be nice to make this 3 d ? the circles change to spheres?
///- when person launches the app - a tone is generated depending on their long and lat location in the world - that will be the base key? then the next note is determined by the temp? or the mode? something deterimes the progression at every 4 bars?
///LOOK INTO THIS-maybe have the circles shrink at a setInterval? so that it has a sort of breathing pulsing effect

window.onload = function () {
  let bufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/Cmajor4_5/A4.mp3",
      "sounds/Cmajor4_5/A5.mp3",
      "sounds/Cmajor4_5/C4.mp3",
      "sounds/Cmajor4_5/C5.mp3",
      "sounds/Cmajor4_5/D4.mp3",
      "sounds/Cmajor4_5/D5.mp3",
      "sounds/Cmajor4_5/E4.mp3",
      "sounds/Cmajor4_5/E5.mp3",
      "sounds/Cmajor4_5/G4.mp3",
      "sounds/Cmajor4_5/G5.mp3",
    ],
    finishedLoading
  );
  bufferLoader.load();

  function finishedLoading(bufferList) {
    Audio.init(bufferList);

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    canvas.addEventListener("mousedown", view.handleClick.bind(view), false);

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
};
