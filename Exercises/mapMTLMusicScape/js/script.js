"use strict";

/*****************
e3: Spy Profile Generator PLUS -- Mapping the Montreal Musicscape
-- a audio scavenger hunt
--- walk through the city listening to an ambient soundscape until you enter certain locations. A cue sound indicates that you are getting close and the closer (will get louder and more frequent as you get closer to the 'audioGem')

(Mock Up using location relative to the user's starting point. Eventually these will be connected to specific neighbourhood locations in Montreal.)
- although you must go to these locations to initially find the items, once found you can access them again from anywhere (they are saved to your local storage in your profile. you can also reset your storage to start fresh.)
Alana
Brief:
- *use geolocation api to find sound files items in your general vacinity
- *Create the design of the application for a mobile app (improve the mobile display)
- Add the ability to delete the current profile data with a keyboard command or button (reset)
- store the items you searched for at each visit
- *Allow the user to selectively regenerate specific categories in the profile (by clicking on them? with keyboard keys? with their voice?) to get one they like
    *** could this be what kind of oudn pieces they would like to hear?
      - ambient, playlist, interview, soundscape, experimental?

      Enter your name and password please.

      What kind of Montreal Audio Gem would you like to discover today?
      Show me my old profile.
      Or
      Choose:
      Random
      Soundscape
      Interview
      Story
      Playlist

      How would you like to find it?
      Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.)
      Direct me with words.
      Show me a map. ( please be careful).

      **show current profile with the items choices***

      Finding location...

NEXT STEPS: Mon feb 8:
- inital prompts for name and password
- take the user entered information and save (drop down menues into slots below and in local storage.)
- audio gems collcted should read 0 at first unless old profile is pulled up x
- how you you like to hunt? take the answer and put below unless random, then chose the value randomly and put below
-
- ><><****Need to take the type of hunt, the audio gem and the lat and long or home neighbourhood and return the appropriate audio hunt for the user from the JSON file.. Then just tally when you return the location and item to the auudio gem. (No need for actual direction and searching at this point.)
- the geolocation hunt address will just be the appropriate neighbouthood lat and long for now -- see the p5.js example that sends this back..

- what kind of audio gem? - make array and choose from the array, then find a gem in the general vacinity and report back address. in the my current hunt section.
- geolocation data: https://editor.p5js.org/shiffman/sketches/HkQ8kMdee






******************/

// // URLs to JSON data
// const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
// const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
// const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
// // The key used to save and load the data for this program
// const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let mmMapProfile = {
  //change to montrealMuMapProfile
  name: `**********`,
  homeHood: `**********`, //my neighbourhood - this is the prompt instead of password.
  audioGemsCollected: `0`, //number of audio gems Collected
  currentLocation: `**********`, ///geolocation - fetch lat and long
  huntMethod: `**********`,
  selection: `**********`, ///current gem hunt: --if choose random, generate randomly, else, choose in app, not in prompt
  currentHuntHood: `**********`, //neighbourhood determined by geolocation
  password: `**********`,
  huntAddress: "*********", ///where you are going to find the audio gem (shown just in mockup prototype) this is where the user is led.
};
// Variables to store JSON data for generating the profile
//change to variables to store JSON data per neighbourhood
let audioScapeData = undefined;

let homeHoodData = undefined;
let audioGemsCollectedData = 0;
let currentLocationData = undefined;
let currentHuntHoodData = undefined;

let audioGems = ["Interview", "Story", "Playlist", "User Created"];
let huntType = [
  "Mystery Walk w/ Audio Cue",
  "Direct Me with Voice",
  "Map Only",
];

let huntAddressData = undefined; ///where you are going to find the audio gem (shown just in mockup prototype) this is where the user is led.

let mmmBanner = undefined; // set app banner design

///
// let userInputName = undefined; already defined in the inital prompt
let userInputHomeHood = undefined; //user enters the name of their local neighourhood to them
let userInputChooseMethod = undefined; //random or select
let userInputSelection = undefined; //randomized if userChooseMethod is random, else user enter soundscape, interview, story, playlist
let userInputHuntMethod = undefined; //Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.) Direct me with words. Show me a map. ( please be careful).

// buttons
let inputHomeHoodButton = undefined; //user enters the name of their local neighourhood to them
// let inputChooseMethodButton = undefined; //random or select
// let inputSelectionButton = undefined; //randomized if userChooseMethod is random, else user enter soundscape, interview, story, playlist
// let inputHuntMethodButton = undefined; //Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.) Direct me with words. Show me a map. ( please be careful).
/**
Loads the JSON data used to generate the profile
*/

