// Exercise 6: Raving Redactionist++
//Brief:
//text types out first, then the revealing happens - need timer to wait before revelation is first called
// Improve visual presentaiton by working with CSS and HTML - do the typing effect
//Click and drag to reveal rather than clicking
//audio of marker squeeking across page when user clicks and drags

"use strict";

let markerCrossOut = undefined;

function preload() {
  markerCrossOut = loadSound(`assets/sounds/marker.wav`);
}

$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 1000);

function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
  markerCrossOut.play(); //
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
