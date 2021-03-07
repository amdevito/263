/**
Haiku generator
Alana
Generates a random haiku

*/

"use strict";

let fiveSyllableLines = [
  `Gosh, all love is free`,
  `The plants breathe their best`,
  `Everything is rare`,
  `We to be and I`,
  `All I see is you`,
];

let sevenSyllableLines = [
  `I cannot love anyone well`,
  `There is nothing but nothing`,
  `Anywhere love is, you are`,
  `Best be things I cannot see`,
  `Earth is witch but which is earth`,
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
  console.log(index);
}
