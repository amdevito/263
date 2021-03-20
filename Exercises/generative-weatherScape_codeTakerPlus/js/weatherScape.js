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
  //what gets passed to the loadBuffer method is the URL of the file containing the sound and the index of that sound in the list.
  //create new bufferLoader object via the BufferLoader Class - send 3 arguements -  audio context, which is the property of the Audio object /class , and array of the soundfiles, and callBack funtion to call once the sounds have been successfully loaded.
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
    finishedLoading //the callback function
  );
  bufferLoader.load(); //iterates through all the file names in the array, passes the file name w the index number of the name in the list, to the loadBuffer method which is responsible for loading the sounds as binary data, using XMLHTTpRequest

  //once loadBuffer has successfully loaded the sounds, the callback function, 'finishedLoading' is called.
  ///set up the view, clickhandler for the canvas and start to the calls to updatedisplay to kick off the animation
  function finishedLoading(bufferList) {
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    canvas.addEventListener("mousedown", view.handleClick.bind(view), false);

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
};
