//P2: Any Day Music Machine (Weather Driven Generative Composer)
//CREDITS - Original, very basic idea and the organizations of classes started from the Generative MusicBox tutorial found *******
///CREDITS - thank you to TAs Dana and Sam for solving almost all debugging issues throughout the process.
///CREDITS -
// NOTE: A MODE is a type of scale
// All compostions are in the key of B flat.
// For the specific feel and colour of the modal composition to be heard, it takes some time for the notes to start blending together to hear the quality in the composition.
// The 8 'Church' Modes are used here : Ionian, Lydian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian
/// Credits - class distribution and OOP set up started using Music Box Tutorial, modified by me with some assistance from Pippn Barr and Dana
/// All samples and sound design by Alana DeVito
///
//MODES and feelings -
// Lydian -  uplifting and quirky, fantasy
// Ionian - happy, positive - happy, bright, innocent, reassuring, cheery, joyous and played at a slower tempo it can sound royal and majestic .
// Mixolydian - happy but serious
// Dorian -  sad but hopeful
// Aeolian -  sad
// Phrygian -  dark  -  scary, dramatic, and otherworldly
// Locrian -  evil -  scary, dramatic, and otherworldly

///set up varibles for displaying data in dialog boxes
let $button = $(".button"); //button variable for dialog boxes / interaction
let $inputValue = $(".inputValue"); // user input - 'desired city name'
let $description = $(".description"); //detailed weather description (his one is displayed)
let $generalWeather = $(".main"); //general weather decription
let $temperature = $(".temperature"); //temperature in Celcius
let $humidity = $(".humidity"); //humidity percentage
let $clouds = $(".clouds"); //percentage of cloud coverage
let $rain = $(".rain"); //amount of rain
let $name = $(".name"); //city name

//set up variables for each note's bufferList - 'b' is flat
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

let view = undefined; // Created when notes are triggered and ripples need to be created on canvas

let musicTimeout; // set timeout function to stop the previous mode playing.

//set variable to track when all notes have been loaded into their appropriate bufferLoaders - 12 semi-tones/notes per octave
let numNotesToLoad = 12; //start at 12 and take one away at each note loaded function

///time between each triggered note/sample in milliseconds. 3000 is a place holder, it will vary depending on the humidity in forecast.
let intervalTiming = 3000;
///set variable to multiply humidity percentage by to get randomized intervalTiming value for each note.
let intervalMultiple = 1000;

//set variable for general weather description (from {[main}] in API data, as opposed to 'description' which is more detailed)
//good for future iterations, composition tweaking and debugging
let generalWeather = undefined;

let specificWeather = undefined; //set variable for holding the specific weather description (from [{description}] in API data - this is used to connect weather to a mode)

let bufferList = undefined; /// set variable for holding the notes to be played in the composition

//set variable to track number of notes played (start at 0)
let countNotesPlayed = 0;

// set array variable to hold all the required 'weightings' for each degree of mode ([index 0] - 1st degree = root note, [index 2] - 3rd degree  = mediant). The higher the value, the more copies of the item in that index, therefore when a note is randomly chosen, it is more likely to be the one picked. In modal music (which this is creating) it is important to land on certain notes more often to create the modal emotion/feeling of that scale.
let modeWeight = [];

//Determine the range of indexes for two sample or sound "banks" of notes
// stored in the same bufferList
let temperateBankMin = 0; ///index 0 to
let temperateBankMax = 8; /// index 8 (first bank with soft synth pads)
let extremeBankMin = 8; ///index 8 to
let extremeBankMax = 18; //index 18 (second bank is orchestral samples which are more intense, with more defined transients with a ringing quality)

// Actual min and max to use when choosing the next buffer will be
// determined by temperature and probability
let bankMin;
let bankMax;

//set array variables for each mode to hold each note's BufferList needed for that particular mode ('scale')
let bbIonian = [];
let bbLydian = [];
let bbMixolydian = [];
let bbDorian = [];
let bbAeolian = [];
let bbPhrygian = [];
let bbLocrian = [];

//set up JQUERY UI library for the FIRST INTRO dialog box and fetch API openWeather data using unique API key.
$(`#first-button`).on("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      $(`#first-input`).val() +
      "&units=metric&appid=332933c03ee033d1701669b418461a0f" ///set unit of measurment to 'metric'
  )
    .then((response) => response.json()) ///once reponse from user input is received
    .then(displayData) ///show the weather data
    .then(gatherNotes) ///call function to set up notes, scales, sounds, intervals and intensity/ gain for the composition
    .catch((err) => alert("City name not recognized please try again!")); // if openWeather API does not recognize city name, throw an alert at user to try typing in another city name.
});
//set up JQUERY UI library for the SECOND dialog box and fetch API openWeather data using unique API key. This can be used to change the composition mid interaction.
$(`#second-button`).on("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      $(`#second-input`).val() +
      "&units=metric&appid=332933c03ee033d1701669b418461a0f" ///set unit of measurment to 'metric'
  )
    .then((response) => response.json()) ///once reponse from user input is received
    .then(displayData) ///show the weather data
    .then(gatherNotes) ///call function to set up notes, scales, sounds, intervals and intensity/ gain for the composition
    .catch((err) => alert("City name not recognized please try again!")); // if openWeather API does not recognize city name, throw an alert at user to try typing in another city name.
});

