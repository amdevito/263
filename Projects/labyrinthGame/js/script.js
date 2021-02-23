"use strict";

/*****************
Project One: Labyrinth GO (the game)
By: Alana DeVito

You are the main character from the movie the Labyrinth.
You find out your brother, Toby has disappeared and need to search the labyrinth for characters and items in order to find the Goblin King, Jareth and get your baby brother, Toby back!

- states to follow the different levels

- must collect the correct items with out finding a game over item (remembering patterns?)

- a story line and image pops at each state change to give directions
- you choose what to look for in the dropdown (different at each level)
- you must walk around your space until the item pops up on your screen
- after catching a specific number of chanracters and items you meet the Goblin king and rescue Toby!

******************/
//set state
let state = "scene_One";

let scene = ``;

// The game profile data while the program is running
let labyrinthProfile = {
  name: ``,
  searchLocation: `----------`, //search a place in that scene
  charactersCollected: 0, //number of audio gems Collected
  itemsCollected: 0,
  currentLocation: ``, ///geolocation - fetch lat and long - not yet active, just placeholder for now
  currentScene: 0,
  // huntMethod: `----------`, //
  selection: `----------`, ///current type of search - item or character
  // currentHuntHood: `----------`, //neighbourhood determined by geolocation
  password: ``, // save the user's password entered in prompt.
  // huntAddress: ``, ///where you are going to find the audio gem (shown just in mockup prototype) this is where the user is led - currently it just shows the name of the AudioGem that the user is hunting.
  hiddenThingFound: ``, // name of thing hidden in that scene name is like 'sceneThree_checkGround_character'
};
// Variables to store JSON data for generating the profile

// let audioScapeData = undefined;

let gameData = undefined;

// let homeHoodData = undefined;

let charactersCollectedData = 0;
let itemsCollectedData = 0;

let currentLocationData = undefined;
// let currentHuntHoodData = undefined;

//arrays for audioGem types and audio hunt types - access for random selections.
// let audioGems = ["Interview", "Story", "Playlist", "User created"];
// let huntType = [
//   "Mystery walk w/ audio cue",
//   "Direct me with voice",
//   "Map only",
// ];
// let types = ["Character", "Item",];

let searchLocation = {
  one: ``,
  two: ``,
  three: ``,
  four: ``,
};

let whatType = {
  one: `Character`,
  two: `Item`,
};

let inputBox = {
  name: {
    r: 255,
    g: 255,
    b: 255,
  },
  collectedCharacters: {
    r: 255,
    g: 255,
    b: 255,
  },
  collectedItems: {
    r: 255,
    g: 255,
    b: 255,
  },
  geolocation: {
    r: 255,
    g: 255,
    b: 255,
  },
  current: {
    r: 255,
    g: 255,
    b: 255,
  },
};

let inputBoxStroke = {
  name: 255,
  collected: 255,
  geolocation: 255,
  current: 255,
  hunting: 255,
};
// let hiddenThingFoundData = undefined; /// ??? the name of the the hidden thing you find - shown as just the title of the item or character

let searchItemFound = undefined; ///title of the item/character found from the JSON file

let labyrinthBanner = undefined; // set app banner image variable

///variables for user inputs

let userInputLocation = undefined; //user enters where they want to search in the scene
let userInputSelection = undefined; //randomized if choice is random, else user enter soundscape, interview, story, playlist or user created.
// let userInputHuntMethod = undefined; //choices are : Mystery walk (listen to a ambient playlist with abstract audio direction only. A audio signal will get louder or quieter as you get closer to an item.) Direct me with words. Show me a map. ( please be careful).

// buttons variables
let seeMapButton = undefined; //click to show the audiogems on a map (not active in mock up).

