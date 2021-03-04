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
      -  or must move around before the next scene starts
- after catching a specific number of chanracters and items you meet the Goblin king and rescue Toby!

******************/
//set state
let state = "enter";

let lat;
let long;

let scene = ``;

let currentAnswer = ``;

// The game profile data while the program is running
let labyrinthProfile = {
  name: ``,
  searchLocation: `----------`, //search a place in that scene
  charactersCollected: 0, //change back to zero once testing is done
  itemsCollected: 0,
  // currentLocationLat: ``, ///geolocation - fetch lat and long -
  // currentLocationLong: ``, ///geolocation - fetch lat and long -
  currentScene: 0,
  selection: `----------`, ///current type of search - item or character
  password: ``, // save the user's password entered in prompt.
  hiddenThingFound: ``, // name of thing hidden in that scene name is like 'sceneThree_checkGround_character'
};
// Variables to store JSON data for generating the profile

let gameData = undefined;

//button variables
let buttonXPosition = 250;
let buttonYPosition = 120;
let buttonXSize = 105;
let buttonYSize = 50;

let enterIntroInfo = undefined;
let enterOneInfo = undefined;
let enterTwoInfo = undefined;
let enterThreeInfo = undefined;
let enterFourInfo = undefined;
let enterFiveInfo = undefined;

let sceneOneIntroImage = undefined;
let sceneTwoIntroImage = undefined;
let sceneThreeIntroImage = undefined;
let sceneFourIntroImage = undefined;
let sceneFiveIntroImage = undefined;

let loseImage = undefined;

let winInfo = undefined;
let winImage = undefined;

let charactersCollectedData = 0;
let itemsCollectedData = 0;

let realLocationData = undefined; //actual lat and long of user [ in real world]

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

let dropMenuLocation = {
  x: 22,
  y: 210,
  xv: 1,
  yv: 1,
};

let dropMenuSelection = {
  x: 22,
  y: 430,
  xv: 1,
  yv: 1,
};

// let hiddenThingFoundData = undefined; /// ??? the name of the the hidden thing you find - shown as just the title of the item or character

let searchItemFound = undefined; ///title of the item/character found from the JSON file

let labyrinthBanner = undefined; // set app banner image variable

let labyrinthTrickMap = undefined; ///in the labyrinth, nothing is what it seems!
///variables for user inputs

let userInputLocation = undefined; //user enters where they want to search in the scene
let userInputSelection = undefined; //is user looking for an item or character?
// buttons variables
let seeMapButton = undefined; //click to show the labyrinth (just a trick! an optical illusion! - it should say- 'IN THE LABYRINTH, NOTHING IS WHAT IT SEEMS!')
let nextSceneButton = undefined;
let nothingIsAsItSeemsButton = undefined;
let advanceToScene = undefined;
let loseRestartButton = undefined;
let figthJarethButton = undefined;

let winEndInfo = undefined;
let winEndImage = undefined;

function preload() {
  labyrinthBanner = loadImage(`assets/images/labyrinthBanner.png`); //load the banner image into the labyrinthBanner variable
  labyrinthTrickMap = loadImage(`assets/images/labyrinthBackground.jpg`); //load the optical illusion labyrinth trick map

  ///typing gifs with each scene's storyline typing out : from http://wigflip.com/minifesto/

  enterIntroInfo = loadImage(`assets/images/enterIntroInfo.gif`); //load the optical illusion labyrinth trick map
  enterOneInfo = loadImage(`assets/images/enterOneInfo.gif`); //load the optical illusion labyrinth trick map
  enterTwoInfo = loadImage(`assets/images/enterTwoInfo.gif`); //load the optical illusion labyrinth trick map
  enterThreeInfo = loadImage(`assets/images/sceneThreeInfo.gif`); //load the optical illusion labyrinth trick map
  enterFourInfo = loadImage(`assets/images/enterFourInfo.gif`); //load the optical illusion labyrinth trick map
  enterFiveInfo = loadImage(`assets/images/enterFiveInfo.gif`); //load the optical illusion labyrinth trick map
  winInfo = loadImage(`assets/images/winInfo.gif`); //load the optical illusion labyrinth trick map

  sceneOneIntroImage = loadImage(`assets/images/sceneOneIntroImage.jpg`); //load the optical illusion labyrinth trick map
  sceneTwoIntroImage = loadImage(`assets/images/sceneTwoIntroImage.jpg`); //load the optical illusion labyrinth trick map
  sceneThreeIntroImage = loadImage(`assets/images/sceneThreeIntroImage.jpg`); //load the optical illusion labyrinth trick map
  sceneFourIntroImage = loadImage(`assets/images/sceneFourIntroImage.jpg`); //load the optical illusion labyrinth trick map
  sceneFiveIntroImage = loadImage(`assets/images/sceneFiveIntroImage.jpg`); //load the optical illusion labyrinth trick map
  loseImage = loadImage(`assets/images/sceneOneIntroImage.jpg`); //load the optical illusion labyrinth trick map
  winImage = loadImage(`assets/images/winImage.jpg`); //load the optical illusion labyrinth trick map

  winEndInfo = loadImage(`assets/images/winEndInfo.gif`);
  winEndImage = loadImage(`assets/images/winEndImage.jpg`);

  gameData = loadJSON(`assets/data/location_data.json`); //load the JSON file containing the neighbourhood audioGem titles, sorted by types and neighbourhood.

  realLocationData = getCurrentPosition();
}