//function to take data from the API and desplay in the dialog box
function displayData(data) {
  let nameValue = data["name"]; ///name of city
  temperatureValue = data["main"]["temp"]; ///display temperature in chosen city in Celcius
  let descriptionValue = data["weather"][0]["description"]; ///show specific description of weather in that city - given as a string - ie. 'overcast clouds'

  generalWeather = data["weather"][0]["main"]; ///set generalWeather variable to data fetched under 'main' - stored for future calibrations and testing
  specificWeather = data["weather"][0]["description"]; /// set specificWeather variable to also recieve specific weather description to use in other elements of code(differnt variable for different use)

  humidityValue = data["main"]["humidity"]; ///set humidity to variable to be displayed and to be used to determine note interval timing (kind of 'note values - quarter note, half, whole etc...')

  let cloudDensityValue = data["clouds"]["all"]; ///set percentage of cloud coverage to variable for display purposes for now

  ///set rain variable to 0 to begin
  ///CREDIT: Thank you to Prof. Pippin Barr for this solution.
  let rainAmount = 0;
  ////if data.rain is true - if there is rain forcast in 1h or 3h, display that amount, otherwise display 0.
  if (data.rain) {
    if (data["rain"]["3h"]) {
      rainAmount = data["rain"]["3h"];
    } else if (data["rain"]["1h"]) {
      rainAmount = data["rain"]["1h"];
    }
  }

  // console.log(data); /// display data arrays and JSON data fetched from the openWeather API - for calibrating and future iterations.

  ////take the values in each variable and diaply where $VALUE is in dialog boxes
  $name.text(nameValue);
  $temperature.text(temperatureValue);
  $description.text(descriptionValue);
  $humidity.text(humidityValue);
  $clouds.text(cloudDensityValue);
  $rain.text(rainAmount);
  //
}

//first dialog box on entry to application
$(`#introduction-dialog`).dialog({
  modal: true, ///must answer prompts before interaction can begin
  hide: {
    effect: "explode", ////close with this animated design effect
    duration: 1000, //how long to complete this effect
  },
  show: {
    effect: "blind", ////open with this animated design effect
    duration: 1000, //how long to complete this effect
  },
  width: $(window).width() - 200, ///resize dialog box depending on window heigh and width
  height: $(window).height() - 100,
  buttons: {
    "Light Background": function () {
      ///lighter background option creates differently textured visuals with the ripples.
      $(`canvas`).css({
        ///access the canvas variable in css
        "background-color": "white",
      }); //change the css background-color element to white
      $(this).dialog("close");
      /// after the light background button is pressed, close the dialog box.
    },

    "Dark Background": function () {
      $(this).dialog("close"); //don't do anything but close the dialog box, since black is the default background -color
    },
  },
});

//'hidden' dialog box - click button with '¯\_(ツ)_/¯' to access it after the original intro dialog back is closed.
$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    width: $(window).width() - 200, //resize dialog box depending on window heigh and width
    height: $(window).height() - 100,
    show: {
      effect: "blind", ////open with this animated design effect
      duration: 1000, //how long to complete this effect
    },
    hide: {
      effect: "explode", ////close with this animated design effect
      duration: 1000, //how long to complete this effect
    },
    buttons: {
      "Light Background": function () {
        $(`canvas`).css({
          //access the css variable 'canvas'
          "background-color": "white",
        }); //change the css color element to white
        $(this).dialog("close"); ///close dialog box after making the selection
      },
      "Dark Background": function () {
        $(this).dialog("close"); ///after making the selection, close the dialog box
        $(`canvas`).css({
          ///access the canvas variable in css doc
          "background-color": "black", ///set background color to black
        });
      },
    },
  });

  $("#opener").on("click", function () {
    ///open dialog box after clicking on button
    $("#dialog").dialog("open");
  });
});

