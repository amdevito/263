/**************************************************
E2: Manila: The New Game
Alana DeVito

Practicing voice responsive and annyang voice recognition.
Meets Brief:
- Added start page and end page - end page shows up after 6 answers correct
- counter using score Dots - 6 answers correct, you win, but if you get one wrong, one point is taken away. Points are circles that change colour depending if you gain or lose a point, or win.
- Anagrams instead of backwards animal names - you hear an anagram of the animals
- Additional: Get HINTS! - press 'A' shows the typed anagram, press 'L' for a random list (8) of animals with one that is the real answer.
- text changes color depending on if you gain or lose a point. Text goes bright yellow if you win.
- game tells you when you are correct or wrong.
- game tells you that you win and to refresh when you get 6 points.

**************************************************/
"use strict";
//set constant with the number of hints to be provided with the 'L' key press
const NUM_HINTS = 8;

//set empty string for the Animal name in anagram form
let anagramAnimal = ``;

//set color variables to change throughout game play
let scoreColor = {
  r: 255,
  g: 0,
  b: 199,
};

//set up variable for the anagram Hint
let hintAnagram = {
  string: anagramAnimal,
  x: undefined,
  y: undefined,
  size: undefined,
};

//set constant containing all possible animals
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
  `Groundhog`,
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

//set up empty array for the list of animals for the animal name hints.
let hintList = [];

//set state to start at enter
let state = `enter`;

//Start score at zero//
let score = 0;

//sert up design and variable for the score dots
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

//set up enter screen with enclosed introduction string.
let enterScreen = {
  string: `Click to enter game, and then click to hear the Anagram. \n Listen to the anagram. \n Say, "I think it is ....." and guess the correct animal. \n GET HINTS: Press 'A' to see the anagram. Press 'L' to see all the possible animals. \n Guess 6 animals correctly and win! BE CAREFUL! If you're wrong we take a point away!`,
  x: undefined,
  y: undefined,
  size: undefined,
};

//Set up win screen for end of game.
let winScreen = {
  string: `You win! REFRESH to play again!`,
  x: undefined,
  y: undefined,
  size: undefined,
};

//set variable with empty strings for the animal to guess and the user's guess of that animal.
let currentAnimal = ``;
let currentAnswer = ``;

//set up canvas and launch annyang library
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();

    //set up global text style
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    //call set up functions for different screens for different states.
    setUpEnterScreen();
    setUpWinScreen();
    //call set up function for hintList
    setUpHintList();
  }
}
function draw() {
  //set background to black
  background(0);
  //run keep score function to track answers
  keepScore();
  //display user's answer
  text(currentAnswer, width / 2, height / 2);
  //call functions for each game state
  if (state === `enter`) {
    enterStart();
  } else if (state === `game`) {
    gamePlay();
  }
}

//gameplay function calls the getHint function
function gamePlay() {
  getHint();
}

