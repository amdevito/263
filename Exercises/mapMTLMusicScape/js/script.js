"use strict";

/*****************
E3: Spy Profile Generator PLUS -- Mapping the Montreal Musicscape, An Interactive AudioCast.
By: Alana DeVito
-- an audio scavenger hunt APP
--- walk through the city listening to an ambient soundscape until you enter certain locations. A cue sound indicates that you are getting close and the closer (will get louder and more frequent as you get closer to the 'audioGem')

(This is only a Mock Up using location relative to the user's starting point. Eventually these will be connected to specific neighbourhood locations in Montreal.)
- although you must go to these locations to initially find the items, once found you can access them again from anywhere (they are saved to your local storage in your profile. you can also reset your storage to start fresh.)

Brief:
- *Create the design of the application for a mobile app (improve the mobile display)
- Add the ability to delete the current profile data with a keyboard command or button (reset) QUESTION  - how to do this?
- *store the items you searched for at each visit
- *Allow the user to selectively regenerate specific categories in the profile using drop down menues.
  - they choose the type of audio they would like to hunt for, the location and the method that they would like to do the hunting.
      - Choose:
      Random
      Soundscape
      Interview
      Story
      Playlist
      User Created
      -How would you like to find it?
      Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.)
      Direct me with words.
      Show me a map. ( please be careful).

- Enter your name and password, if you type 'create new' then you are asked to create them.
- If they do not match what is already on file, the system will just ask you to generate a new one.
- *  audio gems collected should read 0 at first unless old profile is pulled up x - every time you activate a new audio gem search you add a gem to your tally (eventually this will only be added when you actually hunt and find the audio gem in that location).

Next steps...
- geolocation data: https://editor.p5js.org/shiffman/sketches/HkQ8kMdee

******************/

// The audio scape  profile data while the program is running
let mmMapProfile = {
  //change to montrealMuMapProfile
  name: ``,
  homeHood: ``, //my neighbourhood - this is the prompt instead of password.
  audioGemsCollected: 0, //number of audio gems Collected
  currentLocation: ``, ///geolocation - fetch lat and long
  huntMethod: ``,
  selection: ``, ///current gem hunt: --if choose random, generate randomly, else, choose in app, not in prompt
  currentHuntHood: ``, //neighbourhood determined by geolocation
  password: ``,
  huntAddress: "", ///where you are going to find the audio gem (shown just in mockup prototype) this is where the user is led.
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

  let savedProfile = localStorage.getItem(`mmMap-profile-data`);

  mmMapProfile = JSON.parse(savedProfile);

  //

  //drop down menues
  userInputHomeHood = createSelect();
  userInputHomeHood.position(110, 245);
  userInputHomeHood.option("Choose where you would like to hunt.");
  userInputHomeHood.option("Plateau Mont Royal Outremont");
  userInputHomeHood.option("Villeray and Rosemont");
  userInputHomeHood.option("Ville Marie");
  userInputHomeHood.option("NDG CDN");
  userInputHomeHood.option("Hochelaga Maisonneuve");
  userInputHomeHood.option("Sud Ouest");
  userInputHomeHood.changed(sendHomeHood); // to create action after the input drop down is changed.

  userInputHuntMethod = createSelect();
  userInputHuntMethod.position(130, 420);
  userInputHuntMethod.option("Choose the method or randomize.");
  userInputHuntMethod.option("Random");
  userInputHuntMethod.option("Mystery Walk w/ Audio Cue");
  userInputHuntMethod.option("Direct me with voice");
  userInputHuntMethod.option("Map only");
  userInputHuntMethod.changed(sendHuntMethod); // to create action after the input drop down is changed.

  userInputSelection = createSelect();
  userInputSelection.position(149, 480);
  userInputSelection.option("Choose the type or randomize.");
  userInputSelection.option("Random");
  userInputSelection.option("Interview");
  userInputSelection.option("Story");
  userInputSelection.option("Playlist");
  userInputSelection.option("User Created"); //to find gems left by other users.< will need to be monitored. will be rated by other users.
  userInputSelection.changed(sendSelection); // to create action after the input drop down is changed.

  //input submit buttons

  seeMapButton = createButton("See MMMAP");
  seeMapButton.position(250, 115); //located above the input box
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
  mmMapProfile.name = prompt(`What is your name?`);
  mmMapProfile.password = prompt(`Please create a password.`);

  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
  //localStorage is the object that knows how to save things
  //setItem is the method that does the saving
  //'mmMap-profile-data' is the key
  //stringify the thing you want to save
}

function draw() {
  background(0);
  //coloured boxes behind data entered information.
  //name box - blue
  push();
  fill(35, 184, 198, 200);
  stroke(255);
  rect(22, 177, 200, 20, 6);
  pop();
  //audio gems tally box - pink

  push();
  fill(250, 72, 138, 200);
  stroke(255);
  rect(22, 297, 100, 20, 6);

  pop();

  //my geolocation box - orange

  push();
  fill(188, 250, 100, 177);
  stroke(255);
  rect(22, 358, 200, 20, 6);

  pop();

  //Your Hunt details - pink -- eventually these will change colour when changed in THIS session.
  push();
  fill(250, 72, 138, 200);
  stroke(255);
  rect(22, 536, 335, 45, 6);
  pop();

  //my currently hunting box - green -- eventually these will change colour when changed in THIS session.

  push();
  fill(240, 183, 48, 200);
  stroke(255);
  rect(22, 619, 335, 19, 6);

  pop();

  let profile = `
  AudioCast Profile

  Name:
    ${mmMapProfile.name}

  Hunt Neighbourhood:


  Audio Gems Collected:
    ${mmMapProfile.audioGemsCollected}

  My Geolocation (coming soon!):
    ${mmMapProfile.currentLocation}

  How would you like to hunt?


  What kind of audio gem are you hunting?


  My Current Hunt:
    ${mmMapProfile.huntMethod}   TO
    ${mmMapProfile.selection}  IN  ${mmMapProfile.homeHood}

  Currently Hunting:
    ${mmMapProfile.huntAddress}`;

  push();
  image(mmmBanner, 0, 0);
  textFont(`Tahoma`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255);
  text(profile, 10, 100);

  pop();
}

//take dropdown selection from Hunt neighbourhood and set it to mmMapProfile.homeHood.
//save in local storgae and reset the dropdown menu to Choose...
function sendHomeHood() {
  mmMapProfile.homeHood = userInputHomeHood.value();
  userInputHomeHood.value("");
  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
  userInputHomeHood.value(`Choose where you would like to hunt.`);

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
  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
}
function sendSelection() {
  mmMapProfile.selection = userInputSelection.value();

  if (mmMapProfile.selection === `Random`) {
    mmMapProfile.selection = random(audioGems);
    userInputSelection.value(`Choose the type or randomize.`);
  } else {
    userInputSelection.value(`Choose the type or randomize.`);
  }

  for (let i = 0; i < audioScapeData.location_audioGems.length; i++) {
    if (
      audioScapeData.location_audioGems[i].neighbourhood ===
      mmMapProfile.homeHood
    ) {
      audioScapeData.location_audioGems[i][mmMapProfile.selection];
      mmMapProfile.huntAddress = random(
        audioScapeData.location_audioGems[i][
          mmMapProfile.selection.toLowerCase()
        ]
      );
    }
  }
  mmMapProfile.audioGemsCollected++; //for now just add a gem once you choose one
  localStorage.setItem(`mmMap-profile-data`, JSON.stringify(mmMapProfile));
}

function sendMapButton() {} /// Not currently active. Eventually this will bring up a small map showing the location of the audioGems to hunt for.
