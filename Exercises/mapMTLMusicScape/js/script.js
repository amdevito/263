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
- inital prompts for name and password x
- take the user entered information and save (drop down menues into slots below and in local storage.) x still need to move to local storage
- audio gems collcted should read 0 at first unless old profile is pulled up x
- how you you like to hunt? take the answer and put below unless random, then chose the value randomly and put below x
-
- ><><****Need to take the type of hunt, the audio gem and the lat and long or home neighbourhood and return the appropriate audio hunt for the user from the JSON file.. Then just tally when you return the location and item to the auudio gem. (No need for actual direction and searching at this point.)
- the geolocation hunt address will just be the appropriate neighbouthood lat and long for now -- see the p5.js example that sends this back..

- what kind of audio gem? - make array and choose from the array, then find a gem in the general vacinity and report back address. in the my current hunt section.
- geolocation data: https://editor.p5js.org/shiffman/sketches/HkQ8kMdee






******************/

// The audio scape  profile data while the program is running
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

let userInputHomeHood = undefined; //user enters the name of their local neighourhood to them
let userInputSelection = undefined; //randomized if userChooseMethod is random, else user enter soundscape, interview, story, playlist
let userInputHuntMethod = undefined; //Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.) Direct me with words. Show me a map. ( please be careful).

// buttons
let inputHomeHoodButton = undefined; //user enters the name of their local neighourhood to them

let seeMapButton = undefined;

function preload() {
  mmmBanner = loadImage(`assets/images/mmmBanner.png`); //take this out of issue persists

  audioScapeData = loadJSON(`assets/data/location_data.json`);
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(375, 667); //size of iphone 6/7/8 - mobile first then make responsive to other shapes.

  //input submit boxes
  userInputHomeHood = createInput();
  userInputHomeHood.position(230, 215); /// fills in My Home Neighbourhood.
  userInputHomeHood.size(100, 15);

  inputHomeHoodButton = createButton("submit");
  inputHomeHoodButton.position(userInputHomeHood.x, 240); //located above the input box
  inputHomeHoodButton.mousePressed(sendHomeHood); //do a function when mouse is pressed

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

  //input submit buttons

  seeMapButton = createButton("See MMMAP");
  seeMapButton.position(userInputHomeHood.x, 110); //located above the input box
  seeMapButton.mousePressed(sendMapButton); //do a function when mouse is pressed
  seeMapButton.size(105, 50);

  ///When above information is submitted the sectons above that currently say REDACTED ARE filled with the appropriate inforation in a NEW COLOR.

  // Check of there is and try to load the data
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
}

/**
Assigns across the profile properties from the data to the current profile
*/
function generateAudioScapeProfile() {
  mmMapProfile.name = prompt(`What is your
name?`);
  mmMapProfile.password = prompt(`Please create a password.`);

  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
  //localStorage is the object that knows how to save things
  //setItem is the method that does the saving
  //'mmMap-profile-data' is the key
  //stringify the thing you want to save
}

//
// /**
// Generates a  profile from JSON data
// */
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
   ${mmMapProfile.currentHuntHood} ${mmMapProfile.huntMethod}
   ${mmMapProfile.selection}

  Current Geolocation Hunt Address:
   ${mmMapProfile.huntAddress}`;

  // Name: entered from input and stored in localStorage
  //my home neighbourhood: user enter
  //audio gems collected: track irl hit detection from lat and long and geolocation
  //cue word _ password?
  //
  //my current location : fill with geolocation
  //My current hunt: soundscape, interview, story, playlist or user (eventually people can create and leave their own audio gems - must be monitored...)
  //my current neghbourhood: take the lat and long and map it to a neighbourhood.

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
  ///QUESTION: how do i save this to the profile for next time? stringify? same with send Hunt Method. Also for my hunt and send selection.
}

function sendHuntMethod() {
  mmMapProfile.huntMethod = userInputHuntMethod.value();

  if (mmMapProfile.huntMethod === `Random`) {
    mmMapProfile.huntMethod = random(huntType);
    userInputHuntMethod.value(`Choose the method or randomize.`);
  } else {
    userInputHuntMethod.value(`Choose the method or randomize.`);
  }
}
function sendSelection() {
  mmMapProfile.selection = userInputSelection.value();

  if (mmMapProfile.selection === `Random`) {
    mmMapProfile.selection = random(audioGems);
    userInputSelection.value(`Choose the type or randomize.`);
  } else {
    userInputSelection.value(`Choose the type or randomize.`);
  }
}

function sendMapButton() {}
