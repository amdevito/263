//P2: Any Day Music Machine (weather driven generative soundscape)

let $button = $(".button");

let $inputValue = $(".inputValue");
// let inputValue = document.querySelector(".inputValue");
let $description = $(".description");
let $temperature = $(".temperature");
let $windSpeed = $(".windSpeed");
let $humidity = $(".humidity");
let $clouds = $(".clouds");
let $rain = $(".rain");
let $name = $(".name");

//the loader for each note - make note - ab - 'b' is 'flat, - cs - 's' is 'sharp' because # doesnt work.
let aBufferList = undefined;
let bbBufferList = undefined;
let bBufferList = undefined;
let cBufferList = undefined;
let dbBufferList = undefined;
let dBufferList = undefined;
let ebBufferList = undefined;
let eBufferList = undefined;
let fBufferList = undefined;
let gbBufferList = undefined;
let gBufferList = undefined;
let abBufferList = undefined;

//track when all notes have been loaded
//start at 12 and take one away at each note loaded function
let numNotesToLoad = 12;

///time between each note -
let intervalTiming = 1000;

//made sure to land on these notes most often during the random playing notes stage
let primaryNotes = [];
//sequencer
//load the modes
let bbIonian = [
  bbBufferList,
  cBufferList,
  dBufferList,
  ebBufferList,
  fBufferList,
  gBufferList,
  aBufferList,
];
let bbDorian = [
  bbBufferList,
  cBufferList,
  dbBufferList,
  ebBufferList,
  fBufferList,
  gBufferList,
  abBufferList,
];
let bbPhyrgian = [
  bbBufferList,
  bBufferList,
  dbBufferList,
  ebBufferList,
  fBufferList,
  gbBufferList,
  abBufferList,
];
let bbLydian = [
  bbBufferList,
  cBufferList,
  dBufferList,
  eBufferList,
  fBufferList,
  gBufferList,
  aBufferList,
];
let bbMixolydian = [
  bbBufferList,
  cBufferList,
  dBufferList,
  ebBufferList,
  fBufferList,
  gBufferList,
  abBufferList,
];
let bbAeolian = [
  bbBufferList,
  cBufferList,
  dbBufferList,
  ebBufferList,
  fBufferList,
  gbBufferList,
  abBufferList,
];
let bbLocrian = [
  bbBufferList,
  bBufferList,
  dbBufferList,
  ebBufferList,
  eBufferList,
  gbBufferList,
  abBufferList,
];

//// notes are picked randomly but must land on these most often
//Bflat Ionian - bb c d eb f g a
//if ionion, key notes - I, VI, V, I
//bflat Dorian - bb c db eb f g ab
//key notes - i, iii, vii
//bflat Phyrgian - bb b db eb f gb ab
//key notes -  i, iii, vi, vii
//b flat Lydian - bb c d e f g a
//key notes - i, iv, v
//b flat Mixolydian - bb c d eb f g ab
// progression - V, IV, I, V, vii
// b flat Aeolian - bb c db eb f gb ab
// progression - i VII VI, iii,
// b flat locrian - bb b db eb e gb ab
// progression - idim, V, iv, ii, i
//

$(`#first-button`).on("click", function () {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      $(`#first-input`).val() +
      "&units=metric&appid=332933c03ee033d1701669b418461a0f"
  )
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then(displayData);
  // .catch((err) => alert("Wrong city name!"));
});

$(`#second-button`).on("click", function () {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      $(`#second-input`).val() +
      "&units=metric&appid=332933c03ee033d1701669b418461a0f"
  )
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then(displayData);
  // .catch((err) => alert("Wrong city name!"));
});

function displayData(data) {
  let nameValue = data["name"];
  let temperatureValue = data["main"]["temp"];
  let descriptionValue = data["weather"][0]["description"];

  let windSpeedValue = data["wind"]["speed"];
  let humidityValue = data["main"]["humidity"];

  let cloudDensityValue = data["clouds"]["all"];

  let rainAmount = 0;
  if (data.rain) {
    if (data["rain"]["3h"]) {
      rainAmount = data["rain"]["3h"];
    } else if (data["rain"]["1h"]) {
      rainAmount = data["rain"]["1h"];
    }
  }

  console.log(data);

  $name.text(nameValue);
  $temperature.text(temperatureValue);
  $description.text(descriptionValue);
  $windSpeed.text(windSpeedValue);
  $humidity.text(humidityValue);
  $clouds.text(cloudDensityValue);
  $rain.text(rainAmount);
  //
}

