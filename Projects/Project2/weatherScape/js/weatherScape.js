//P2: Any Day Music Machine (weather driven generative soundscape)

let $button = $(".button");

let $inputValue = $(".inputValue");
// let inputValue = document.querySelector(".inputValue");
let $description = $(".description");
let $generalWeather = $(".main");
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

//get general weather description (from main, as opposed to 'description' which is more detailed) to then connect with a mode
let generalWeather = undefined;

let bufferList = undefined;

let note = undefined;
//sequencer
//load the modes

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
    .then(displayData)
    .then(gatherNotes);
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

  generalWeather = data["weather"][0]["main"];

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
      // gatherNotes();
      ///need to add back ground modulating by oscillator value that is received and scaled from the user's location and weather information.
    },
    "Keep background dark": function () {
      $(this).dialog("close"); //don't do anything but close the dialog box
      //!!!call function to start playing composition here
      // gatherNotes();
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
  // gatherNotes();
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
  aBufferLoader = new BufferLoader(
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
  abBufferLoader = new BufferLoader(
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
    console.log(abBufferList);
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
  bBufferLoader = new BufferLoader(
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
  //load bb notes
  bbBufferLoader = new BufferLoader(
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
    bbBufferLoaded //the callback function
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
  cBufferLoader = new BufferLoader(
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
  dBufferLoader = new BufferLoader(
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
  console.log(dBufferLoader);
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
  dbBufferLoader = new BufferLoader(
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
  eBufferLoader = new BufferLoader(
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
  ebBufferLoader = new BufferLoader(
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
  fBufferLoader = new BufferLoader(
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
  gBufferLoader = new BufferLoader(
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
  gbBufferLoader = new BufferLoader(
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
  console.log(gbBufferLoader);

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
// gatherNotes();

// function playRandomNoteFrom(bufferList) {
//   let note = Audio.context.createBufferSource();
//   note.buffer =
//     bufferList[Math.floor(bufferList.length * Math.random() * totalWeight)];
//   note.connect(Audio.context.destination);
//   note.start(0);
// }

function gatherNotes() {
  console.log("general weather: " + generalWeather);
  if (generalWeather === "Clear") {
    let bbLydian = [
      bbBufferList,
      cBufferList,
      dBufferList,
      eBufferList,
      fBufferList,
      gBufferList,
      aBufferList,
    ];
    let bufferList = bbLydian; //7 degrees, and those with key notes - 1, 4, 5
    let bbLydianWeight = [6, 1, 2, 7, 5, 3, 4]; //weight of each element above
    let totalWeight = eval(bbLydianWeight.join("+")); //get total weight (in this case, 10)
    let bbLydianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbLydian.length) {
      //step through each bbDorian[] element
      for (i = 0; i < bbLydianWeight[currentNote]; i++)
        bbLydianWeighed[bbLydianWeighed.length] = bbLydian[currentNote];
      currentNote++;
    }
  } else if (generalWeather === "few clouds") {
    let bbIonian = [
      bbBufferList,
      cBufferList,
      dBufferList,
      ebBufferList,
      fBufferList,
      gBufferList,
      aBufferList,
    ];
    let bufferList = bbIonian; //7 degrees, and those with key notes - major key so 1, 3, 5
    let bbIonianWeight = [7, 1, 6, 2, 5, 3, 4]; //weight of each element above
    let totalWeight = eval(bbIonianWeight.join("+")); //get total weight (in this case, 10)
    let bbIonianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbIonian.length) {
      //step through each bbDorian[] element
      for (i = 0; i < bbIonianWeight[currentNote]; i++)
        bbIonianWeighed[bbIonianWeighed.length] = bbIonian[currentNote];
      currentNote++;
    }
  } else if (
    generalWeather === "scattered clouds" ||
    "broken clouds" ||
    "Clouds"
  ) {
    let bbMixolydian = [
      bbBufferList,
      cBufferList,
      dBufferList,
      ebBufferList,
      fBufferList,
      gBufferList,
      abBufferList,
    ];
    let bufferList = bbMixolydian; //7 degrees, and those with key notes -  7, 1, 5, 3,
    let bbMixolydianWeight = [6, 1, 2, 4, 5, 3, 7]; //weight of each element above
    let totalWeight = eval(bbMixolydianWeight.join("+")); //get total weight (in this case, 10)
    let bbMixolydianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;
    console.log(bufferList);

    while (currentNote < bbMixolydian.length) {
      //step through each bbDorian[] element
      for (i = 0; i < bbMixolydianWeight[currentNote]; i++)
        bbMixolydianWeighed[bbMixolydianWeighed.length] =
          bbMixolydian[currentNote];
      currentNote++;
    }
    console.log(bbMixolydianWeighed);
  } else if (generalWeather === "shower rain" || "snow") {
    let bbDorian = [
      bbBufferList,
      cBufferList,
      dbBufferList,
      ebBufferList,
      fBufferList,
      gBufferList,
      abBufferList,
    ];
    let bufferList = bbDorian; //7 degrees, and those with key notes - 1, 3, 7
    let bbDorianWeight = [7, 1, 6, 2, 4, 3, 5]; //weight of each element above
    let totalWeight = eval(bbDorianWeight.join("+")); //get total weight (in this case, 10)
    let bbDorianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbDorian.length) {
      //step through each bbDorian[] element
      for (i = 0; i < bbDorianWeight[currentNote]; i++)
        bbDorianWeighed[bbDorianWeighed.length] = bbDorian[currentNote];
      currentNote++;
    }
  } else if (generalWeather === "rain") {
    let bbAeolian = [
      bbBufferList,
      cBufferList,
      dbBufferList,
      ebBufferList,
      fBufferList,
      gbBufferList,
      abBufferList,
    ];
    let bufferList = bbAolian; //7 degrees, and those with key notes - 3, 1, 6, 7, 5
    let bbAolianWeight = [6, 1, 7, 2, 3, 5, 4]; //weight of each element above
    let totalWeight = eval(bbAolianWeight.join("+")); //get total weight (in this case, 10)
    let bbAolianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbAolian.length) {
      //step through each bbAolian[] element
      for (i = 0; i < bbAolianWeight[currentNote]; i++)
        bbAolianWeighed[bbAolianWeighed.length] = bbAolian[currentNote];
      currentNote++;
    }
  } else if (generalWeather === "mist") {
    let bbPhyrgian = [
      bbBufferList,
      bBufferList,
      dbBufferList,
      ebBufferList,
      fBufferList,
      gbBufferList,
      abBufferList,
    ];
    let bufferList = bbPhrygian; //7 degrees, and those with key notes -  1, 2, 3, 6, 7
    let bbPhrygianWeight = [7, 6, 5, 1, 2, 4, 3]; //weight of each element above
    let totalWeight = eval(bbPhrygianWeight.join("+")); //get total weight (in this case, 10)
    let bbPhrygianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbPhrygian.length) {
      //step through each bbPhrygian[] element
      for (i = 0; i < bbPhrygianWeight[currentNote]; i++)
        bbPhrygianWeighed[bbPhrygianWeighed.length] = bbPhrygian[currentNote];
      currentNote++;
    }
  } else if (generalWeather === "thunderstorm") {
    let bbLocrian = [
      bbBufferList,
      bBufferList,
      dbBufferList,
      ebBufferList,
      eBufferList,
      gbBufferList,
      abBufferList,
    ];
    let bufferList = bbLocrian; //7 degrees, and those with key notes - 1, 5, 2, 3, 6, 7, 4
    let bbLocrianWeight = [7, 5, 4, 1, 6, 3, 2]; //weight of each element above
    let totalWeight = eval(bbLocrianWeight.join("+")); //get total weight (in this case, 10)
    let bbLocrianWeighed = new Array(); //new array to hold "weighted" notes
    let currentNote = 0;

    while (currentNote < bbLocrian.length) {
      //step through each bbLocrian[] element
      for (i = 0; i < bbLocrianWeight[currentNote]; i++)
        bbLocrianWeighed[bbLocrianWeighed.length] = bbLocrian[currentNote];
      currentNote++;
    }
  }

  // playRandomNoteFrom(bufferList);

  setTimeout(gatherNotes, intervalTiming); //<timeing between each note
  //!!!then play notes from new weighed array by random selection
  // let randomNote = Math.floor(Math.random() * totalWeight);

  // let primaryNotes = [modeIndex, modeIndex, modeIndex, modeIndex]; //going to be scale degree minus one

  //THIS IS DONE FOR EACH NOTE PLAY back
  //MODES and feelings -
  // lydian - clear sky
  //ionian - few clouds
  // mixolydian - scattered clouds, broken clouds
  // dorian - shower rain and snow
  // aolian - rain
  // phrygian - mist
  // locrian - thunderstorm

  ///POSSIBLE WEATHER DESCRIPTIONS - these might only be the 'main'
  //set to variable: generalWeather
  // clear sky
  // few clouds
  // scattered clouds
  // broken clouds
  // shower rain
  // rain
  // mist
  //snow
  // thunderstorm

  ////
  // let modeIndex = progression[primaryNotes]; ///play key notes most often- primaryNotes array assigned when creating modes below
  //// notes are picked randomly but must land on these most often
  //Bflat Ionian - bb c d eb f g a
  //if ionion, key notes - I, VI, V, I
  //bflat Dorian - bb c db eb f g ab
  //key notes - i, iii, vii
  //bflat Phyrgian - bb b db eb f gb ab
  //key notes -  1, 2, 3, 6, 7
  //b flat Lydian - bb c d e f g a
  //key notes - i, iv, v
  //b flat Mixolydian - bb c d eb f g ab
  // key notes -  1, 5, 3, 7
  // b flat Aeolian - bb c db eb f gb ab
  // key notes - 1, 3, 6, 7, 5,
  // b flat locrian - bb b db eb e gb ab
  // key notes - 1, 5, 2, 3, 6, 7, 4
  //

  //weightedNotes logic : {increasing the odds of certain notes in the playback}

  // http://www.javascriptkit.com/javatutors/weighrandom2.shtml
  /// once this has been done start playing the notes once the modal (the intro dialog box or the hidden one is closed)
  // DO THIS BUT IN RELATION TO WHAT IS CURRENTLY GOING ON///bind connects the update display via handleClick to view and not canvas
  //
  //canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
  //
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
