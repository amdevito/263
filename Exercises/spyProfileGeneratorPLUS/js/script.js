"use strict";

/*****************
Spy Profile Generator PLUS -- Mapping the Montreal Musicscape
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




Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/
******************/

// // URLs to JSON data
// const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
// const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
// const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
// // The key used to save and load the data for this program
// const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  //change to montrealMuMapProfile
  name: `**REDACTED**`,
  alias: `**REDACTED**`, //my neighbourhood
  secretWeapon: `**REDACTED**`, //number of audio gems Collected
  password: `**REDACTED**`, //user chooses own password (just double the user prompts)
  //current gem hunt: --if choose random, generate randomly, else, choose in app, not in prompt
};
// Variables to store JSON data for generating the profile
//change to variables to store JSON data per neighbourhood
let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
Loads the JSON data used to generate the profile
*/
function preload() {
  locationData = loadJSON(`assets/data/location_data.json`);
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(370, 670); //size of cell phone

  // generateSpyProfile();

  // Try to load the data
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data !== null) {
    let password = prompt(`Agent! What is your password??`);
    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  } else {
    generateSpyProfile();
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
function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  // spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
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

  let profile = `** SPY PROFILE! Do NOT DISTRIBUTE! **


  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(12);
  textAlign(LEFT, TOP);
  fill(255);
  text(profile, 50, 50);

  pop();
}
