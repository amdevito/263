/**************************************************
E2: Slamina New Game
Alana DeVito

Practicing voice responsive and annyang voice recognition.
plan:
-start and end
- counter
- timer

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

let state = `enter`;

//score//
let score = 0;

let scoreDots = {
  x: 450,
  y: 340,
  radius: 50,
  offset1: 55,
  offset2: 110,
  offset3: 165,
  offset4: 220,
  r: 255,
  g: 0,
  b: 199,
};

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
  }
  text(currentAnswer, width / 2, height / 2);

  if (state === `enter`) {
    enterStart();
  } else if (state === `game`) {
    gameStart();
  } else if (state === `win`) {
    gameWin();
  } else if (state === `gameOver`) {
    gameOver();
  }
}

function mousePressed() {
  if (state === `enter`) {
    state = `game`;
  } else if (state === `game`) {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);
  }
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
    fill(94, 69, 35);
    circle(scoreDots.x, scoreDots.y, scoreDots.radius);
  }
  if (score >= 2) {
    circle(scoreDots.x + scoreDots.offset1, scoreDots.y, scoreDots.radius);
  }
  if (score >= 3) {
    circle(scoreDots.x + scoreDots.offset2, scoreDots.y, scoreDots.radius);
  }
  if (score >= 4) {
    circle(scoreDots.x + scoreDots.offset3, scoreDots.y, scoreDots.radius);
  }
  if (score >= 5) {
    circle(scoreDots.x + scoreDots.offset4, scoreDots.y, scoreDots.radius);
  }
  if (score >= 6) {
    state = "win";
  }
}