function preload() {
  labyrinthBanner = loadImage(`assets/images/labyrinthBanner.png`); //load the banner image into the labyrinthBanner variable

  gameData = loadJSON(`assets/data/location_data.json`); //load the JSON file containing the neighbourhood audioGem titles, sorted by types and neighbourhood.
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile.
*/
function setup() {
  // Create the canvas
  createCanvas(375, 667); //size of iphone 6/7/8 - mobile first then make responsive to other shapes and sizes.

  //

  //commented out below because it was causing issues on first visit.
  //will revisit when I explore further.
  // let savedProfile = localStorage.getItem(`labyrinth-profile-data`); //set prior information from the local storage into the savedProfile variable
  //
  // //set labyrinthProfile as the savedProfile recived in localStorage.getItem
  // labyrinthProfile = JSON.parse(savedProfile);

  //

  //create button

  seeMapButton = createButton("See the Labyrinth");
  seeMapButton.position(250, 120); //located at upper right corner
  seeMapButton.mousePressed(sendMapButton); //call a function when mouse is pressed
  seeMapButton.size(105, 50);

  ///When above information is submitted the data fills the coloured boxes in the app.

  // Check of there is a saved profile and try to load the data
  let data = JSON.parse(localStorage.getItem(`labyrinth-profile-data`));
  if (data !== null) {
    let name = prompt(`What is your user name? Or type "create new"`); //enter user name or ask to create new one
    if (name === `create new`) {
      generateLabyrinthProfile(); //create new profile
    } else {
      let password = prompt(`What is your password? Or type "create new"`);
      if (password === data.password && name === data.name) {
        labyrinthProfile.name = data.name;
        labyrinthProfile.searchLocation = data.searchLocation;
        labyrinthProfile.charactersCollected = data.charactersCollected;
        labyrinthProfile.currentScene = data.currentScene;
        labyrinthProfile.itemsCollected = data.itemsCollected;
        // labyrinthProfile.huntMethod = data.huntMethod;
        labyrinthProfile.selection = data.selection;
      } else if (
        (password !== data.password && name !== data.name) ||
        (name === data.name && password !== data.password) ||
        (name !== data.name && password === `create new`)
      ) {
        //if password and usernames dont match one on file, generate new profile.
        generateLabyrinthProfile();
      }
    }
  } else {
    generateLabyrinthProfile();
  }
}

/**
Assigns across the profile properties from the data to the current profile
*/
function generateLabyrinthProfile() {
  labyrinthProfile.name = prompt(`What is your name?`); //prompt answer saved into the variable
  labyrinthProfile.password = prompt(`Please create a password.`); //prompt answer saved into the variable

  localStorage.setItem(
    `labyrinth-profile-data`,
    JSON.stringify(labyrinthProfile)
  );
  //localStorage is the object that knows how to save things
  //setItem is the method that does the saving
  //'labyrinth-profile-data' is the key
  //stringify the thing you want to save
}

function draw() {
  background(0);

  //different states for the different scenes/levels and win or lose screens
  if (state === `enter`) {
    enter();
  } else if (state === `scene_One`) {
    sceneOne();
  } else if (state === `scene_Two`) {
    sceneTwo();
  } else if (state === `scene_Three`) {
    sceneThree();
  } else if (state === `scene_Four`) {
    sceneFour();
  } else if (state === `scene_Five`) {
    sceneFive();
  } else if (state === `win`) {
    win();
  } else if (state === `lose`) {
    lose();
  }

  inputBoxes();

  //profle text with changing data in the template literals
  let profile = `
  Name:
    ${labyrinthProfile.name}

  Where would you like to search?


  Characters Collected:
    ${labyrinthProfile.charactersCollected}
  Items Collected:
    ${labyrinthProfile.itemsCollected}

  My Geolocation:
    ${labyrinthProfile.currentLocation}

  What are you looking for?



    Current Scene: ${labyrinthProfile.currentScene}

    Item Found:
    ${labyrinthProfile.hiddenThingFound}



`;
  // REMOVED FROM THE PROFILE VARIABLE ABOVE
  // How would you like to hunt?
  //
  //
  // My Current Hunt:
  //   ${labyrinthProfile.huntMethod} to ${labyrinthProfile.selection}
  //   in ${labyrinthProfile.searchLocation}
  //
  // Currently Hunting:
  //   ${labyrinthProfile.hiddenThingFound}
  //
  //display the text along with the design banner at the top
  push();
  image(labyrinthBanner, 0, 0);
  textFont(`American Typewriter`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0, 139, 140);
  text(profile, 10, 100);

  pop();
}

//NOTE: User must do the audio gem last for the 'currently hunting' section to update to the correct audioGem destination. Will need to look into this.

//take dropdown selection from Hunt neighbourhood and set it to labyrinthProfile.homeHood.
//save in local storage and reset the dropdown menu to Choose...
function sendSearchLocation() {
  labyrinthProfile.searchLocation = userInputLocation.value();

  // userInputLocation.value("");
  localStorage.setItem(
    `labyrinth-profile-data`,
    JSON.stringify(labyrinthProfile)
  );
  // userInputLocation.value(`Choose where you would like to hunt.`);
}
//take dropdown selection from Hunt method and set it to labyrinthProfile.huntMethod.
//save in local storage and reset the dropdown menu to Choose...
// function sendHuntMethod() {
//   labyrinthProfile.huntMethod = userInputHuntMethod.value();
//
//   if (labyrinthProfile.huntMethod === `Random`) {
//     labyrinthProfile.huntMethod = random(huntType); //if RANDOM, fetch random selection from the huntType array
//     userInputHuntMethod.value(`Choose the method or randomize.`);
//   } else {
//     // userInputHuntMethod.value(`Choose the method or randomize.`);
//   }
//   localStorage.setItem(
//     `labyrinth-profile-data`,
//     JSON.stringify(labyrinthProfile)
//   );
// }
function sendSelection() {
  labyrinthProfile.selection = userInputSelection.value();

  // if (labyrinthProfile.selection === `Random`) {
  //   labyrinthProfile.selection = random(audioGems); //if RANDOM, fetch random selection from the audioGems array
  //   userInputSelection.value(`Choose the type or randomize.`);
  // } else {
  //   // userInputSelection.value(`Choose the type or randomize.`);
  // }

  for (let i = 0; i < gameData.location_finds.length; i++) {
    //go through the JSON data set with the for loop and find the user's  selection for their scene location
    if (gameData.location_finds[i].scene === labyrinthProfile.searchLocation) {
      gameData.location_finds[i][labyrinthProfile.selection];
      labyrinthProfile.hiddenThingFound = random(
        gameData.location_finds[i][
          labyrinthProfile.selection.toLowerCase() //set to lower case so that the if statement will match
        ]
      );
    }
  }
  labyrinthProfile.charactersCollected++; //for now just add a gem once you choose oneto search for. Will change to add one when the user actually enters that location.
  labyrinthProfile.itemsCollected++;
  localStorage.setItem(
    `labyrinth-profile-data`,
    JSON.stringify(labyrinthProfile)
  ); //store the number of gems the user collects.
}

function sendMapButton() {} /// Not currently active. Eventually this will bring up a small map showing the location of the audioGems to hunt for.

function sceneOne() {
  /// sarah'e bedroom - find goblins, snake, goblin king, clock
  //user choose their search location in that scene

  dropMenus();
  labyrinthProfile.currentScene = 1;
  //assign locations specific to this scene
  searchLocation.one = `under bed`;
  searchLocation.two = `behind curtain`;
  searchLocation.three = `in bookshelf`;
  searchLocation.four = `in closet`;
}

function sceneTwo() {
  //at the entrance of labyrinth - find hoggle [behind tree], faeries[under rock], bracelet [on ground], 'hello' caterpillar[at wall]
  //user choose their search location in that scene
  dropMenus();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `check wall`;
  searchLocation.two = `check ground`;
  searchLocation.three = `behind tree`;
  searchLocation.four = `under rock`;
}

function sceneThree() {
  ///2 characters guarding doors that lie. 'certain death!'  - collect the doom stones (the faces that say, 'turnback!!'), a lamp and the helping hands
  //user choose their search location in that scene
  dropMenus();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `check door one`;
  searchLocation.two = `check door two`; // locked in the obliette, game over
  searchLocation.three = `check left corridor`;
  searchLocation.four = `check right corridor`;
}

function sceneFour() {
  // dark forest - collect the posion peach, the orange dancing bouncing head characters,
  //user choose their search location in that scene
  dropMenus();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `look around tree`; //ludo
  searchLocation.two = `look in bush`; ///dancing characters
  searchLocation.three = `look in dark tunnel`; /// get thrown into the bog of eternal stench and game over
  searchLocation.four = `climb tree`; //posion peach
}

function sceneFive() {
  //final labyrinth -
  //user choose their search location in that scene
  dropMenus();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `climb up stairs`; //fall in love with Jareth game over
  searchLocation.two = `go down stairs`; //run out of time game over
  searchLocation.three = `go through doorway`; //meet Jareth and beat him [you win] (must enter the correct passage from the book 'you have no power over me')
  searchLocation.four = `jump off ledge`; //get Toby [you win]
}

function dropMenus() {
  //drop down menus
  //user choose their search location
  userInputLocation = createSelect(); //create dropdown menu with p5.js function
  userInputLocation.position(22, 210); ///where on app
  userInputLocation.option("Location in Scene.");
  userInputLocation.option(searchLocation.one);
  userInputLocation.option(searchLocation.two);
  userInputLocation.option(searchLocation.three);
  userInputLocation.option(searchLocation.four);
  userInputLocation.changed(sendSearchLocation); // create action after the input drop down is changed - send to / call the sendSearchLocation function.

  //choose what to search> Character or item
  userInputSelection = createSelect();
  userInputSelection.position(22, 430);
  userInputSelection.option("Character? or Item?");
  userInputSelection.option(whatType.one);
  userInputSelection.option(whatType.two);
  userInputSelection.changed(sendSelection); // create action after the input drop down is changed - send to / call the sendSelection function.
  //

  //NOT changing the searching methods, so this can be removed.
  // //choose their hunt method
  // userInputHuntMethod = createSelect(); //create dropdown menu with p5.js function
  // userInputHuntMethod.position(133, 500);
  // userInputHuntMethod.option("Choose the method or randomize.");
  // userInputHuntMethod.option("Random");
  // userInputHuntMethod.option("Mystery walk w/ audio cue");
  // userInputHuntMethod.option("Direct me with voice");
  // userInputHuntMethod.option("Map only");
  // userInputHuntMethod.changed(sendHuntMethod); // create action after the input drop down is changed - send to / call the sendHuntMethod function.
}

function inputBoxes() {
  //coloured boxes behind data entered information.
  //name box
  push();
  fill(inputBox.name.r, inputBox.name.g, inputBox.name.b);
  stroke(253, 132, 0);
  rect(22, 138, 200, 20, 6);
  pop();

  //characters tally box
  push();
  fill(
    inputBox.collectedCharacters.r,
    inputBox.collectedCharacters.g,
    inputBox.collectedCharacters.b
  );
  stroke(253, 132, 0);
  rect(22, 257, 100, 20, 6);
  pop();

  //items tally box
  push();
  fill(
    inputBox.collectedItems.r,
    inputBox.collectedItems.g,
    inputBox.collectedItems.b
  );
  stroke(253, 132, 0);
  rect(22, 297, 100, 20, 6);

  pop();

  //my geolocation box
  push();
  fill(inputBox.geolocation.r, inputBox.geolocation.g, inputBox.geolocation.b);
  stroke(253, 132, 0);
  rect(22, 360, 100, 20, 6);

  pop();

  // Story line BOX.
  push();
  fill(inputBox.current.r, inputBox.current.g, inputBox.current.b);
  stroke(253, 132, 0);
  rect(22, 475, 330, 158, 6);
  pop();

  // //Currently Hunting box  -- eventually these will change colour when changed in THIS session.
  // push();
  // fill(inputBox.hunting);
  // stroke(253, 132, 0);
  // rect(22, 619, 335, 19, 6);
  //
  // pop();
}
