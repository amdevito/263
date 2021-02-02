/**************************************************
E2: Slamina New Game
Alana DeVito

Practicing voice responsive and annyang voice recognition.
plan:
- start page - and end - page shows up after 6 answers correct
- counter - 6 answers correct, you win, but if you get one wrong, one point is taken away
- anagrams - you hear an anagram of the animals
- hint - press a shows the typed anagram, press l for a random list (8) of animals with one that is the real answer.

**************************************************/
"use strict";
const NUM_HINTS = 8;

let hintList = undefined;

let anagramAnimal = ``;

let hintAnagram = {
  string: anagramAnimal,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};
const animals = [
  `Alligator`,
  `Alton Pee`,
  `Armadillo`,
  `Bat`,
  `Bear`,
  `Bison`,
  `Boar`,
  `Buffalo`,
  `Camel`,
  `Canary`,
  `Cat`,
  `Chameleon`,
  `Chimpanzee`,
  `Chinchilla`,
  `Chipmunk`,
  `Coyote`,
  `Crocodile`,
  `Donkey`,
  `Elephant``Goat`,
  `Ground hog`,
  `Guinea Pig`,
  `Hamster`,
  `Kangaroo`,
  `Koala`,
  `Lamb`,
  `Leopard`,
  `Llama`,
  `Mole`,
  `Otter`,
  `Panther`,
  `Porcupine`,
  `Raccoon`,
  `Rhinoceros`,
  `Seal`,
  `Snake`,
  `Toad`,
  `Turtle`,
  `Wolf`,
  `Wolverine`,
  `Zebra`,
];