//first dialog box on entry to application
$(`#introduction-dialog`).dialog({
  modal: true,
  buttons: {
    "Make background white": function () {
      //for P2: change to - Modulate background by wind speed
      // $(`body`).css({ background: "white" });
      $(`canvas`).css({
        "background-color": "white",
      }); //change the css color element to white
      $(this).dialog("close");
      ///need to add back ground modulating by oscillator value that is received and scaled from the user's location and weather information.
    },
    "Keep background dark": function () {
      $(this).dialog("close"); //don't do anything but close the dialog box
      //!!!call function to start playing composition here
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
  ///add restart composition with new weather here?
});

$(function () {
  $("input1").checkboxradio();
});

window.onload = function () {
  //what gets passed to the loadBuffer method is the URL of the file containing the sound and the index of that sound in the list.
  //create new bufferLoader object via the BufferLoader Class - send 3 arguements -  audio context, which is the property of the Audio object /class , and array of the soundfiles, and callBack funtion to call once the sounds have been successfully loaded.
  //for final, the buffer loader will be sent the synth object containing the parameters of the FM synth and the notes that will make up the melody lines of the composition.
  //
  //load the A notes :
  let aBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/a/a.1-frozenPiano.mp3",
      "sounds/synth/a/a.2-mellow.mp3",
      "sounds/synth/a/a.3-synthi.mp3",
      "sounds/synth/a/a.4-synclav.mp3",
      "sounds/synth/a/a.mp3",
      "sounds/synth/a/a2.1-frozenPiano.mp3",
      "sounds/synth/a/a2.2-mellow.mp3",
      "sounds/synth/a/a2.3-synthi.mp3",
      "sounds/synth/a/a2.4-synclav.mp3",
      "sounds/synth/a/a2.mp3",
    ],
    aBufferLoaded //the callback function
  );

  aBufferLoader.load();

  function aBufferLoaded(bufferList) {
    aBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();

  //load ab notes
  let abBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/ab/ab.1-frozenPiano.mp3",
      "sounds/synth/ab/ab.2-mellow.mp3",
      "sounds/synth/ab/ab.3-synthi.mp3",
      "sounds/synth/ab/ab.4-synclav.mp3",
      "sounds/synth/ab/ab.mp3",
      "sounds/synth/ab/ab2.1-frozenPiano.mp3",
      "sounds/synth/ab/ab2.2-mellow.mp3",
      "sounds/synth/ab/ab2.3-synthi.mp3",
      "sounds/synth/ab/ab2.4-synclav.mp3",
      "sounds/synth/ab/ab2.mp3",
    ],
    abBufferLoaded //the callback function
  );

  abBufferLoader.load();

  function abBufferLoaded(bufferList) {
    abBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();

  //load b notes
  let bBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/b/b.1-frozenPiano.mp3",
      "sounds/synth/b/b.2-mellow.mp3",
      "sounds/synth/b/b.3-synthi.mp3",
      "sounds/synth/b/b.4-synclav.mp3",
      "sounds/synth/b/b.mp3",
      "sounds/synth/b/b2.1-frozenPiano.mp3",
      "sounds/synth/b/b2.2-mellow.mp3",
      "sounds/synth/b/b2.3-synthi.mp3",
      "sounds/synth/b/b2.4-synclav.mp3",
      "sounds/synth/b/b2.mp3",
    ],
    aBufferLoaded //the callback function
  );

  bBufferLoader.load();

  function bBufferLoaded(bufferList) {
    bBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load bb notes
  let bbBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/bb/bb.1-frozenPiano.mp3",
      "sounds/synth/bb/bb.2-mellow.mp3",
      "sounds/synth/bb/bb.3-synthi.mp3",
      "sounds/synth/bb/bb.4-synclav.mp3",
      "sounds/synth/bb/bb.mp3",
      "sounds/synth/bb/bb2.1-frozenPiano.mp3",
      "sounds/synth/bb/bb2.2-mellow.mp3",
      "sounds/synth/bb/bb2.3-synthi.mp3",
      "sounds/synth/bb/bb2.4-synclav.mp3",
      "sounds/synth/bb/bb2.mp3",
    ],
    aBufferLoaded //the callback function
  );

  bbBufferLoader.load();

  function bbBufferLoaded(bufferList) {
    bbBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load c notes
  let aBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/c/c.1-frozenPiano.mp3",
      "sounds/synth/c/c.2-mellow.mp3",
      "sounds/synth/c/c.3-synthi.mp3",
      "sounds/synth/c/c.4-synclav.mp3",
      "sounds/synth/c/c.mp3",
      "sounds/synth/c/c2.1-frozenPiano.mp3",
      "sounds/synth/c/c2.2-mellow.mp3",
      "sounds/synth/c/c2.3-synthi.mp3",
      "sounds/synth/c/c2.4-synclav.mp3",
      "sounds/synth/c/c2.mp3",
    ],
    cBufferLoaded //the callback function
  );

  cBufferLoader.load();

  function cBufferLoaded(bufferList) {
    cBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load d notes
  let dBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/d/d.1-frozenPiano.mp3",
      "sounds/synth/d/d.2-mellow.mp3",
      "sounds/synth/d/d.3-synthi.mp3",
      "sounds/synth/d/d.4-synclav.mp3",
      "sounds/synth/d/d.mp3",
      "sounds/synth/d/d2.1-frozenPiano.mp3",
      "sounds/synth/d/d2.2-mellow.mp3",
      "sounds/synth/d/d2.3-synthi.mp3",
      "sounds/synth/d/d2.4-synclav.mp3",
      "sounds/synth/d/d2.mp3",
    ],
    dBufferLoaded //the callback function
  );

  dBufferLoader.load();

  function dBufferLoaded(bufferList) {
    dBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load db notes
  let dbBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/db/db.1-frozenPiano.mp3",
      "sounds/synth/db/db.2-mellow.mp3",
      "sounds/synth/db/db.3-synthi.mp3",
      "sounds/synth/db/db.4-synclav.mp3",
      "sounds/synth/db/db.mp3",
      "sounds/synth/db/db2.1-frozenPiano.mp3",
      "sounds/synth/db/db2.2-mellow.mp3",
      "sounds/synth/db/db2.3-synthi.mp3",
      "sounds/synth/db/db2.4-synclav.mp3",
      "sounds/synth/db/db2.mp3",
    ],
    dbBufferLoaded //the callback function
  );

  dbBufferLoader.load();

  function dbBufferLoaded(bufferList) {
    dbBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load e notes
  let eBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/e/e.1-frozenPiano.mp3",
      "sounds/synth/e/e.2-mellow.mp3",
      "sounds/synth/e/e.3-synthi.mp3",
      "sounds/synth/e/e.4-synclav.mp3",
      "sounds/synth/e/e.mp3",
      "sounds/synth/e/e2.1-frozenPiano.mp3",
      "sounds/synth/e/e2.2-mellow.mp3",
      "sounds/synth/e/e2.3-synthi.mp3",
      "sounds/synth/e/e2.4-synclav.mp3",
      "sounds/synth/e/e2.mp3",
    ],
    eBufferLoaded //the callback function
  );

  eBufferLoader.load();

  function eBufferLoaded(bufferList) {
    eBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load eb notes
  let ebBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/eb/eb.1-frozenPiano.mp3",
      "sounds/synth/eb/eb.2-mellow.mp3",
      "sounds/synth/eb/eb.3-synthi.mp3",
      "sounds/synth/eb/eb.4-synclav.mp3",
      "sounds/synth/eb/eb.mp3",
      "sounds/synth/eb/eb2.1-frozenPiano.mp3",
      "sounds/synth/eb/eb2.2-mellow.mp3",
      "sounds/synth/eb/eb2.3-synthi.mp3",
      "sounds/synth/eb/eb2.4-synclav.mp3",
      "sounds/synth/eb/eb2.mp3",
    ],
    ebBufferLoaded //the callback function
  );

  ebBufferLoader.load();

  function ebBufferLoaded(bufferList) {
    ebBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load f notes
  let fBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/f/f.1-frozenPiano.mp3",
      "sounds/synth/f/f.2-mellow.mp3",
      "sounds/synth/f/f.3-synthi.mp3",
      "sounds/synth/f/f.4-synclav.mp3",
      "sounds/synth/f/f.mp3",
      "sounds/synth/f/f2.1-frozenPiano.mp3",
      "sounds/synth/f/f2.2-mellow.mp3",
      "sounds/synth/f/f2.3-synthi.mp3",
      "sounds/synth/f/f2.4-synclav.mp3",
      "sounds/synth/f/f2.mp3",
    ],
    fBufferLoaded //the callback function
  );

  fBufferLoader.load();

  function fBufferLoaded(bufferList) {
    fBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load g notes
  let gBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/g/g.1-frozenPiano.mp3",
      "sounds/synth/g/g.2-mellow.mp3",
      "sounds/synth/g/g.3-synthi.mp3",
      "sounds/synth/g/g.4-synclav.mp3",
      "sounds/synth/g/g.mp3",
      "sounds/synth/g/g2.1-frozenPiano.mp3",
      "sounds/synth/g/g2.2-mellow.mp3",
      "sounds/synth/g/g2.3-synthi.mp3",
      "sounds/synth/g/g2.4-synclav.mp3",
      "sounds/synth/g/g2.mp3",
    ],
    gBufferLoaded //the callback function
  );

  gBufferLoader.load(); //iterates through all the file names in the array, passes the file name w the index number of the name in the list, to the loadBuffer method which is responsible for loading the sounds as binary data, using XMLHTTpRequest

  function gBufferLoaded(bufferList) {
    gBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
  //load gb notes
  let gbBufferLoader = new BufferLoader(
    Audio.audioContext,
    [
      "sounds/synth/gb/gb.1-frozenPiano.mp3",
      "sounds/synth/gb/gb.2-mellow.mp3",
      "sounds/synth/gb/gb.3-synthi.mp3",
      "sounds/synth/gb/gb.4-synclav.mp3",
      "sounds/synth/gb/gb.mp3",
      "sounds/synth/gb/gb2.1-frozenPiano.mp3",
      "sounds/synth/gb/gb2.2-mellow.mp3",
      "sounds/synth/gb/gb2.3-synthi.mp3",
      "sounds/synth/gb/gb2.4-synclav.mp3",
      "sounds/synth/gb/gb2.mp3",
    ],
    gbBufferLoaded //the callback function
  );

  gbBufferLoader.load();

  function gbBufferLoaded(bufferList) {
    gbBufferList = bufferList;
    Audio.init(bufferList); //passes in the buffer list array and gets stored in the Audio object and used when we call the Audio.play method.
    //finihsedloading for note is called - assign to scale index position  -  let bbNote = bufferLoaderBb then  bbNote = random(bufferloaderB)
    /// create variables for each note

    let canvas = document.getElementById("canvas");
    //get a new view from the View.js file (the constructor that manages the canvas object)
    let view = new View(canvas);

    ///bind connects the update display via handleClick to view and not canvas
    // canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
    // ***instead of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
  loadedNote();
};

function loadedNote() {
  numNotesToLoad--;
  if (numNotesToLoad === 0) {
    // Everything is loaded! We can stop the preload screen or whatever...
    // Show the interface
  }
}
///when you're ready to play
playNotes();

function playNotes() {
  let modeIndex = progression[primaryNotes]; ///play key notes most often- primaryNotes array assigned when creating modes below

  if (weatherDescription === scatteredClouds) {
    let bufferList = bbDorian[primaryNotes];
    let primaryNotes = [modeIndex, modeIndex, modeIndex, modeIndex];

    //THIS IS DONE FOR EACH NOTE PLAY back
    //weightedNotes logic : {increasing the odds of certain notes in the playback}
    let bbDorian = [
      bbBufferList,
      cBufferList,
      dbBufferList,
      ebBufferList,
      fBufferList,
      gBufferList,
      abBufferList,
    ];
    let bbDorianWeight = [2, 3, 1, 4]; //weight of each element above
    let totalweight = eval(bbDorianweight.join("+")); //get total weight (in this case, 10)
    let weighedBbDorian = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbDorian.length) {
      //step through each bbDorian[] element
      for (i = 0; i < bbDorianWeight[currentNote]; i++)
        weighedBbDorian[weighedBbDorian.length] = bbDorian[currentNote];
      currentNote++;
    }
  }

  /// once this has been done start playing the notes once the modal (the intro dialog box or the hidden one is closed)
  // DO THIS BUT IN RELATION TO WHAT IS CURRENTLY GOING ON///bind connects the update display via handleClick to view and not canvas
  //
  //canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
  //

  playRandomNote(bufferList);

  setTimeout(playNotes, intervalTiming); //<timeing between each note
}