window.onload = function () {
  //what gets passed to the BufferLoader class is the poject paths of the file containing the sound sample (the notes) and the index of that sound in the list.
  //create new bufferLoader object via the BufferLoader Class - send 3 arguements -  audio context, which is the property of the Audio object /class , an array of the soundfiles, and callBack funtion to call once the sounds have been successfully loaded.

  //
  //load the A notes :
  aBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files  into the array using the Audio class
    [
      "sounds/synth/a/a.1-frozenPiano.mp3",
      "sounds/synth/a/a.2-mellow.mp3",
      "sounds/synth/a/a.3-synthi.mp3",
      "sounds/synth/a/a.mp3",
      "sounds/synth/a/a2.1-frozenPiano.mp3",
      "sounds/synth/a/a2.2-mellow.mp3",
      "sounds/synth/a/a2.3-synthi.mp3",
      "sounds/synth/a/a2.mp3",
      "sounds/synth/a/ORC.a-bass.mp3",
      "sounds/synth/a/ORC.a-celesta.mp3",
      "sounds/synth/a/ORC.a-harp.mp3",
      "sounds/synth/a/ORC.a-violin.mp3",
      "sounds/synth/a/ORC.a.mp3",
      "sounds/synth/a/ORC.a2-bass.mp3",
      "sounds/synth/a/ORC.a2-celesta.mp3",
      "sounds/synth/a/ORC.a2-harp.mp3",
      "sounds/synth/a/ORC.a2-violin.mp3",
      "sounds/synth/a/ORC.a2.mp3",
    ],
    aBufferLoaded //the callback function for when all notes are finished loading
  );

  aBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function aBufferLoaded(bufferList) {
    aBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note ("A" in this case).

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.
    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate); ///bind connects the update display to view and not canvas
  }

  //load Ab notes
  abBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/ab/ab.1-frozenPiano.mp3",
      "sounds/synth/ab/ab.2-mellow.mp3",
      "sounds/synth/ab/ab.3-synthi.mp3",
      "sounds/synth/ab/ab.mp3",
      "sounds/synth/ab/ab2.1-frozenPiano.mp3",
      "sounds/synth/ab/ab2.2-mellow.mp3",
      "sounds/synth/ab/ab2.3-synthi.mp3",
      "sounds/synth/ab/ab2.mp3",
      "sounds/synth/ab/ORC.ab-bass.mp3",
      "sounds/synth/ab/ORC.ab-celesta.mp3",
      "sounds/synth/ab/ORC.ab-harp.mp3",
      "sounds/synth/ab/ORC.ab-violin.mp3",
      "sounds/synth/ab/ORC.ab.mp3",
      "sounds/synth/ab/ORC.ab2-bass.mp3",
      "sounds/synth/ab/ORC.ab2-celesta.mp3",
      "sounds/synth/ab/ORC.ab2-harp.mp3",
      "sounds/synth/ab/ORC.ab2-violin.mp3",
      "sounds/synth/ab/ORC.ab2.mp3",
    ],
    abBufferLoaded ///the callback function for when all notes are finished loading
  );

  abBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function abBufferLoaded(bufferList) {
    abBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load B notes
  bBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/b/b.1-frozenPiano.mp3",
      "sounds/synth/b/b.2-mellow.mp3",
      "sounds/synth/b/b.3-synthi.mp3",
      "sounds/synth/b/b.mp3",
      "sounds/synth/b/b2.1-frozenPiano.mp3",
      "sounds/synth/b/b2.2-mellow.mp3",
      "sounds/synth/b/b2.3-synthi.mp3",
      "sounds/synth/b/b2.mp3",
      "sounds/synth/b/ORC.b-bass.mp3",
      "sounds/synth/b/ORC.b-celesta.mp3",
      "sounds/synth/b/ORC.b-harp.mp3",
      "sounds/synth/b/ORC.b-violin.mp3",
      "sounds/synth/b/ORC.b.mp3",
      "sounds/synth/b/ORC.b2-bass.mp3",
      "sounds/synth/b/ORC.b2-celesta.mp3",
      "sounds/synth/b/ORC.b2-harp.mp3",
      "sounds/synth/b/ORC.b2-violin.mp3",
      "sounds/synth/b/ORC.b2.mp3",
    ],
    bBufferLoaded ///the callback function for when all notes are finished loading
  );

  bBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function bBufferLoaded(bufferList) {
    bBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load Bb notes
  bbBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/bb/bb.1-frozenPiano.mp3",
      "sounds/synth/bb/bb.2-mellow.mp3",
      "sounds/synth/bb/bb.3-synthi.mp3",
      "sounds/synth/bb/bb.mp3",
      "sounds/synth/bb/bb2.1-frozenPiano.mp3",
      "sounds/synth/bb/bb2.2-mellow.mp3",
      "sounds/synth/bb/bb2.3-synthi.mp3",
      "sounds/synth/bb/bb2.mp3",
      "sounds/synth/bb/ORC.bb-bass.mp3",
      "sounds/synth/bb/ORC.bb-celesta.mp3",
      "sounds/synth/bb/ORC.bb-harp.mp3",
      "sounds/synth/bb/ORC.bb-violin.mp3",
      "sounds/synth/bb/ORC.bb.mp3",
      "sounds/synth/bb/ORC.bb2-bass.mp3",
      "sounds/synth/bb/ORC.bb2-celesta.mp3",
      "sounds/synth/bb/ORC.bb2-harp.mp3",
      "sounds/synth/bb/ORC.bb2-violin.mp3",
      "sounds/synth/bb/ORC.bb2.mp3",
    ],
    bbBufferLoaded ///the callback function for when all notes are finished loading
  );

  bbBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function bbBufferLoaded(bufferList) {
    bbBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load C notes
  cBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/c/c.1-frozenPiano.mp3",
      "sounds/synth/c/c.2-mellow.mp3",
      "sounds/synth/c/c.3-synthi.mp3",
      "sounds/synth/c/c.mp3",
      "sounds/synth/c/c2.1-frozenPiano.mp3",
      "sounds/synth/c/c2.2-mellow.mp3",
      "sounds/synth/c/c2.3-synthi.mp3",
      "sounds/synth/c/c2.mp3",
      "sounds/synth/c/ORC.c-bass.mp3",
      "sounds/synth/c/ORC.c-celesta.mp3",
      "sounds/synth/c/ORC.c-harp.mp3",
      "sounds/synth/c/ORC.c-violin.mp3",
      "sounds/synth/c/ORC.c.mp3",
      "sounds/synth/c/ORC.c2-bass.mp3",
      "sounds/synth/c/ORC.c2-celesta.mp3",
      "sounds/synth/c/ORC.c2-harp.mp3",
      "sounds/synth/c/ORC.c2-violin.mp3",
      "sounds/synth/c/ORC.c2.mp3",
    ],
    cBufferLoaded ///the callback function for when all notes are finished loading
  );

  cBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function cBufferLoaded(bufferList) {
    cBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.
    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load D notes
  dBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/d/d.1-frozenPiano.mp3",
      "sounds/synth/d/d.2-mellow.mp3",
      "sounds/synth/d/d.3-synthi.mp3",
      "sounds/synth/d/d.mp3",
      "sounds/synth/d/d2.1-frozenPiano.mp3",
      "sounds/synth/d/d2.2-mellow.mp3",
      "sounds/synth/d/d2.3-synthi.mp3",
      "sounds/synth/d/d2.mp3",
      "sounds/synth/d/ORC.d-bass.mp3",
      "sounds/synth/d/ORC.d-celesta.mp3",
      "sounds/synth/d/ORC.d-harp.mp3",
      "sounds/synth/d/ORC.d-violin.mp3",
      "sounds/synth/d/ORC.d.mp3",
      "sounds/synth/d/ORC.d2-bass.mp3",
      "sounds/synth/d/ORC.d2-celesta.mp3",
      "sounds/synth/d/ORC.d2-harp.mp3",
      "sounds/synth/d/ORC.d2-violin.mp3",
      "sounds/synth/d/ORC.d2.mp3",
    ],
    dBufferLoaded ///the callback function for when all notes are finished loading
  );

  dBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function dBufferLoaded(bufferList) {
    dBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList

    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load Db notes
  dbBufferLoader = new BufferLoader( ///create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/db/db.1-frozenPiano.mp3",
      "sounds/synth/db/db.2-mellow.mp3",
      "sounds/synth/db/db.3-synthi.mp3",
      "sounds/synth/db/db.mp3",
      "sounds/synth/db/db2.1-frozenPiano.mp3",
      "sounds/synth/db/db2.2-mellow.mp3",
      "sounds/synth/db/db2.3-synthi.mp3",
      "sounds/synth/db/db2.mp3",
      "sounds/synth/db/ORC.db-bass.mp3",
      "sounds/synth/db/ORC.db-celesta.mp3",
      "sounds/synth/db/ORC.db-harp.mp3",
      "sounds/synth/db/ORC.db-violin.mp3",
      "sounds/synth/db/ORC.db.mp3",
      "sounds/synth/db/ORC.db2-bass.mp3",
      "sounds/synth/db/ORC.db2-celesta.mp3",
      "sounds/synth/db/ORC.db2-harp.mp3",
      "sounds/synth/db/ORC.db2-violin.mp3",
      "sounds/synth/db/ORC.db2.mp3",
    ],
    dbBufferLoaded ///the callback function for when all notes are finished loading
  );

  dbBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.

  function dbBufferLoaded(bufferList) {
    dbBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); //initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.
    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load E notes
  eBufferLoader = new BufferLoader( //create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/e/e.1-frozenPiano.mp3",
      "sounds/synth/e/e.2-mellow.mp3",
      "sounds/synth/e/e.3-synthi.mp3",
      "sounds/synth/e/e.mp3",
      "sounds/synth/e/e2.1-frozenPiano.mp3",
      "sounds/synth/e/e2.2-mellow.mp3",
      "sounds/synth/e/e2.3-synthi.mp3",
      "sounds/synth/e/e2.mp3",
      "sounds/synth/e/ORC.e-bass.mp3",
      "sounds/synth/e/ORC.e-celesta.mp3",
      "sounds/synth/e/ORC.e-harp.mp3",
      "sounds/synth/e/ORC.e-violin.mp3",
      "sounds/synth/e/ORC.e.mp3",
      "sounds/synth/e/ORC.e2-bass.mp3",
      "sounds/synth/e/ORC.e2-celesta.mp3",
      "sounds/synth/e/ORC.e2-harp.mp3",
      "sounds/synth/e/ORC.e2-violin.mp3",
      "sounds/synth/e/ORC.e2.mp3",
    ],
    eBufferLoaded ///the callback function for when all notes are finished loading
  );

  eBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function eBufferLoaded(bufferList) {
    eBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); ///initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.
    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load Eb notes
  ebBufferLoader = new BufferLoader( //create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/eb/eb.1-frozenPiano.mp3",
      "sounds/synth/eb/eb.2-mellow.mp3",
      "sounds/synth/eb/eb.3-synthi.mp3",
      "sounds/synth/eb/eb.mp3",
      "sounds/synth/eb/eb2.1-frozenPiano.mp3",
      "sounds/synth/eb/eb2.2-mellow.mp3",
      "sounds/synth/eb/eb2.3-synthi.mp3",
      "sounds/synth/eb/eb2.mp3",
      "sounds/synth/eb/ORC.eb-bass.mp3",
      "sounds/synth/eb/ORC.eb-celesta.mp3",
      "sounds/synth/eb/ORC.eb-harp.mp3",
      "sounds/synth/eb/ORC.eb-violin.mp3",
      "sounds/synth/eb/ORC.eb.mp3",
      "sounds/synth/eb/ORC.eb2-bass.mp3",
      "sounds/synth/eb/ORC.eb2-celesta.mp3",
      "sounds/synth/eb/ORC.eb2-harp.mp3",
      "sounds/synth/eb/ORC.eb2-violin.mp3",
      "sounds/synth/eb/ORC.eb2.mp3",
    ],
    ebBufferLoaded ///the callback function for when all notes are finished loading
  );

  ebBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function ebBufferLoaded(bufferList) {
    ebBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); ///initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note.

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load F notes
  fBufferLoader = new BufferLoader( //create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/f/f.1-frozenPiano.mp3",
      "sounds/synth/f/f.2-mellow.mp3",
      "sounds/synth/f/f.3-synthi.mp3",
      "sounds/synth/f/f.mp3",
      "sounds/synth/f/f2.1-frozenPiano.mp3",
      "sounds/synth/f/f2.2-mellow.mp3",
      "sounds/synth/f/f2.3-synthi.mp3",
      "sounds/synth/f/f2.mp3",
      "sounds/synth/f/ORC.f-bass.mp3",
      "sounds/synth/f/ORC.f-celesta.mp3",
      "sounds/synth/f/ORC.f-harp.mp3",
      "sounds/synth/f/ORC.f-violin.mp3",
      "sounds/synth/f/ORC.f.mp3",
      "sounds/synth/f/ORC.f2-bass.mp3",
      "sounds/synth/f/ORC.f2-celesta.mp3",
      "sounds/synth/f/ORC.f2-harp.mp3",
      "sounds/synth/f/ORC.f2-violin.mp3",
      "sounds/synth/f/ORC.f2.mp3",
    ],
    fBufferLoaded ///the callback function for when all notes are finished loading
  );

  fBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function fBufferLoaded(bufferList) {
    fBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); ///initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note.

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load G notes
  gBufferLoader = new BufferLoader( //create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/g/g.1-frozenPiano.mp3",
      "sounds/synth/g/g.2-mellow.mp3",
      "sounds/synth/g/g.3-synthi.mp3",
      "sounds/synth/g/g.mp3",
      "sounds/synth/g/g2.1-frozenPiano.mp3",
      "sounds/synth/g/g2.2-mellow.mp3",
      "sounds/synth/g/g2.3-synthi.mp3",
      "sounds/synth/g/g2.mp3",
      "sounds/synth/g/ORC.g-bass.mp3",
      "sounds/synth/g/ORC.g-celesta.mp3",
      "sounds/synth/g/ORC.g-harp.mp3",
      "sounds/synth/g/ORC.g-violin.mp3",
      "sounds/synth/g/ORC.g.mp3",
      "sounds/synth/g/ORC.g2-bass.mp3",
      "sounds/synth/g/ORC.g2-celesta.mp3",
      "sounds/synth/g/ORC.g2-harp.mp3",
      "sounds/synth/g/ORC.g2-violin.mp3",
      "sounds/synth/g/ORC.g2.mp3",
    ],
    gBufferLoaded ///the callback function for when all notes are finished loading
  );

  gBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function gBufferLoaded(bufferList) {
    gBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); ///initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note.

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.

    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }

  //load Gb notes
  gbBufferLoader = new BufferLoader( //create new BufferLoader via the class
    Audio.audioContext, ///set the audio files into the array using the Audio class
    [
      "sounds/synth/gb/gb.1-frozenPiano.mp3",
      "sounds/synth/gb/gb.2-mellow.mp3",
      "sounds/synth/gb/gb.3-synthi.mp3",
      "sounds/synth/gb/gb.mp3",
      "sounds/synth/gb/gb2.1-frozenPiano.mp3",
      "sounds/synth/gb/gb2.2-mellow.mp3",
      "sounds/synth/gb/gb2.3-synthi.mp3",
      "sounds/synth/gb/gb2.mp3",
      "sounds/synth/gb/ORC.gb-bass.mp3",
      "sounds/synth/gb/ORC.gb-celesta.mp3",
      "sounds/synth/gb/ORC.gb-harp.mp3",
      "sounds/synth/gb/ORC.gb-violin.mp3",
      "sounds/synth/gb/ORC.gb.mp3",
      "sounds/synth/gb/ORC.gb2-bass.mp3",
      "sounds/synth/gb/ORC.gb2-celesta.mp3",
      "sounds/synth/gb/ORC.gb2-harp.mp3",
      "sounds/synth/gb/ORC.gb2-violin.mp3",
      "sounds/synth/gb/ORC.gb2.mp3",
    ],
    gbBufferLoaded ///the callback function for when all notes are finished loading
  );

  gbBufferLoader.load(); ///load the buffer loader

  ///callback function with the bufferList as a parameter - this function activates a note, sets the interval and draws a ripple when the note is called.
  function gbBufferLoaded(bufferList) {
    gbBufferList = bufferList; ///take the *note*BufferList just loaded and set it to bufferList
    Audio.init(bufferList); ///initiate the audio by passing in the bufferList array and storing in the Audio object and used when we call the Audio.play method for that note.

    let canvas = document.getElementById("canvas"); //set canvas from the DOM in html and pass as a parameter to View class. This is the destination for the images drawn in the View class.
    view = new View(canvas); ///create new view visual object using the View class - a ripple gets constructed every time this note is played.

    ///call updateDisplay at each frame rate  (< this is the interval), bind is making sure updateDisaplay is the method of the View
    setInterval(view.updateDisplay.bind(view), view.frameRate);
  }
};