function setup() {
  // Create the canvas
  createCanvas(375, 667); //size of iphone 6/7/8 - mobile first then make responsive to other shapes and sizes.

  //check if geolocation is available
  if (geoCheck() == true) {
    //geolocation is available -
  } else {
    //error getting geolocation
  }

  //voice recognition for line to beat Jareth. **START HERE***
  if (annyang) {
    let commands = {
      "You have no power over *who": guessLine,
    };
    annyang.addCommands(commands);
    annyang.start();
  }

  // sceneOne(); //only temporary - put back after - call function scene one gets called

  watchPosition(positionChanged);

  console.log(realLocationData.latitude);
  console.log(realLocationData.longitude);
  console.log(realLocationData.accuracy);
  console.log(realLocationData.altitude);
  console.log(realLocationData.altitudeAccuracy);
  console.log(realLocationData.heading);
  console.log(realLocationData.speed);

  ///When above information is submitted the data fills the white boxes in the app.

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
    enterIntro();
  } else if (state === `enter_scene_One`) {
    enterOne();
  } else if (state === `scene_One`) {
    mainProfilePage();
    // sceneOne();
  } else if (state === `enter_scene_Two`) {
    enterTwo();
    // buttonRemover();
  } else if (state === `scene_Two`) {
    mainProfilePage();

    // sceneTwo();
  } else if (state === `enter_scene_Three`) {
    enterThree();
  } else if (state === `scene_Three`) {
    mainProfilePage();
    // sceneThree();
  } else if (state === `enter_scene_Four`) {
    enterFour();
  } else if (state === `scene_Four`) {
    mainProfilePage();
    // sceneFour();
  } else if (state === `enter_scene_Five`) {
    enterFive();
  } else if (state === `scene_Five`) {
    mainProfilePage();
    nextSceneButton.remove();
    // sceneFive();
  } else if (state === `win`) {
    win();
  } else if (
    state === `map` ||
    state === `map1` ||
    state === `map2` ||
    state === `map3` ||
    state === `map4` ||
    state === `map5`
  ) {
    trickMapImage();
  }

  console.log(state);
}

//save in local storage and reset the dropdown menu to Choose...
function sendSearchLocation() {
  labyrinthProfile.searchLocation = userInputLocation.value();

  console.log(labyrinthProfile.searchLocation);
}

