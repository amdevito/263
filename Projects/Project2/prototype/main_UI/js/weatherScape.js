//P2: Proposal and Prototype
// Draft of potential elements and design of the Any Day Music Machnie (Weather Generating Soundscape Application)
// SEE folder titled 'proposal' detailed description of this 2 part prototype and the future implimentations for the final project.
// \*\*CITATION: This project was inspired by https://www.udemy.com/course/generative-music-box/ & http://www.wickedlysmart.com/projects/

//

//first dialog box on entry to application
$(`#introduction-dialog`).dialog({
  modal: true,
  buttons: {
    "Make background white": function () {
      //for P2: change to - Modulate background by wind speed
      // $(`body`).css({ background: "white" });
      $(`canvas`).css({ "background-color": "white" }); //change the css color element to white
      $(this).dialog("close");
      ///need to add back ground modulating by oscillator value that is received and scaled from the user's location and weather information.
    },
    "Keep background dark": function () {
      $(this).dialog("close"); //don't do anything but close the dialog box
    },
  },
});

//'hidden' dialog box - click button with '¯\_(ツ)_/¯'
$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000, //how long to complete this effect
    },
    hide: {
      effect: "explode",
      duration: 1000, //how long to complete this effect
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
  //for final, the buffer loader will be sent the synth object containing the parameters of the FM synth and the notes that will make up the melody lines of the composition.
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

//make the animated ripples at the top of the page DRAGGABLE// will add 'droppable' for the activation of the delay effect to the tone ripples for the final project.
$(`#ripple-one`).draggable();
$(`#ripple-two`).draggable();
$(`#ripple-three`).draggable();
$(`#ripple-four`).draggable();