///The gatherNotes function sets up the mode arrays with the *note*BufferLists (each *note*BufferList variable cantains an array of 18 different sounds of the same note) in the appropriate index for the note's location as a degree in that mode/scale. i.e ROOT note for bbIoniian is b-flat (Bb), so set bbBufferList at the first index position of bbIonian.
///The weatherMode object is here as well. It sets every 'string' description fetched from the openWeather API, set to specificWeather to it's corresponding MODE (remember, a mode is a type of musical scale).
function gatherNotes() {
  console.log("general weather: " + generalWeather); //for fun and reference
  console.log("temp: " + temperatureValue); // for fun and reference
  console.log("humidity: " + humidityValue); // for fun and reference
  //set up b-flat ionian with all the notes contained in it
  bbIonian = [
    bbBufferList,
    cBufferList,
    dBufferList,
    ebBufferList,
    fBufferList,
    gBufferList,
    aBufferList,
  ];

  ///set up b-flat lydian with all the notes contained in it
  bbLydian = [
    bbBufferList,
    cBufferList,
    dBufferList,
    eBufferList,
    fBufferList,
    gBufferList,
    aBufferList,
  ];
  ///set up b-flat mixolydian with all the notes contained in it
  bbMixolydian = [
    bbBufferList,
    cBufferList,
    dBufferList,
    ebBufferList,
    fBufferList,
    gBufferList,
    abBufferList,
  ];
  ///set up b-flat dorian with all the notes contained in it
  bbDorian = [
    bbBufferList,
    cBufferList,
    dbBufferList,
    ebBufferList,
    fBufferList,
    gBufferList,
    abBufferList,
  ];
  ///set up b-flat aeolian with all the notes contained in it
  bbAeolian = [
    bbBufferList,
    cBufferList,
    dbBufferList,
    ebBufferList,
    fBufferList,
    gbBufferList,
    abBufferList,
  ];
  ///set up b-flat phrygian with all the notes contained in it
  bbPhrygian = [
    bbBufferList,
    bBufferList,
    dbBufferList,
    ebBufferList,
    fBufferList,
    gbBufferList,
    abBufferList,
  ];

  ///set up b-flat locrian with all the notes contained in it
  bbLocrian = [
    bbBufferList,
    bBufferList,
    dbBufferList,
    ebBufferList,
    eBufferList,
    gbBufferList,
    abBufferList,
  ];

  ///the weatherMode object that sets every 'string' description fetched from the openWeather API, set to specificWeather to it's corresponding MODE (remember, a mode is a type of musical scale).
  ///CREDIT: Thank you to Prof. Pippin Barr for this modification and suggestion. Originally I had coded a large conditional statement.
  let weatherModes = {
    "thunderstorm with light rain": bbLocrian,
    "thunderstorm with rain": bbLocrian,
    "thunderstorm with heavy rain": bbLocrian,
    "light thunderstorm": bbLocrian,
    thunderstorm: bbLocrian,
    "heavy thunderstorm": bbLocrian,
    "ragged thunderstorm": bbLocrian,
    "thunderstorm with light drizzle": bbLocrian,
    "thunderstorm with drizzle": bbLocrian,
    "thunderstorm with heavy drizzle": bbLocrian,
    "light intensity drizzle": bbMixolydian,
    drizzle: bbMixolydian,
    "heavy intensity drizzle": bbDorian,
    "light intensity drizzle rain": bbDorian,
    "drizzle rain": bbDorian,
    "heavy intensity drizzle rain": bbAeolian,
    "shower rain and drizzle": bbAeolian,
    "heavy shower rain and drizzle": bbAeolian,
    "shower drizzle": bbAeolian,
    "light rain": bbMixolydian,
    "moderate rain": bbAeolian,
    "heavy intensity rain": bbLocrian,
    "very heavy rain": bbLocrian,
    "extreme rain": bbLocrian,
    "freezing rain": bbPhrygian,
    "light intensity shower rain": bbDorian,
    "shower rain": bbAeolian,
    "heavy intensity shower rain": bbAeolian,
    "ragged shower rain": bbAeolian,
    "light snow": bbMixolydian,
    snow: bbMixolydian,
    "Heavy snow": bbDorian,
    Sleet: bbAeolian,
    "Light shower sleet": bbAeolian,
    "Shower sleet": bbAeolian,
    "Light rain and snow": bbDorian,
    "Rain and snow": bbAeolian,
    "Light shower snow": bbAeolian,
    "Shower snow": bbDorian,
    "Heavy shower snow": bbLocrian,
    mist: bbPhrygian,
    Smoke: bbPhrygian,
    Haze: bbPhrygian,
    "sand/ dust whirls": bbPhrygian,
    fog: bbPhrygian,
    sand: bbPhrygian,
    dust: bbPhrygian,
    "volcanic ash": bbPhrygian,
    squalls: bbPhrygian,
    tornado: bbPhrygian,
    "clear sky": bbIonian,
    "few clouds": bbIonian,
    "scattered clouds": bbMixolydian,
    "broken clouds": bbLydian,
    "overcast clouds": bbAeolian,
  };

  ///Switch case handles the object above, and chooses correct mode by referencing the data stored in the specificWeather variable. Also, each one sets the specific weight for each note in the mode, increaseing or decreasing its chances of being triggered. This gives the modes their distinct quality from each other. Each case sets the unique weightings in the array variable, modeWeight.
  switch (weatherModes[specificWeather]) {
    case bbIonian:
      modeWeight = [8, 3, 7, 0, 6, 3, 2];
      console.log("ionian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbLydian:
      modeWeight = [7, 5, 6, 6, 5, 3, 0];
      console.log("lydian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbMixolydian:
      modeWeight = [7, 1, 2, 4, 5, 3, 6];
      console.log("mixolydian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbDorian:
      modeWeight = [7, 1, 6, 0, 4, 3, 5];
      console.log("dorian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbAeolian:
      modeWeight = [7, 1, 6, 2, 5, 0, 3];
      console.log("aeolian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbPhrygian:
      modeWeight = [7, 6, 5, 1, 3, 0, 5];
      console.log("phrygian"); //print current mode, kept for reference and music theory practice/education
      break;
    case bbLocrian:
      modeWeight = [7, 0, 5, 2, 6, 0, 3];
      console.log("locrian"); //print current mode, kept for reference and music theory practice/education
      break;
    default:
      alert("Mode not found, try another city!"); ///if error and the weather is not connected to a mode, throw alert to user to try another city.
  }

  // Calculate the weightings array
  let weightings = [];
  for (let index = 0; index < modeWeight.length; index++) {
    for (let i = 0; i < modeWeight[index]; i++) {
      weightings.push(index);
    }
  }

  ////pass the mode array and the modeWeight as parameters into the function playNotes.
  playNotes(weatherModes[specificWeather], weightings);
}

//playNotes function carries the mode and weightings, sends them parameteres to playRandom note, where the notes are actually triggered, but also calls clearTimeout, sending the parameter musicTimeout, which stops the previous mode from playing when a new mode is triggered.

function playNotes(mode, weightings) {
  clearTimeout(musicTimeout); //stop the previous mode playing when a new mode is chosen (other wise the modes layer and layer...)

  playRandomNote(mode, weightings); //call playRandomNote function and send the parameters mode and weightings
}

function playRandomNote(mode, weightings) {
  ///CREDIT: weighted logic and probality first modelled after http://www.javascriptkit.com/javatutors/weighrandom2.shtml, then I drastically reorganized and remodelled, but then Prof. Pippin Barr came up with this cleaner, simplified solution
  ///
  ///examples of what is in mode and weightings
  ///let mode = (bbBufferlist, cbufferlist, debufferList etc.)//this is what we are weighing
  ///let weightings = ["#", "#".... ]
  //

  console.log("-----");
  // console.log(mode);//kept for future compositional adjustments
  // console.log(weightings);///kept for future compositional adjustments

  // Choose the note (bufferList) to play next randomly, based on the weightings.
  let randomBufferListIndex = random(weightings);
  let randomBufferList = mode[randomBufferListIndex];

  // Extreme temperature...
  if (temperatureValue <= 10 || temperatureValue >= 26) {
    if (Math.random() < 0.8) {
      // 80% chance of extreme bank
      bankMin = extremeBankMin;
      bankMax = extremeBankMax;
      // console.log("extreme");//remains to change and tweak sound banks in future
    } else {
      bankMin = temperateBankMin;
      bankMax = temperateBankMax;
      // console.log("temperate");//remains to change and tweak sound banks in future
    }
  }
  // Temperate temperature
  else {
    if (Math.random() < 0.8) {
      // 20% chance of temperate bank
      bankMin = temperateBankMin;
      bankMax = temperateBankMax;
      // console.log("temperate");//remains to change and tweak sound banks in future
    } else {
      bankMin = extremeBankMin;
      bankMax = extremeBankMax;
      // console.log("extreme");//remains to change and tweak sound banks in future
    }
  }
  // Choose our note index from the selected bank's range of indexesa
  let randomNoteIndex = randomInRange(bankMin, bankMax);

  // Initialize the buffer list to play
  Audio.init(randomBufferList);

  // Work out parameters
  ////track number of notes to vary the composition at different times, after a certain number of notes are played, change the interval timing between each note slow to fast, back to slow. The interval timing is also determined by the humidity percentage of the weather in that location.
  if (countNotesPlayed <= 5) {
    intervalMultiple = humidityValue * 50;
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 5 && countNotesPlayed <= 10) {
    intervalMultiple = (humidityValue / 2) * 100;
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 10 && countNotesPlayed <= 20) {
    intervalMultiple = (humidityValue / 4) * 100;
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 20 && countNotesPlayed <= 60) {
    ///after 20 notes have played shorten intervals
    intervalMultiple = (humidityValue / 6) * 100; ///faster
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 60 && countNotesPlayed <= 75) {
    intervalMultiple = (humidityValue / 2) * 100;
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 75 && countNotesPlayed <= 80) {
    intervalMultiple = humidityValue * 100;
    countNotesPlayed += 1;
  } else if (countNotesPlayed > 80) {
    countNotesPlayed = 0;
  }
  // console.log("# of notes played: " + countNotesPlayed); ///for reference and debugging and compostition tweaking

  intervalTiming = Math.floor(Math.random() * intervalMultiple); //vary the interval timing depending on the humidity and the position of the compostiion
  // console.log("interval multiple: " + intervalMultiple);/// for reference
  // console.log("interval timing: " + intervalTiming);/// for reference

  Audio.gainNode.gain.value = 0.1 + Math.random() * 0.5; //vary volume - set between 0.1 and 0.5

  //play the indexed number (note) of the randomNoteIndex passed to this function
  Audio.play(randomNoteIndex);

  ///map ripples Y location to to the index of the note played and the radius to the volume the note is played at. X location is a random horizontal position.
  let y = map(randomBufferListIndex, 0, 7, 100, view.canvas.height);
  let x = Math.random() * view.canvas.width;
  let maxRadius = map(Audio.gainNode.gain.value, 0, 1, 5, 300);

  view.addCircle(x, y, maxRadius);

  // console.log("interval multiple: " + intervalMultiple);/// for reference
  // console.log("interval timing: " + intervalTiming);/// for reference

  ///set musicTimeout to play next note.
  musicTimeout = setTimeout(function () {
    playRandomNote(mode, weightings);
  }, intervalTiming);
}

///pass an array to this function and then choose a random index based on the array length
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
///send a min and max value to this function and then return a random selection from within that range.
function randomInRange(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

///mapping function takes the difference between the value and romMin divided by the difference between fromMax and fromMin, and multiply the sum of the difference between toMax and toMin plus toMin.
/// this scales a range of values to another range of values and returns the result.
function map(value, fromMin, fromMax, toMin, toMax) {
  let result =
    ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
  return result;
}

//make the animated ripple TITLE at the top of the page DRAGGABLE
$(`#ripple-one`).draggable();
$(`#ripple-two`).draggable();
$(`#ripple-three`).draggable();
$(`#ripple-four`).draggable();