function profileMainPage() {
  advanceToScene.remove();
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




  What are you looking for?



    Current Scene: ${labyrinthProfile.currentScene}

    Item Found:
    ${labyrinthProfile.hiddenThingFound}



`;

  //display the text along with the design banner at the top
  push();
  image(labyrinthBanner, 0, 0);
  textFont(`American Typewriter`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0, 139, 140);
  text(profile, 10, 100);

  pop();

  let geolocationProfile = `
My Geolocation:
 Lat: ${labyrinthProfile.currentLocationLat}
 Long: ${labyrinthProfile.currentLocationLong}
    `;
  push();

  textFont(`American Typewriter`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0, 139, 140);
  text(geolocationProfile, 22, 300);

  pop();

  ///if state 'find' show button - 'click to collect' - else - 'go to next scene'
}

///say line, check if right line:
function guessLine(who) {
  currentAnswer = who;
  if (currentAnswer.toLowerCase() === `me`) {
    winEnd();
  }
}
///FETCHING JSON INFO

function sendSelection() {
  labyrinthProfile.charactersCollected = 5; //take away after testing done
  labyrinthProfile.itemsCollected = 5; //take away after testing done

  console.log(labyrinthProfile.charactersCollected, `characters`);
  console.log(labyrinthProfile.itemsCollected, `items`);
  console.log(gameData);
  console.log(labyrinthProfile.searchLocation);
  console.log(labyrinthProfile.selection);

  labyrinthProfile.selection = userInputSelection.value().toLowerCase();

  ///logic to fetchJSON
  //LEVEL ONE
  if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `under bed`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`under bed`][0];
    labyrinthProfile.charactersCollected++;
    console.log(gameData.location_finds[0][`under bed`][0]); ///first [0] refers to the scene, [location in the scene], [0] - character, [1] - item
    //
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `under bed`
  ) {
    //
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`under bed`][1];

    /////
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `behind curtain`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`behind curtain`][0];
    labyrinthProfile.charactersCollected++;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `behind curtain`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`behind curtain`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `in bookshelf`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`in bookshelf`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `in bookshelf`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`in bookshelf`][1];
    labyrinthProfile.itemsCollected++;
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `in closet`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`in closet`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `in closet`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[0][`in closet`][1];
    labyrinthProfile.itemsCollected++;
  }
  ///sceneTwo
  else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `under rock`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`under rock`][0];
    labyrinthProfile.charactersCollected++;
    console.log(gameData.location_finds[1][`under rock`][0]); ///first [0] refers to the scene, [location in the scene], [0] - character, [1] - item
    //
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `under rock`
  ) {
    //
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`under rock`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `behind tree`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`behind tree`][0];
    labyrinthProfile.charactersCollected++;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `behind tree`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`behind tree`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check wall`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`check wall`][0];
    labyrinthProfile.charactersCollected++;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check wall`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`check wall`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check ground`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`check ground`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check ground`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[1][`check ground`][1];
    labyrinthProfile.itemsCollected++;
  }
  ///sceneThree
  else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check left corridor`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check left corridor`][0];
    labyrinthProfile.charactersCollected++;
    console.log(gameData.location_finds[2][`check left corridor`][0]); ///first [0] refers to the scene, [location in the scene], [0] - character, [1] - item
    //
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check left corridor`
  ) {
    //
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check left corridor`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check door one`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check door one`][0];
    youLoseButton(); // state = `lose`;//lose buttons FILL this section and say GAME OVER - RESTART and try again!

    // advanceToScene.remove();
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check door one`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check door one`][1];
    youLoseButton(); // state = `lose`;//lose buttons FILL this section and say GAME OVER - RESTART and try again!

    // advanceToScene.remove();
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check right corridor`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check right corridor`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check right corridor`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check right corridor`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `check door two`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check door two`][0];
    labyrinthProfile.itemsCollected++;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `check door two`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[2][`check door two`][1];
  }
  ///sceneFour
  else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `look around tree`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look around tree`][0];
    labyrinthProfile.charactersCollected++;
    console.log(gameData.location_finds[3][`look around tree`][0]); ///first [0] refers to the scene, [location in the scene], [0] - character, [1] - item
    //
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `look around tree`
  ) {
    //
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look around tree`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `look in bush`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look in bush`][0];
    labyrinthProfile.charactersCollected++;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `look in bush`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look in bush`][1];
    // state = `lose`;//lose buttons FILL this section and say GAME OVER - RESTART and try again!
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `look in dark tunnel`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look in dark tunnel`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `look in dark tunnel`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`look in dark tunnel`][1];
    //game over button - restart game
    youLoseButton();

    // advanceToScene.remove();
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `climb tree`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`climb tree`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `climb tree`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[3][`climb tree`][1];
    youLoseButton();
    //make button to send you back one level
  }
  ///sceneFive
  else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `climb up stairs`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`climb up stairs`][0];
    youLoseButton();

    // advanceToScene.remove();
    console.log(gameData.location_finds[4][`climb up stairs`][0]); ///first [0] refers to the scene, [location in the scene], [0] - character, [1] - item
    //
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `climb up stairs`
  ) {
    //
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`climb up stairs`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `go down stairs`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`go down stairs`][0];
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `go down stairs`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`go down stairs`][1];
    youLoseButton();

    // advanceToScene.remove();
    // state = `lose`;//lose buttons FILL this section and say GAME OVER - RESTART and try again!
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `go through doorway` &&
    labyrinthProfile.charactersCollected >= 5 &&
    labyrinthProfile.itemsCollected >= 5
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`go through doorway`][0];
    faceJarethButton();

    //add && labyrinthProfile.charactersCollected + labyrinthProfile.itemsCollected === 14 - screen change to winscreen: Jareth and 'Say the special phrase to win'
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `go through doorway` &&
    labyrinthProfile.charactersCollected < 5 &&
    labyrinthProfile.itemsCollected < 5
  ) {
    youLoseButton();
    labyrinthProfile.hiddenThingFound = `You didn't collect enough characters\n     or items. Start over and try again.`;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `go through doorway`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`go through doorway`][1];
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `jump off ledge` &&
    labyrinthProfile.charactersCollected >= 5 &&
    labyrinthProfile.itemsCollected >= 5
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`jump off ledge`][0];
    faceJarethButton();
    //add && labyrinthProfile.charactersCollected + labyrinthProfile.itemsCollected === 14 - screen change to winscreen: Jareth and 'Say the special phrase to win'
  } else if (
    labyrinthProfile.selection === `character` &&
    labyrinthProfile.searchLocation === `jump off ledge` &&
    labyrinthProfile.charactersCollected < 5 &&
    labyrinthProfile.itemsCollected < 5
  ) {
    youLoseButton();
    labyrinthProfile.hiddenThingFound = `You didn't collect enough characters\n     or items. Start over and try again.`;
  } else if (
    labyrinthProfile.selection === `item` &&
    labyrinthProfile.searchLocation === `jump off ledge`
  ) {
    labyrinthProfile.hiddenThingFound =
      gameData.location_finds[4][`jump off ledge`][1];
    youLoseButton();

    // advanceToScene.remove();
  }
}

