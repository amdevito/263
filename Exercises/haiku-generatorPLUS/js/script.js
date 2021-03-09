/**
E5: Haiku Generator ++

Haiku generator PLUS
Alana

Brief

- improve design and animation of the presentation x
- used hover in CSS to make the text slowly bounce x
- add another DOM event into the user interaction that changes the poem somehow (key presses or mouseovers)
--- key press changes font to white
- Use cSS animations  to spice things up x


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

line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

line1P.addEventListener(`mouseenter`, function (event) {
  event.target.style[`color`] = `#3fd76a`;
});
line2P.addEventListener(`mouseenter`, function (event) {
  event.target.style[`color`] = `#fe0078`;
});
line3P.addEventListener(`mouseenter`, function (event) {
  event.target.style[`color`] = `#3fd76a`;
});

line1P.addEventListener(`mouseleave`, function (event) {
  event.target.style[`color`] = `#fe0078`;
});
line2P.addEventListener(`mouseleave`, function (event) {
  event.target.style[`color`] = `#3fd76a`;
});
line3P.addEventListener(`mouseleave`, function (event) {
  event.target.style[`color`] = `#fe0078`;
});

function lineClicked(event) {
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0) {
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
  } else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  }
}

function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
}

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