let seeMapButton = undefined;

function preload() {
  mmmBanner = loadImage(`assets/images/mmmBanner.png`); //take this out of issue persists

  audioScapeData = loadJSON(`assets/data/location_data.json`);
  // locationData = loadJSON(`assets/data/location_data.json`);
  // objectData = loadJSON(
  //   `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  // );
  // instrumentData = loadJSON(
  //   `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  // );
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(370, 670); //size of cell phone

  // generateSpyProfile();

  //input submit boxes
  userInputHomeHood = createInput();
  userInputHomeHood.position(230, 215); /// fills in My Home Neighbourhood.
  userInputHomeHood.size(100, 15);

  inputHomeHoodButton = createButton("submit");
  inputHomeHoodButton.position(userInputHomeHood.x, 240); //located above the input box
  inputHomeHoodButton.mousePressed(sendHomeHood); //do a function when mouse is pressed
  // userInputChooseMethod = createInput();
  // userInputSelection = createInput();

  //drop down menu
  userInputHuntMethod = createSelect();
  userInputHuntMethod.position(32, 420);
  userInputHuntMethod.option("Choose the method or randomize.");
  userInputHuntMethod.option("Random");
  userInputHuntMethod.option("Mystery Walk w/ Audio Cue");
  userInputHuntMethod.option("Direct me with voice");
  userInputHuntMethod.option("Map only");
  userInputHuntMethod.changed(sendHuntMethod); // to create action after the input drop down is changed.

  userInputSelection = createSelect();
  userInputSelection.position(32, 480);
  userInputSelection.option("Choose the type or randomize.");
  userInputSelection.option("Random");
  userInputSelection.option("Interview");
  userInputSelection.option("Story");
  userInputSelection.option("Playlist");
  userInputSelection.option("User Created"); //to find gems left by other users.< will need to be monitored. will be rated by other users.
  userInputSelection.changed(sendSelection); // to create action after the input drop down is changed.

  // userInputChooseMethod.selected('kiwi');
  // userInputChooseMethod.changed(userInputChooseMethod);// to create action after the input drop down is changed.

  // userInputHuntMethod = createInput();

  //text boxes

  // userInputChooseMethod.position(35, 510); ////fills search selection with random or select
  // userInputSelection.position(35, 565); //soundscape, interview, story or playlist  (if random will create itself.)
  // userInputHuntMethod.position(35, 620); //choose Mystery walk (listen to a ambient playlist with abstract audio direction only - A audio signal will get louder or quieter as you get closer to an item.)  Direct me with words. Show me a map. ( please be careful).

  // userInputChooseMethod.size(200, 15);
  // userInputSelection.size(200, 15);
  // userInputHuntMethod.size(200, 15);

  //input submit buttons

  seeMapButton = createButton("See MMMAP");
  seeMapButton.position(userInputHomeHood.x, 110); //located above the input box
  seeMapButton.mousePressed(sendMapButton); //do a function when mouse is pressed
  seeMapButton.size(105, 50);

  // inputChooseMethodButton = createButton("submit");
  // inputChooseMethodButton.position(
  //   userInputChooseMethod.x + userInputChooseMethod.width + 30,
  //   510
  // ); //located above the input box
  // inputChooseMethodButton.mousePressed(sendChooseMethod); //do a function when mouse is pressed

  // inputSelectionButton = createButton("submit");
  // inputSelectionButton.position(
  //   userInputHomeHood.x + userInputHomeHood.width + 30,
  //   565
  // ); //located above the input box
  // inputSelectionButton.mousePressed(sendSelection); //do a function when mouse is pressed

  // inputHuntMethodButton = createButton("submit");
  // inputHuntMethodButton.position(
  //   userInputHuntMethod.x + userInputHuntMethod.width + 30,
  //   620
  // ); ///located above the input box
  // inputHuntMethodButton.mousePressed(sendHuntMethod); //do a function when mouse is pressed

  ///\When above information is submitted the sectons above that currently say REDACTED ARE filled with the appropriate inforation in a NEW COLOR.

  // Try to load the data

  //open this eventually--
  let data = JSON.parse(localStorage.getItem(`mmMap-profile-data`));
  if (data !== null) {
    let name = prompt(`What is your user name? Or type "create new"`);
    if (name === `create new`) {
      generateAudioScapeProfile();
    } else {
      let password = prompt(`What is your password? Or type "create new"`);
      if (password === data.password && name === data.name) {
        mmMapProfile.name = data.name;
        mmMapProfile.homeHood = data.homeHood;
        mmMapProfile.audioGemsCollected = data.audioGemsCollected;
        mmMapProfile.huntMethod = data.huntMethod;
        mmMapProfile.selection = data.selection;
      } else if (
        (password !== data.password && name !== data.name) ||
        (name === data.name && password !== data.password) ||
        (name !== data.name && password === `create new`)
      ) {
        generateAudioScapeProfile();
      }
    }
  } else {
    generateAudioScapeProfile();
  }

  // // Check if there was data to load
  // if (data) {
  //   // If so, ask for the password
  //   let password = prompt(`What's ya password?`);
  //   // Check if the password is correct
  //   if (password === data.password) {
  //     // If is is, then setup the spy profile with the data
  //     setupSpyProfile(data);
  //   }
  // } else {
  //   // If there is no data, generate a spy profile for the user
  //   generateSpyProfile();
}

