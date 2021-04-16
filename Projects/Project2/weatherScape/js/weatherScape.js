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

//sequencer
//load the modes
//// notes are pick randomly but must land on these most often
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
// fetch(
//   "http://api.openweathermap.org/data/2.5/forecast?q=" +
//     inputValue.value +
//     "&appid=332933c03ee033d1701669b418461a0f"
// )
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err +. alter("Wrong city name!"))

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
  // temperature.innerHTML = temperatureValue;
  // description.innerHTML = descriptionValue;
  // windSpeed.innerHTML = windSpeedValue;
  // humidity.innerHTML = humidityValue;
  // clouds.innerHTML = cloudDensityValue;
  // rain.innerHTML = rainAmount;
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
  $("input1").checkboxradio();
});

window.onload = function () {
  //what gets passed to the loadBuffer method is the URL of the file containing the sound and the index of that sound in the list.
  //create new bufferLoader object via the BufferLoader Class - send 3 arguements -  audio context, which is the property of the Audio object /class , and array of the soundfiles, and callBack funtion to call once the sounds have been successfully loaded.
  //for final, the buffer loader will be sent the synth object containing the parameters of the FM synth and the notes that will make up the melody lines of the composition.
  let abufferLoader = new BufferLoader(
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
    aBufferLoaded //the callback function
  );

  abufferLoader.load();

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
    // instad of this^ have the composition being playing notes after the first dialog box/modal is closed once the weather is choosen and loaded.
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
playNextProgressionNote();

function playNextProgressionNote() {
  let modeIndex = progression[progressionIndex] - 1;
  let bufferList = dorianA[modeIndex];
  playRandomNote(bufferList);
  progressionIndex++;
  setTimeout(playNextProgressionNote, intervalTiming); //<timeing between each note
}

function playRandomNote(bufferList) {
  let note = Audio.audioContext.createBufferSource();
  note.buffer = bufferList[Math.floor(bufferList.length * Math.random())];
  note.connect(Audio.context.destination);
  note.start(0);
}

///***1st: turn all synth notes waves into mp3s
///*** 2nd: create audio buffers for each note
//*** then create arrays for each mode in the key of b flat (I am choosing the key of B flat to start, more can be added later):
// Ie for B flat Dorian: let dorianBB  = [bufferLoaderBb, bufferLoaderC, bufferLoaderDb, bufferLoaderEb, bufferLoaderF, bufferLoaderG, bufferLoaderAb];
//^bufferLoaders for each note will contain 2 octaves and 4 different synth sounds.
// *** 3rd: Create the arrays for each type of progression -
// ie: let progressionA = [1, 4, 5, 1];
// ie: let progressionB = [1, 5, 6, 4, 1];
// ie: let progressionC = [1, 5, 6, 3, 4, 1, 4, 5, 1]
// ie: let progressionD = [1, 6, 2, 5, 1]
// ***4th: assign one of the above progressions to the variable - chosenProgression
// ie.: let chosenProgression =  progressionA
//***5th:  ???
// let bufferLoader = new BufferLoader(
//   Audio.audioContext,
//   [
//     "sounds/Cmajor4_5/A4.mp3",
//     "sounds/Cmajor4_5/A5.mp3",
//     "sounds/Cmajor4_5/C4.mp3",
//     "sounds/Cmajor4_5/C5.mp3",
//     "sounds/Cmajor4_5/D4.mp3",
//     "sounds/Cmajor4_5/D5.mp3",
//     "sounds/Cmajor4_5/E4.mp3",
//     "sounds/Cmajor4_5/E5.mp3",
//     "sounds/Cmajor4_5/G4.mp3",
//     "sounds/Cmajor4_5/G5.mp3",
//   ],
//   finishedLoading //the callback function
// );
// bufferLoader.load();
// let bufferLoader = new BufferLoader(
//   Audio.audioContext,
//   [
//     "sounds/Cmajor4_5/A4.mp3",
//     "sounds/Cmajor4_5/A5.mp3",
//     "sounds/Cmajor4_5/C4.mp3",
//     "sounds/Cmajor4_5/C5.mp3",
//     "sounds/Cmajor4_5/D4.mp3",
//     "sounds/Cmajor4_5/D5.mp3",
//     "sounds/Cmajor4_5/E4.mp3",
//     "sounds/Cmajor4_5/E5.mp3",
//     "sounds/Cmajor4_5/G4.mp3",
//     "sounds/Cmajor4_5/G5.mp3",
//   ],
//   finishedLoading //the callback function
// );
// bufferLoader.load(); //iterates through all the file names in the array, passes the file name w the index number of the name in the list, to the loadBuffer method which is responsible for loading the sounds as binary data, using XMLHTTpRequest

//once loadBuffer has successfully loaded the sounds, the callback function, 'finishedLoading' is called. -
///set up the view, clickhandler for the canvas and start to the calls to updatedisplay to kick off the animation
// function finishedLoading(bufferList) {}

//make the animated ripples at the top of the page DRAGGABLE// will add 'droppable' for the activation of the delay effect to the tone ripples for the final project.
$(`#ripple-one`).draggable();
$(`#ripple-two`).draggable();
$(`#ripple-three`).draggable();
$(`#ripple-four`).draggable();
