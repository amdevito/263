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

let hintAnagrams = {
  string: `Listen to the anagram \n Say, "I think it is ....." and guess the correct animal. \n Guess 6 animals correctly and win!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

let hintList = {
  string: `Listen to the anagram \n Say, "I think it is ....." and guess the correct animal. \n Guess 6 animals correctly and win!`,
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

// let question = {
//   x: 100,
//   y: 160,
//   r: 255,
//   g: 255,
//   b: 255,
//   //string: questionNumber,
// };

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

  keepScore();
  text(currentAnswer, width / 2, height / 2);

  if (state === `enter`) {
  } else if (state === `game`) {
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
  currentAnimal = random(animals);
  anagramCreator();
  // if (state === `enter`) {
  //   state = `game`;
  // } else if (state === `game`) {
  // currentAnimal = random(animals);
  // let reverseAnimal = reverseString(currentAnimal);
  // responsiveVoice.speak(reverseAnimal);
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
/**
Reverses the provided string
*/
// function reverseString(string) {
//   // Split the string into an array of characters
//   let characters = string.split("");
//   // Reverse the array of characters
//   let reverseCharacters = characters.reverse();
//   // Join the array of characters back into a string
//   let result = reverseCharacters.join("");
//   // Return the result
//   return result;
// }

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
  textFont("Monaco");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(`you win`, width / 2, height / 2);
  console.log(`6`);
}

function anagramCreator() {
  if (currentAnimal === `Alligator`) {
    responsiveVoice.speak(`Lita Largo`);
  } else if (currentAnimal === `Antelope`) {
    responsiveVoice.speak(`Alton Pee`);
  } else if (currentAnimal === `Ape`) {
    responsiveVoice.speak(`Pea`);
  } else if (currentAnimal === `Armadillo`) {
    responsiveVoice.speak(`Admiral Lo`);
  } else if (currentAnimal === `Bat`) {
    responsiveVoice.speak(`Tab`);
  } else if (currentAnimal === `Bear`) {
    responsiveVoice.speak(`Reba`);
  } else if (currentAnimal === `Bison`) {
    responsiveVoice.speak(`I snob`);
  } else if (currentAnimal === `Boar`) {
    responsiveVoice.speak(`A bro`);
  } else if (currentAnimal === `Buffalo`) {
    responsiveVoice.speak(`Fab foul`);
  } else if (currentAnimal === `Camel`) {
    responsiveVoice.speak(`El Mac`);
  } else if (currentAnimal === `Canary`) {
    responsiveVoice.speak(`A Caryn`);
  } else if (currentAnimal === `Cat`) {
    responsiveVoice.speak(`Act`);
  } else if (currentAnimal === `Chameleon`) {
    responsiveVoice.speak(`Ache Lemon`);
  } else if (currentAnimal === `Chimpanzee`) {
    responsiveVoice.speak(`Impeach Zen`);
  } else if (currentAnimal === `Chinchilla`) {
    responsiveVoice.speak(`Chain Chill`);
  } else if (currentAnimal === `Chipmunk`) {
    responsiveVoice.speak(`Kim Punch`);
  } else if (currentAnimal === `Coyote`) {
    responsiveVoice.speak(`Eco Toy`);
  } else if (currentAnimal === `Crocodile`) {
    responsiveVoice.speak(`Cecil Odor`);
  } else if (currentAnimal === `Donkey`) {
    responsiveVoice.speak(`Deny ok`);
  } else if (currentAnimal === `Elephant`) {
    responsiveVoice.speak(`Eh planet`);
  } else if (currentAnimal === `Goat`) {
    responsiveVoice.speak(`Toga`);
  } else if (currentAnimal === `Ground hog`) {
    responsiveVoice.speak(`hog rod gun`);
  } else if (currentAnimal === `Guinea Pig`) {
    responsiveVoice.speak(`Paige Gains`);
  } else if (currentAnimal === `Hamster`) {
    responsiveVoice.speak(`Mesh art`);
  } else if (currentAnimal === `Kangaroo`) {
    responsiveVoice.speak(`A Kong Ora`);
  } else if (currentAnimal === `Koala`) {
    responsiveVoice.speak(`A la ok`);
  } else if (currentAnimal === `Lamb`) {
    responsiveVoice.speak(`Balm`);
  } else if (currentAnimal === `Leopard`) {
    responsiveVoice.speak(`Paroled`);
  } else if (currentAnimal === `Llama`) {
    responsiveVoice.speak(`A mall`);
  } else if (currentAnimal === `Mole`) {
    responsiveVoice.speak(`Elmo`);
  } else if (currentAnimal === `Otter`) {
    responsiveVoice.speak(`Torte`);
  } else if (currentAnimal === `Panther`) {
    responsiveVoice.speak(`Harp net`);
  } else if (currentAnimal === `Porcupine`) {
    responsiveVoice.speak(`Price Upon`);
  } else if (currentAnimal === `Raccoon`) {
    responsiveVoice.speak(`Acorn Co.`);
  } else if (currentAnimal === `Rhinoceros`) {
    responsiveVoice.speak(`Choir snore`);
  } else if (currentAnimal === `Seal`) {
    responsiveVoice.speak(`Ales`);
  } else if (currentAnimal === `Snake`) {
    responsiveVoice.speak(`Sneak`);
  } else if (currentAnimal === `Toad`) {
    responsiveVoice.speak(`A dot`);
  } else if (currentAnimal === `Turtle`) {
    responsiveVoice.speak(`Let rut`);
  } else if (currentAnimal === `Wolf`) {
    responsiveVoice.speak(`Flow`);
  } else if (currentAnimal === `Wolverine`) {
    responsiveVoice.speak(`Evil owner`);
  } else if (currentAnimal === `Zebra`) {
    responsiveVoice.speak(`Braze`);
  }
}
///make function for key is down shift - show the anagram ? another spacebar is down? show list.
//states with opening and ending, instructions and number of question? 10 questions?