/**
Assigns across the profile properties from the data to the current profile
*/
function generateAudioScapeProfile() {
  mmMapProfile.name = prompt(`What is your
name?`);
  mmMapProfile.password = prompt(`Please create a password.`);
  // let instrument = random(instrumentData.instruments);
  // mmMapProfile.alias = `${instrument}`;
  // mmMapProfile.secretWeapon = random(objectData.objects);
  // let card = random(tarotData.tarot_interpretations);
  // // spyProfile.secretWeapon = data.secretWeapon;
  // mmMapProfile.password = random(card.keywords);

  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
  //localStorage is the object that knows how to save things
  //setItem is the method that does the saving
  //'spy-profile-data' is the key
  //stringify the thing you want to save
}

//
// /**
// Generates a spy profile from JSON data
// */
// function generateSpyProfile() {
//   // Ask for the user's name and store it
//   spyProfile.name = prompt(`What's ya name?`);
//   // Generate an alias from a random instrument
//   spyProfile.alias = `The ${random(instruments.instruments)}`;
//   // Generate a secret weapon from a random object
//   spyProfile.secretWeapon = random(objects.objects);
//   // Generate a password from a random keyword for a random tarot card
//   let card = random(tarot.tarot_interpretations);
//   spyProfile.password = random(card.keywords);
//   // Save the resulting profile to local storage
//   localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
// }
// //
// // /**
// Displays the current spy profile.
// */
function draw() {
  background(0);

  let profile = `
  AudioScape Profile

  Name:
   ${mmMapProfile.name}

  My Home Neighbourhood:
   ${mmMapProfile.homeHood}

  Audio Gems Collected:
   ${mmMapProfile.audioGemsCollected}

  My Current Location (Lat + Long):
   ${mmMapProfile.currentLocation}

  How would you like to hunt?:


  What kind of audio gem are you hunting?


  My Current Hunt:
   ${mmMapProfile.currentHuntHood} ${mmMapProfile.selection}
   ${mmMapProfile.huntMethod}

  Current Geolocation Hunt Address:
   ${mmMapProfile.huntAddress}`;

  // Name: entered from input and stored in localStorage
  //my home neighbourhood: user enter
  //audio gems collected: track irl hit detection from lat and long and geolocation
  //cue word _ password?
  //
  //my current location : fill with geolocation
  //search selection or method: user input )random or selection(
  //My current hunt: soundscape, interview, story, playlist
  //my current neghbourhood: take the lat and long and map it to a neighbourhood.
  //
  // removed:   Cue Word:
  //   ${spyProfile.password}

  push();
  image(mmmBanner, 0, 0);
  textFont(`Tahoma`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255);
  text(profile, 20, 100);

  pop();
}

function sendHomeHood() {
  mmMapProfile.homeHood = userInputHomeHood.value();
  userInputHomeHood.value("");
}
function sendChooseMethod() {}
function sendHuntMethod() {
  mmMapProfile.huntMethod = userInputHuntMethod.value();
  userInputHuntMethod.value("");
}
function sendSelection() {
  mmMapProfile.selection = userInputSelection.value();
  userInputSelection.value("");
}

function sendMapButton() {}