function sendMapButton() {
  if (state === `scene_One`) {
    state = `map1`;
    // trickMap();
  } else if (state === `scene_Two`) {
    state = `map2`;
    // trickMap();
  } else if (state === `scene_Three`) {
    state = `map3`;
    // trickMap();
  } else if (state === `scene_Four`) {
    state = `map4`;
    // trickMap();
  } else if (state === `scene_Five`) {
    state = `map5`;
    // trickMap();
  }

  buttonRemover();
  trickMap();
  // userInputLocation.remove();
  // userInputSelection.remove();
  // nextSceneButton.remove();
}

function buttonRemover() {
  console.log(`button remover`);
  userInputLocation.remove();
  userInputSelection.remove();
  nextSceneButton.remove();
  seeMapButton.remove();
}

function buttonMaker() {
  console.log(`button maker`);
  nextSceneButton = createButton("Done Searching, Go to Next Scene");
  seeMapButton = createButton("See the Labyrinth"); ///make a function for the button creation
  loseRestartButton = createButton("You lose. Try again?");
  figthJarethButton = createButton("FACE JARETH TO WIN");
}

function youLoseButton() {
  nextSceneButton.remove();
  buttonRemover();

  loseRestartButton.position(30, 580); //located at bottom center
  loseRestartButton.mousePressed(returnToStart); //call a function when mouse is pressed
  loseRestartButton.size(315, 40);
}

function returnToStart() {
  state = `enter_scene_One`;
  loseRestartButton.remove();
  buttonRemover();
  introAdvanceButton();
  labyrinthProfile.hiddenThingFound = ``; //clear item found part
  labyrinthProfile.itemsCollected = 0;
  labyrinthProfile.charactersCollected = 0;
}

//for the win
function faceJarethButton() {
  // nextSceneButton.remove();
  buttonRemover();

  figthJarethButton.position(30, 580); //located at bottom center
  figthJarethButton.mousePressed(returnFaceJareth); //call a function when mouse is pressed
  figthJarethButton.size(315, 40);
}

function returnFaceJareth() {
  state = `win`;
  // figthJarethButton.remove();
  // buttonRemover();
  // // introAdvanceButton();///activate the voice recognition
  // labyrinthProfile.hiddenThingFound = ``; //clear item found part
  // // labyrinthProfile.itemsCollected = 0;
  // // labyrinthProfile.charactersCollected = 0;
}

