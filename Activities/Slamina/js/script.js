/**************************************************
A2: Slamina Activity
Alana DeVito

Practicing voice responsive and annyang voice recognition.
plan
-animal name list
-choose animal to say backwards
-setup annyang to listen to guesses
display whether a guess is right or wrong

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

  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

function mousePressed() {
  currentAnimal = random(animals);
  anagramCreator();
  // let reverseAnimal = reverseString(currentAnimal);
  // responsiveVoice.speak(reverseAnimal);
}

function guessAnimal(animal) {
  currentAnswer = animal;
  console.log(currentAnswer);
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
