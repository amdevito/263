// Generative soundscape prototype using JQUERY elements
//
// Brief:
// 1. X add modal instructions dialogue when the page loads. Explains to the user what the app is, what it does and how it interacts.
// --- background color slowly modulates when you open a hidden modal with radio clickable instructions and choose modulate background colours via current wind speed? oscillates color values slllllooowlly.
//2. X drag and drop modulating ripples on to the tone ripples  to add effects to that element.
//3. X Hidden dialog box with options to change the scape's tonality - key or mode.
// --For this exercise - *DONE* modulo at start changes background colour to white or keeps it dark.
//                     - change the size of the ripples
//                     - change the timing of the replay of the notes
//                     - the moveable ripples silences that tone that you place them on.

$(`#introduction-dialog`).dialog({
  modal: true,
  buttons: {
    "Make background white": function () {
      //for P2: change to - Modulate background by wind speed
      // $(`body`).css({ background: "white" });
      $(`canvas`).css({ "background-color": "white" });
      $(this).dialog("close");
      ///need to add back ground modulating by oscillator value that is received and scaled from the user's location and weather information.
    },
    "Keep background dark": function () {
      $(this).dialog("close");
    },
  },
});

$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "explode",
      duration: 1000,
    },
  });

  $("#opener").on("click", function () {
    $("#dialog").dialog("open");
  });
});

$(function () {
  $("input").checkboxradio();
});

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

$(`#ripple-one`).draggable();
$(`#ripple-two`).draggable();
$(`#ripple-three`).draggable();
$(`#ripple-four`).draggable();