function introAdvanceButton() {
  advanceToScene = createButton("Start your search");
  advanceToScene.position(150, 550); //located at bottom center
  advanceToScene.mousePressed(returnAdvanceButton); //call a function when mouse is pressed
  advanceToScene.size(105, 50);
}

function returnAdvanceButton() {
  if (state === `enter_scene_One`) {
    state = `scene_One`;
    // mainProfilePage();
    ///clear item found
    sceneOneMenus();
    dropMenus();
    buttonMaker();
  } else if (state === `enter_scene_Two`) {
    state = `scene_Two`;
    // mainProfilePage();
    sceneTwoMenus();
    dropMenus();
    buttonMaker();
  } else if (state === `enter_scene_Three`) {
    state = `scene_Three`;
    sceneThreeMenus();
    dropMenus();
    buttonMaker();
  } else if (state === `enter_scene_Four`) {
    state = `scene_Four`;
    sceneFourMenus();
    dropMenus();
    buttonMaker();
  } else if (state === `enter_scene_Five`) {
    state = `scene_Five`;
    sceneFiveMenus();
    dropMenus();
    buttonMaker();
  }
}

function returnMapButton() {
  if (state === `map1`) {
    state = `scene_One`;
    dropMenus();
    buttonMaker();
    nothingIsAsItSeemsButton.remove();
    // nextSceneButton = createButton("Done Searching, Go to Next Scene");
  } else if (state === `map2`) {
    state = `scene_Two`;
    dropMenus();
    buttonMaker();
    nothingIsAsItSeemsButton.remove();
  } else if (state === `map3`) {
    state = `scene_Three`;
    dropMenus();
    buttonMaker();
    nothingIsAsItSeemsButton.remove();
  } else if (state === `map4`) {
    state = ` scene_Four`;
    dropMenus();
    buttonMaker();
    nothingIsAsItSeemsButton.remove();
  } else if (state === `map5`) {
    state = `scene_Five`;
    dropMenus();
    buttonMaker();
    nothingIsAsItSeemsButton.remove();
  }
}

function trickMapImage() {
  push();
  imageMode(CENTER);
  image(labyrinthTrickMap, width / 2 + 7, height / 2 + 35);
  pop();
}

function trickMap() {
  //create selects (menus) go off screen -
  //seeMapButton
  nothingIsAsItSeemsButton = createButton("Nothing is as it seems");
  nothingIsAsItSeemsButton.position(250, 120); //located at upper right corner
  nothingIsAsItSeemsButton.mousePressed(returnMapButton); //call a function when mouse is pressed
  nothingIsAsItSeemsButton.size(105, 50);
  // buttonRemover();
  // dropMenuLocation.x = dropMenuLocation.x + 20;
  // dropMenuSelection.x += 20;
  // console.log(dropMenuLocation.x, dropMenuSelection.x);
}
//boxes and box dropshadows for each story scene
function introStoryBoxes() {
  push();
  fill(200, 100, 0, 75);
  tint(75);
  stroke(0, 61, 61);

  image(labyrinthBanner, 0, 0);
  strokeWeight(3);
  rectMode(CENTER);
  rect(width / 2 - 7, height / 2 + 55, 330, 480);
  strokeWeight(3);
  stroke(250, 233, 0);

  fill(0);

  rect(width / 2 + 7, height / 2 + 35, 330, 480);
  pop();
}

function enterIntro() {
  introStoryBoxes();

  push();
  imageMode(CENTER);
  image(enterIntroInfo, width / 2 + 7, height / 2 + 35);
  pop();
}
function enterOne() {
  introStoryBoxes();
  // introAdvanceButton();
  push();
  imageMode(CENTER);
  image(enterOneInfo, width / 2 + 7, height / 4);
  image(sceneOneIntroImage, width / 2 + 7, height / 4 + 250);
  pop();
}
function enterTwo() {
  introStoryBoxes();
  // introAdvanceButton();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(enterTwoInfo, width / 2 + 7, height / 4 + 15);
  image(sceneTwoIntroImage, width / 2 + 7, height / 4 + 250);
  pop();

  //createButton to move to sceneTwo -- begin your search Button -- if statements advancing to the main scenes if they are on the enter intrroa
}
function enterThree() {
  introStoryBoxes();
  // introAdvanceButton();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(enterThreeInfo, width / 2 + 7, height / 4 + 35);
  image(sceneThreeIntroImage, width / 2 + 7, height / 4 + 225);
  pop();
}
function enterFour() {
  introStoryBoxes();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(enterFourInfo, width / 2 + 7, height / 4 + 15);
  image(sceneFourIntroImage, width / 2 + 7, height / 4 + 250);
  pop();
}
function enterFive() {
  introStoryBoxes();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(enterFiveInfo, width / 2 + 7, height / 4 + 15);
  image(sceneFiveIntroImage, width / 2 + 7, height / 4 + 220);
  pop();
}