let hintList = {
  string: `Alligator
Alton Pee
Armadillo
Bat
Bear
Bison
Boar
Buffalo
Camel
Canary \n
Cat
Chameleon
Chimpanzee
Chinchilla
Chipmunk
Coyote
Crocodile
Donkey
Elephant
Goat \n
Ground hog
Guinea Pig
Hamster
Kangaroo
Koala
Lamb
Leopard
Llama
Mole
Otter \n
Panther
Porcupine
Raccoon
Rhinoceros
Seal
Snake
Toad
Turtle
Wolf
Wolverine
Zebra`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

let state = `enter`;

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

let enterScreen = {
  string: `Listen to the anagram \n Say, "I think it is ....." and guess the correct animal. \n Guess 6 animals correctly and win!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};
//
let winScreen = {
  string: `You win!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};
//
let endScreen = {
  string: `Game Over!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
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

    //get the random hints, push hints in to the 8 hint slots, include the correct animal, display in bubble just for duration of key press. Bubble appears in random location on screen.
    for (let i = 0; i < NUM_HINTS; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let hint = new HintList(x, y);
      hintList.push(hint);
      hintList.push(); //actual currentAnswer
    }

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    setUpEnterScreen();
    setUpWinScreen();
    setUpEndScreen();
  }
}
function draw() {
  background(0);
  keepScore();

  text(currentAnswer, width / 2, height / 2);

  if (state === `enter`) {
    enterStart();
  } else if (state === `game`) {
    gamePlay();
  }
}

function gamePlay() {
  getHint();
}

function enterStart() {
  background(255);
  textSize(enterScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("GEORGIA");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(enterScreen.string, enterScreen.x, enterScreen.y);
}

function gameWin() {
  background(255);
  textSize(winScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("GEORGIA");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(winScreen.string, winScreen.x, winScreen.y);
}

function gameEnd() {
  background(255);
  textSize(endScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("GEORGIA");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(endScreen.string, endScreen.x, endScreen.y);
}

function setUpEnterScreen() {
  enterScreen.x = width / 2;
  enterScreen.y = 200;
  enterScreen.vx = 5;
  enterScreen.vy = 1;
  enterScreen.size = 30;
}

function setUpWinScreen() {
  winScreen.x = width / 2;
  winScreen.y = 200;
  winScreen.vx = 5;
  winScreen.vy = 1;
  winScreen.size = 30;
}
//
function setUpEndScreen() {
  endScreen.x = width / 2;
  endScreen.y = 200;
  endScreen.vx = 5;
  endScreen.vy = 1;
  endScreen.size = 30;
}

function setUpHintAnagram() {
  endScreen.x = width / 2;
  endScreen.y = 200;
  endScreen.vx = 5;
  endScreen.vy = 1;
  endScreen.size = 30;
}

function setUpHintList() {
  endScreen.x = width / 2;
  endScreen.y = 200;
  endScreen.vx = 5;
  endScreen.vy = 1;
  endScreen.size = 30;
}

function mousePressed() {
  currentAnimal = random(animals);
  anagramCreator();
  responsiveVoice.speak(anagramAnimal);
  if (state === `enter`) {
    state = `game`;
  }
}

function guessAnimal(animal) {
  currentAnswer = animal;
  console.log(currentAnswer);
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    score++;
  } else {
    fill(255, 0, 0);
    score--;
  }
}

function getHintList() {
  for (let i = 0; i < hintList.length; i++) {
    hintList[i].update();
  }
}

function getHint() {
  if (keyIsPressed) {
    if (key == "a") {
      stroke(0, 0, random(0, 255));
      rect(30, 20, 55, 55, 20, 15, 10, 5);
      textSize(30);
      fill(255);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textFont("GEORGIA");
      stroke(0, 0, random(0, 255));
      strokeWeight(10);
      text(anagramAnimal, hintAnagram.x, hintAnagram.y);
    } else if (key == "l") {
      //this should show the bubble in the random location with the 7 random hints and 1 real one. replace with calling the OOP function
      getHintList();
    }
  }
}

function keepScore() {
  if (score >= 1) {
    fill(255, 0, 199);
    circle(scoreDots.x, scoreDots.y, scoreDots.radius);
    //console.log(`1`);
  }
  if (score >= 2) {
    circle(scoreDots.x + scoreDots.offset1, scoreDots.y, scoreDots.radius);
    //console.log(`2`);
  }
  if (score >= 3) {
    circle(scoreDots.x + scoreDots.offset2, scoreDots.y, scoreDots.radius);
    //  console.log(`3`);
  }
  if (score >= 4) {
    circle(scoreDots.x + scoreDots.offset3, scoreDots.y, scoreDots.radius);
    //console.log(`4`);
  }
  if (score >= 5) {
    circle(scoreDots.x + scoreDots.offset4, scoreDots.y, scoreDots.radius);
    //console.log(`5`);
  }
  if (score >= 6) {
    youwin();
  }
}

function youWin() {
  textSize(40);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("GEORGIA");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(`you win`, width / 2, height / 2);
  console.log(`6`);
}

function anagramCreator() {
  if (currentAnimal === `Alligator`) {
    let anagramAnimal = `Lita Largo`;
  } else if (currentAnimal === `Antelope`) {
    let anagramAnimal = `Alton Pee`;
  } else if (currentAnimal === `Ape`) {
    let anagramAnimal = `Pea`;
  } else if (currentAnimal === `Armadillo`) {
    let anagramAnimal = `Admiral Lo`;
  } else if (currentAnimal === `Bat`) {
    let anagramAnimal = `Tab`;
  } else if (currentAnimal === `Bear`) {
    let anagramAnimal = `Reba`;
  } else if (currentAnimal === `Bison`) {
    let anagramAnimal = `I snob`;
  } else if (currentAnimal === `Boar`) {
    let anagramAnimal = `A bro`;
  } else if (currentAnimal === `Buffalo`) {
    let anagramAnimal = `Fab foul`;
  } else if (currentAnimal === `Camel`) {
    let anagramAnimal = `El Mac`;
  } else if (currentAnimal === `Canary`) {
    let anagramAnimal = `A Caryn`;
  } else if (currentAnimal === `Cat`) {
    let anagramAnimal = `Act`;
  } else if (currentAnimal === `Chameleon`) {
    let anagramAnimal = `Ache Lemon`;
  } else if (currentAnimal === `Chimpanzee`) {
    let anagramAnimal = `Impeach Zen`;
  } else if (currentAnimal === `Chinchilla`) {
    let anagramAnimal = `Chain Chill`;
  } else if (currentAnimal === `Chipmunk`) {
    let anagramAnimal = `Kim Punch`;
  } else if (currentAnimal === `Coyote`) {
    let anagramAnimal = `Eco Toy`;
  } else if (currentAnimal === `Crocodile`) {
    let anagramAnimal = `Cecil Odor`;
  } else if (currentAnimal === `Donkey`) {
    let anagramAnimal = `Deny ok`;
  } else if (currentAnimal === `Elephant`) {
    let anagramAnimal = `Eh planet`;
  } else if (currentAnimal === `Goat`) {
    let anagramAnimal = `Toga`;
  } else if (currentAnimal === `Ground hog`) {
    let anagramAnimal = `hog rod gun`;
  } else if (currentAnimal === `Guinea Pig`) {
    let anagramAnimal = `Paige Gains`;
  } else if (currentAnimal === `Hamster`) {
    let anagramAnimal = `Mesh art`;
  } else if (currentAnimal === `Kangaroo`) {
    let anagramAnimal = `A Kong Ora`;
  } else if (currentAnimal === `Koala`) {
    let anagramAnimal = `A la ok`;
  } else if (currentAnimal === `Lamb`) {
    let anagramAnimal = `Balm`;
  } else if (currentAnimal === `Leopard`) {
    let anagramAnimal = `Paroled`;
  } else if (currentAnimal === `Llama`) {
    let anagramAnimal = `A mall`;
  } else if (currentAnimal === `Mole`) {
    let anagramAnimal = `Elmo`;
  } else if (currentAnimal === `Otter`) {
    let anagramAnimal = `Torte`;
  } else if (currentAnimal === `Panther`) {
    let anagramAnimal = `Harp net`;
  } else if (currentAnimal === `Porcupine`) {
    let anagramAnimal = `Price Upon`;
  } else if (currentAnimal === `Raccoon`) {
    let anagramAnimal = `Acorn Co.`;
  } else if (currentAnimal === `Rhinoceros`) {
    let anagramAnimal = `Choir snore`;
  } else if (currentAnimal === `Seal`) {
    let anagramAnimal = `Ales`;
  } else if (currentAnimal === `Snake`) {
    let anagramAnimal = `Sneak`;
  } else if (currentAnimal === `Toad`) {
    let anagramAnimal = `A dot`;
  } else if (currentAnimal === `Turtle`) {
    let anagramAnimal = `Let rut`;
  } else if (currentAnimal === `Wolf`) {
    let anagramAnimal = `Flow`;
  } else if (currentAnimal === `Wolverine`) {
    let anagramAnimal = `Evil owner`;
  } else if (currentAnimal === `Zebra`) {
    let anagramAnimal = `Braze`;
  }
}
///make function for key is down shift - show the anagram ? another spacebar is down? show list.
//states with opening and ending, instructions and number of question? 10 questions?
