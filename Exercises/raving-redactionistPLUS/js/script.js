// Exercise 6: Raving Redactionist++
//Brief:
//X change the text, and redacted different text
//X Improve visual presentaiton by working with CSS and HTML - do the typing effect text types out** TOP SECRET DO NOT EXPOSE **first, then the revealing happens - need interval to wait before revelation is first called
//
//Click and drag to reveal rather than clicking
//audio of marker squeeking across page when user clicks and drags

"use strict";

let markerCrossOut = document.getElementById("myAudio");

let element = document.getElementById("line-1");

element.addEventListener("animationend", startInterval, false);

$(`.top-secret`).on(`click`, redact);

function startInterval() {
  setInterval(revelation, 1000);
}

function playAudio() {
  markerCrossOut.play();
}

function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
  playAudio();
}

function revelation() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
