/**************************************************
E2: Slamina New Game
Alana DeVito

Practicing voice responsive and annyang voice recognition.
plan:
- start and end
- counter
- anagrams

**************************************************/
"use strict";

//make array with animal names to choose from
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra",
];

let state = `question1`;

//score//
let score = 0;

let scoreDots = {
  x: 100,
  y: 140,
  radius: 50,
  offset1: 55,
  offset2: 110,
  offset3: 165,
  offset4: 220,
  r: 255,
  g: 0,
  b: 199,
};

let question = {
  x: 100,
  y: 160,
  r: 255,
  g: 255,
  b: 255,
  string: questionNumber,
};

// let enterScreen = {
//   string: `Listen to the anagram \n Say, "I think it is ....." and guess the correct animal. \n Guess 6 animals correctly and win!`,
//   x: undefined,
//   y: undefined,
//   vx: undefined,
//   vy: undefined,
//   size: undefined,
// };
//
// let winScreen = {
//   string: `You win!`,
//   x: undefined,
//   y: undefined,
//   vx: undefined,
//   vy: undefined,
//   size: undefined,
// };
//
// let endScreen = {
//   string: `Game Over!`,
//   x: undefined,
//   y: undefined,
//   vx: undefined,
//   vy: undefined,
//   size: undefined,
// };

let currentAnimal = ``;
let currentAnswer = ``;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    // setUpEnterScreen();
    // setUpWinScreen();
    // setUpEndScreen();
  }
}
function draw() {
  background(0);
  keepScore();
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    score++;
  } else {
    fill(255, 0, 0);
    score--;
  }

  text(currentAnswer, width / 2, height / 2);

  if (state === `question 1`) {
  } else if (state === `question 2`) {
  } else if (state === `question 3`) {
  } else if (state === `question 4`) {
  } else if (state === `question 5`) {
  } else if (state === `question 6`) {
  } else if (state === `question 7`) {
  } else if (state === `question 8`) {
  } else if (state === `question 9`) {
  } else if (state === `question 10`) {
  }
}

// function gameStart() {
//   // if (currentAnswer === currentAnimal) {
//   //   fill(0, 255, 0);
//   //   score++;
//   // } else {
//   //   fill(255, 0, 0);
//   //   score--;
//   // }
//   // text(currentAnswer, width / 2, height / 2);
// }
//
// function enterStart() {
//   background(255);
//   textSize(enterScreen.size);
//   fill(255);
//   textAlign(CENTER, CENTER);
//   textStyle(BOLD);
//   textFont("Monaco");
//   stroke(0, 0, random(0, 255));
//   strokeWeight(10);
//   text(enterScreen.string, enterScreen.x, enterScreen.y);
// }

// function gameWin() {
//   background(255);
//   textSize(winScreen.size);
//   fill(255);
//   textAlign(CENTER, CENTER);
//   textStyle(BOLD);
//   textFont("Monaco");
//   stroke(0, 0, random(0, 255));
//   strokeWeight(10);
//   text(winScreen.string, winScreen.x, winScreen.y);
// }

// function gameEnd() {
//   background(255);
//   textSize(endScreen.size);
//   fill(255);
//   textAlign(CENTER, CENTER);
//   textStyle(BOLD);
//   textFont("Monaco");
//   stroke(0, 0, random(0, 255));
//   strokeWeight(10);
//   text(endScreen.string, endScreen.x, endScreen.y);
// }
//
// function setUpEnterScreen() {
//   enterScreen.x = width / 2;
//   enterScreen.y = 200;
//   enterScreen.vx = 5;
//   enterScreen.vy = 1;
//   enterScreen.size = 30;
// }

// function setUpWinScreen() {
//   winScreen.x = width / 2;
//   winScreen.y = 200;
//   winScreen.vx = 5;
//   winScreen.vy = 1;
//   winScreen.size = 30;
// }
//
// function setUpEndScreen() {
//   endScreen.x = width / 2;
//   endScreen.y = 200;
//   endScreen.vx = 5;
//   endScreen.vy = 1;
//   endScreen.size = 30;
// }

function mousePressed() {
  // if (state === `enter`) {
  //   state = `game`;
  // } else if (state === `game`) {
  currentAnimal = random(animals);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
}

function guessAnimal(animal) {
  currentAnswer = animal;
  console.log(currentAnswer);
}
/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join("");
  // Return the result
  return result;
}

function keepScore() {
  if (score >= 1) {
    fill(255, 0, 199);
    circle(scoreDots.x, scoreDots.y, scoreDots.radius);
    console.log(`1`);
  } else if (score >= 2) {
    circle(scoreDots.x + scoreDots.offset1, scoreDots.y, scoreDots.radius);
    console.log(`2`);
  } else if (score >= 3) {
    circle(scoreDots.x + scoreDots.offset2, scoreDots.y, scoreDots.radius);
    console.log(`3`);
  } else if (score >= 4) {
    circle(scoreDots.x + scoreDots.offset3, scoreDots.y, scoreDots.radius);
    console.log(`4`);
  } else if (score >= 5) {
    circle(scoreDots.x + scoreDots.offset4, scoreDots.y, scoreDots.radius);
    console.log(`5`);
  } else if (score >= 6) {
    textSize(40);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textFont("Monaco");
    stroke(0, 0, random(0, 255));
    strokeWeight(10);
    text(`you win`, width / 2, height / 2);
    console.log(`6`);
  }
}