function playRandomNote(bufferList) {
  let note = Audio.audioContext.createBufferSource();
  note.buffer = bufferList[Math.floor(bufferList.length * Math.random())];
  note.connect(Audio.context.destination);
  note.start(0);
}

///DONE***1st: turn all synth notes waves into mp3s
///Done*** 2nd: create audio buffers for each note
//*** then create arrays for each mode in the key of b flat (I am choosing the key of B flat to start, more can be added later):
// Ie for B flat Dorian: let dorianBB  = [bufferLoaderBb, bufferLoaderC, bufferLoaderDb, bufferLoaderEb, bufferLoaderF, bufferLoaderG, bufferLoaderAb];
//^bufferLoaders for each note will contain 2 octaves and 4 different synth sounds.
// *** 3rd: Create the arrays for the key notes to be hit in each MODE
// ***4th:create function to choose notes and feed the primaryNotes array to hit on most often
///

//once loadBuffer has successfully loaded the sounds, the callback function, 'finishedLoading' is called. -
///set up the view, clickhandler for the canvas and start to the calls to updatedisplay to kick off the animation
// function finishedLoading(bufferList) {}

//make the animated ripples at the top of the page DRAGGABLE// will add 'droppable' for the activation of the delay effect to the tone ripples for the final project.
$(`#ripple-one`).draggable();
$(`#ripple-two`).draggable();
$(`#ripple-three`).draggable();
$(`#ripple-four`).draggable();