//function to style and design introductions streen.
function enterStart() {
  push();
  background(0);
  fill(255);
  strokeWeight(5);
  stroke(0, 0, random(0, 255));
  rect(
    /// set up bubble for game instructions
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
  push();
  background(255);
  fill(0);
  strokeWeight(5);
  stroke(0, 0, random(0, 255));
  rect(
    /// set up bubble for game instructions
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
  textSize(winScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  text(winScreen.string, winScreen.x, winScreen.y);
  pop();
}
//set up functions to assign values to variables in relation to windowWidth / windowHeight
function setUpEnterScreen() {
  enterScreen.x = width / 2;
  enterScreen.y = 200;
  enterScreen.size = 15;
}

function setUpWinScreen() {
  winScreen.x = width / 2;
  winScreen.y = 200;
  winScreen.size = 15;
}

function setUpHintAnagram() {
  endScreen.x = width / 2;
  endScreen.y = 200;
  endScreen.size = 30;
}

function setUpHintList() {
  hintList.x = random(80, width - 50);
  hintList.y = random(80, height - 50);
  hintList.size = 15;
}

//if mouse pressed when state is `enter`, change state to `game`, else if state is `game` then say the anagramAnimal.
function mousePressed() {
  if (state === `enter`) {
    state = `game`;
  } else if (state === `game`) {
    currentAnimal = random(animals);

    let anagramAnimal = anagramCreator(currentAnimal);
    responsiveVoice.speak(anagramAnimal); //send anagram to be spoken by responsiveVoice.

    //retrieve random hints, push into the 8 hint slots, fetch hint from class, push to hint list array
    for (let i = 0; i < NUM_HINTS; i++) {
      let x = random(80, width - 50); //place hints in random locations on screen
      let y = random(80, height - 50); //place hints in random locations on screen
      let hint = new Hint(x, y, random(animals)); //get random animals from array
      hintList.push(hint);
    }
    //include the correct animal in the hints array and display
    let x = random(80, width - 50);
    let y = random(80, height - 50);
    let hint = new Hint(x, y, currentAnimal);
    hintList.push(hint); //push into hintList array
  } else if (state === `win`) {
    state = `enter`;
  }
}

function guessAnimal(animal) {
  currentAnswer = animal;
  //if user's answer matches the Animal Anagram add a point. If wrong, take point away.
  if (currentAnswer.toLowerCase() === currentAnimal.toLowerCase()) {
    //set current answer and current animal to lowercase to ensure program recognizes similarities.
    score++;
    responsiveVoice.speak(`That is correct!`); //game tells you that you are right!
    scoreColor.r = 255; //if you gain a point, the text is bright pink
    scoreColor.g = 0;
    scoreColor.b = 199;
  } else {
    score--;
    scoreColor.r = 0; // if you loose a point text goes dark blue
    scoreColor.g = 0;
    scoreColor.b = 199;
    responsiveVoice.speak(`Wrong! You lose a point!`); //games tells you you are wrong.
  }
}

//call hints to be updated from class and display
function getHintList() {
  for (let i = 0; i < NUM_HINTS; i++) {
    hintList[i].update();
  }
  let x = random(0, width);
  let y = random(0, height);
  let hint = new Hint(x, y, currentAnimal);
  hintList.push(hint); //push into hintList array
  //Include the real animal in the list hint (key press 'L') - last minute troubleshoot/correction (below).
  push();
  stroke(0, 0, random(0, 255));
  textSize(hintList.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Tahoma");
  stroke(0, 0, random(0, 255));
  strokeWeight(2);
  text(currentAnimal, hintList.x, hintList.y);
  pop();
}

function getHint() {
  if (keyIsPressed) {
    if (key === "a") {
      //display the anagram for a hint to the user.
      push();
      noStroke();
      textSize(enterScreen.size);
      textAlign(CENTER, CENTER);
      textFont("Tahoma");
      fill(255);
      text(anagramCreator(currentAnimal), width / 2, height / 4 - 60); //call anagramCreator function and send the currentAnimal variable to retrieve appropriate anagram.
      pop();
    } else if (key === "l") {
      //shows 8 possible animals (with one correct) at random locations on screen.
      getHintList();
    }
  }
}

//function to record points for each correct guess and display pink circles for points.
function keepScore() {
  if (score >= 1) {
    fill(scoreColor.r, scoreColor.g, scoreColor.b);
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
    // you get 6 animals right, you win, show win screen.
    youWin();
    scoreColor.r = 255; //change text to yellow when you win
    scoreColor.g = 233;
    scoreColor.b = 0;
    responsiveVoice.speak(`You Win! Please refresh to play again!`); //tell user that they win and to refresh. For some reason this is a delayed playback. I have tried many different locations and it never triggers quicker!
  }
}

function youWin() {
  push();
  textSize(40);
  fill(255);
  textSize(winScreen.size);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Tahoma");
  stroke(0, 0, random(0, 255));
  strokeWeight(10);
  text(winScreen.string, winScreen.x, winScreen.y);

  pop();
}

//anagrams were precreated and assigned to appropriate animal with (else if) statements. Function returns anagramAnimal
function anagramCreator(animal) {
  //NOTE TO FUTURE SELF: parameter here is a local variable that exists in this specific function, but when you send a global vaiable from somewhere else ... ie. line 251 - currentAnimal... it will be a different name.
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
  } else if (animal === `Groundhog`) {
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
  return anagramAnimal;
}
