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
  `Antelope`,
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
  `Elephant`,
  `Goat`,
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

let hintList = [];

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
  string: `Click to enter game. Then click to hear the Anagram. \n Listen to the anagram \n Say, "I think it is ....." and guess the correct animal. \n GET HINTS: Press 'A' to see the anagram. \n Press 'L' to see a list of possible animals. \n Guess 6 animals correctly and win!`,
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
  push();
  background(0);
  fill(255);
  strokeWeight(5);
  stroke(0, 0, random(0, 255));
  rect(
    width / 4 - 10, //x coorinate,
    height / 4 - 60, // y coordinate,
    width / 2 + 20, //width of rect,
    height / 4 - 40, //height of rect,
    40, //radius of topleft corner,
    45, //radius of topright corner,
    40, //radius of bottomright corner,
    1 // radius of bottom left corner
  );
  noStroke();
  textSize(enterScreen.size);
  fill(0);
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  text(enterScreen.string, enterScreen.x, enterScreen.y);
  pop();
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
  enterScreen.size = 15;
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

//if mouse pressed when state is `enter`, change state to `game`, else if state is `game` then say the anagramAnimal
function mousePressed() {
  if (state === `enter`) {
    state = `game`;
  } else if (state === `game`) {
    currentAnimal = random(animals);
    // anagramCreator();
    let anagramAnimal = anagramCreator(currentAnimal);
    responsiveVoice.speak(anagramAnimal);
    console.log(anagramAnimal);
    for (let i = 0; i < NUM_HINTS; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let hint = new Hint(x, y, random(animals));
      hintList.push(hint);
    }
    let x = random(0, width);
    let y = random(0, height);
    let hint = new Hint(x, y, currentAnimal);
    hintList.push(hint);
  }
}

function guessAnimal(animal) {
  currentAnswer = animal;
  console.log(currentAnswer);
  if (currentAnswer.toLowerCase() === currentAnimal.toLowerCase()) {
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
    if (key === "a") {
      push();
      strokeWeight(5);
      stroke(0, 0, random(0, 255));
      fill(0);

      rect(
        width / 4 - 10, //x coorinate,
        height / 4 - 60, // y coordinate,
        width / 2 + 20, //width of rect,
        height / 4 - 40, //height of rect,
        40, //radius of topleft corner,
        45, //radius of topright corner,
        40, //radius of bottomright corner,
        1 // radius of bottom left corner
      );
      pop();

      noStroke();
      textSize(enterScreen.size);

      textAlign(CENTER, CENTER);
      textFont("Tahoma");
      fill(255);
      text(anagramCreator(currentAnimal), width / 4 - 10, height / 4 - 60); //adjust location of anagram hint.
    } else if (key === "l") {
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

function anagramCreator(animal) {
  //NOTE: parameter here is a local variable that exists in this specific function, but when you send a global vaiable from somewhere else ... ie. line 251 - currentAnimal... it will be a different name.
  let anagramAnimal = ``;
  if (animal === `Alligator`) {
    anagramAnimal = `Lita Largo`;
  } else if (animal === `Antelope`) {
    anagramAnimal = `Alton Pee`;
  } else if (animal === `Ape`) {
    anagramAnimal = `Pea`;
  } else if (animal === `Armadillo`) {
    anagramAnimal = `Admiral Lo`;
  } else if (animal === `Bat`) {
    anagramAnimal = `Tab`;
  } else if (animal === `Bear`) {
    anagramAnimal = `Reba`;
  } else if (animal === `Bison`) {
    anagramAnimal = `I snob`;
  } else if (animal === `Boar`) {
    anagramAnimal = `A bro`;
  } else if (animal === `Buffalo`) {
    anagramAnimal = `Fab foul`;
  } else if (animal === `Camel`) {
    anagramAnimal = `El Mac`;
  } else if (animal === `Canary`) {
    anagramAnimal = `A Caryn`;
  } else if (animal === `Cat`) {
    anagramAnimal = `Act`;
  } else if (animal === `Chameleon`) {
    anagramAnimal = `Ache Lemon`;
  } else if (animal === `Chimpanzee`) {
    anagramAnimal = `Impeach Zen`;
  } else if (animal === `Chinchilla`) {
    anagramAnimal = `Chain Chill`;
  } else if (animal === `Chipmunk`) {
    anagramAnimal = `Kim Punch`;
  } else if (animal === `Coyote`) {
    anagramAnimal = `Eco Toy`;
  } else if (animal === `Crocodile`) {
    anagramAnimal = `Cecil Odor`;
  } else if (animal === `Donkey`) {
    anagramAnimal = `Deny ok`;
  } else if (animal === `Elephant`) {
    anagramAnimal = `Eh planet`;
  } else if (animal === `Goat`) {
    anagramAnimal = `Toga`;
  } else if (animal === `Ground hog`) {
    anagramAnimal = `hog rod gun`;
  } else if (animal === `Guinea Pig`) {
    anagramAnimal = `Paige Gains`;
  } else if (animal === `Hamster`) {
    anagramAnimal = `Mesh art`;
  } else if (animal === `Kangaroo`) {
    anagramAnimal = `A Kong Ora`;
  } else if (animal === `Koala`) {
    anagramAnimal = `A la ok`;
  } else if (animal === `Lamb`) {
    anagramAnimal = `Balm`;
  } else if (animal === `Leopard`) {
    anagramAnimal = `Paroled`;
  } else if (animal === `Llama`) {
    anagramAnimal = `A mall`;
  } else if (animal === `Mole`) {
    anagramAnimal = `Elmo`;
  } else if (animal === `Otter`) {
    anagramAnimal = `Torte`;
  } else if (animal === `Panther`) {
    anagramAnimal = `Harp net`;
  } else if (animal === `Porcupine`) {
    anagramAnimal = `Price Upon`;
  } else if (animal === `Raccoon`) {
    anagramAnimal = `Acorn Co.`;
  } else if (animal === `Rhinoceros`) {
    anagramAnimal = `Choir snore`;
  } else if (animal === `Seal`) {
    anagramAnimal = `Ales`;
  } else if (animal === `Snake`) {
    anagramAnimal = `Sneak`;
  } else if (animal === `Toad`) {
    anagramAnimal = `A dot`;
  } else if (animal === `Turtle`) {
    anagramAnimal = `Let rut`;
  } else if (animal === `Wolf`) {
    anagramAnimal = `Flow`;
  } else if (animal === `Wolverine`) {
    anagramAnimal = `Evil owner`;
  } else if (animal === `Zebra`) {
    anagramAnimal = `Braze`;
  }
  console.log(anagramAnimal);
  return anagramAnimal;
}
///make function for key is down shift - show the anagram ? another spacebar is down? show list.
//states with opening and ending, instructions and number of question? 10 questions?