function win() {
  figthJarethButton.remove();
  introStoryBoxes();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(winInfo, width / 2 + 7, height / 4 + 15);
  image(winImage, width / 2 + 7, height / 4 + 220);
  pop();
  //activate voice recognition
  //win function gets called only if...(see fetch JSON win to see)
}
function winEnd() {
  //when the user says the right line 'you have no power over me' - this gets called.
  introStoryBoxes();
  buttonRemover();
  push();
  imageMode(CENTER);
  image(winEndInfo, width / 2 + 7, height / 4 + 15);
  image(winEndImage, width / 2 + 7, height / 4 + 220);
  pop();
}

function mainProfilePage() {
  //create button

  seeMapButton.position(250, 120); //located at upper right corner
  seeMapButton.mousePressed(sendMapButton); //call a function when mouse is pressed
  seeMapButton.size(105, 50);

  advanceToScene.remove();

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




  What are you looking for?



    Current Scene: ${labyrinthProfile.currentScene}
    Item Found:
    ${labyrinthProfile.hiddenThingFound}



`;

  //display the text along with the design banner at the top
  push();
  image(labyrinthBanner, 0, 0);
  textFont(`American Typewriter`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0, 139, 140);
  text(profile, 10, 100);

  pop();

  let geolocationProfile = `
My Geolocation:
 Lat: ${labyrinthProfile.currentLocationLat}
 Long: ${labyrinthProfile.currentLocationLong}
    `;
  push();

  textFont(`American Typewriter`);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0, 139, 140);
  text(geolocationProfile, 22, 300);

  pop();

  ///if state 'find' show button - 'click to collect' - else - 'go to next scene'
  push();
  nextSceneButton.position(width - 135, height - 90); //located at upper right corner
  nextSceneButton.mousePressed(goToNextScene); //call a function when mouse is pressed
  nextSceneButton.size(105, 50);
  pop();
}

function goToNextScene() {
  if (state === `scene_One`) {
    state = `enter_scene_Two`;
    introAdvanceButton();
    labyrinthProfile.hiddenThingFound = ``; //clear item found part
    // buttonRemover();// DOESNT WORK HERE
  } else if (state === `scene_Two`) {
    state = `enter_scene_Three`;
    introAdvanceButton();
    labyrinthProfile.hiddenThingFound = ``; //clear item found part
  } else if (state === `scene_Three`) {
    state = `enter_scene_Four`;
    introAdvanceButton();
    labyrinthProfile.hiddenThingFound = ``; //clear item found part
  } else if (state === `scene_Four`) {
    state = `enter_scene_Five`;
    introAdvanceButton();
    labyrinthProfile.hiddenThingFound = ``; //clear item found part
  }
}

function sceneOne() {
  mainProfilePage();
  // sceneOneMenus(); called on click after story told and user wants to search.
}

function sceneTwo() {
  mainProfilePage();
  // sceneTwoMenus();
}

function sceneThree() {
  mainProfilePage();
  // sceneThreeMenus();
}

function sceneFour() {
  mainProfilePage();
  // sceneFourMenus();
}

function sceneFive() {
  mainProfilePage();
  // sceneFiveMenus();
}
//
// function win() {
//   push();
//   fill(0);
//   rect(0, 0, 375, 667);
//   tint(255, 126);
//   pop();
// }
// function lose() {
//   push();
//   fill(255);
//   rect(0, 0, 375, 667);
//   tint(255, 126);
//   pop();
// }

function sceneOneMenus() {
  /// user's bedroom - find goblins, snake, goblin king, clock
  //user choose their search location in that scene

  labyrinthProfile.currentScene = 1;
  //assign locations specific to this scene
  searchLocation.one = `under bed`; //find goblins
  searchLocation.two = `behind curtain`; //goblin king
  searchLocation.three = `in bookshelf`; //snake
  searchLocation.four = `in closet`; //clock
  // dropMenus();
  // buttonMaker();

  // nextSceneButton = createButton("Done Searching, Go to Next Scene");
  // seeMapButton = createButton("See the Labyrinth"); ///make a function for the button creation
}

function sceneTwoMenus() {
  //at the entrance of labyrinth - find hoggle [behind tree], faeries[under rock], bracelet [on ground], 'hello' caterpillar[at wall]
  //user choose their search location in that scene
  // dropMenus();
  // buttonMaker();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `check wall`;
  searchLocation.two = `check ground`;
  searchLocation.three = `behind tree`;
  searchLocation.four = `under rock`;
}

function sceneThreeMenus() {
  ///2 characters guarding doors that lie. 'certain death!'  - collect the doom stones (the faces that say, 'turnback!!'), a lamp and the helping hands
  //user choose their search location in that scene
  // dropMenus();
  // buttonMaker();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `check left corridor`; //you catch small characters pop up from the tiles in the ground!
  searchLocation.two = `check door one`; // Certain death! Game over.
  searchLocation.three = `check right corridor`; //nothing.
  searchLocation.four = `check door two`; // you fall down a dark hole, but luckily the helping hands guide you into the obliette and Hoggle helps you escape!
}

function sceneFourMenus() {
  // dark forest - collect the posion peach, the orange dancing bouncing head characters,
  //user choose their search location in that scene
  // dropMenus();
  // buttonMaker();
  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `look around tree`; //ludo
  searchLocation.two = `look in bush`; ///dancing characters
  searchLocation.three = `look in dark tunnel`; /// get thrown into the bog of eternal stench and game over
  searchLocation.four = `climb tree`; //posion peach _ go back one level - create button for this.
}

function sceneFiveMenus() {
  //final labyrinth -
  //user choose their search location in that scene
  // dropMenus();//doesnt WORK HERE
  // buttonMaker();//doesnt WORK HERE

  labyrinthProfile.currentScene++;
  //assign locations specific to this scene
  searchLocation.one = `climb up stairs`; //fall in love with Jareth game over
  searchLocation.two = `go down stairs`; //run out of time game over
  searchLocation.three = `go through doorway`; //meet Jareth and beat him [you win] (must enterIntro the correct passage from the book 'you have no power over me')
  searchLocation.four = `jump off ledge`; //get Toby [you win]
}

function dropMenus() {
  //drop down menus
  //user choose their search location
  userInputLocation = createSelect(); //create dropdown menu with p5.js function
  userInputLocation.position(dropMenuLocation.x, dropMenuLocation.y); ///where on app
  userInputLocation.option("Location in Scene.");
  userInputLocation.option(searchLocation.one);
  userInputLocation.option(searchLocation.two);
  userInputLocation.option(searchLocation.three);
  userInputLocation.option(searchLocation.four);
  userInputLocation.changed(sendSearchLocation); // create action after the input drop down is changed - send to / call the sendSearchLocation function.

  //choose what to search> Character or item
  userInputSelection = createSelect();
  userInputSelection.position(dropMenuSelection.x, dropMenuSelection.y);
  userInputSelection.option("Character? or Item?");
  userInputSelection.option(whatType.one);
  userInputSelection.option(whatType.two);
  userInputSelection.changed(sendSelection); // create action after the input drop down is changed - send to / call the sendSelection function.
  //
}

function inputBoxes() {
  // boxes behind data entered information.
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
  rect(22, 336, 250, 45, 6);

  pop();

  // Story line BOX - what scene are you in and what have you found.
  push();
  fill(inputBox.current.r, inputBox.current.g, inputBox.current.b);
  stroke(253, 132, 0);
  rect(22, 475, 330, 158, 6);
  pop();
}

function positionChanged(position) {
  console.log("lat: " + position.latitude);
  console.log("long: " + position.longitude);

  labyrinthProfile.currentLocationLat = position.latitude;
  labyrinthProfile.currentLocationLong = position.longitude;
}

function mousePressed() {
  ///just to test and then change mousePressed to something else (a new function) and trigger on a movement event via the geolocation distance?
  if (state === `enter`) {
    state = `enter_scene_One`;
    introAdvanceButton();
  }
}
