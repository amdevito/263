"use strict";

/*****************
Spy Profile Generator
Alana

Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again.
Uses:
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
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
};
// Variables to store JSON data for generating the profile
let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
Loads the JSON data used to generate the profile
*/
function preload() {
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
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
  createCanvas(windowWidth, windowHeight);

  generateSpyProfile();
  // Try to load the data
  // let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
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
  background(255);

  let profile = `** SPY PROFILE! Do NOT DISTRIBUTE! **


  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon};
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 100, 100);

  pop();
}
