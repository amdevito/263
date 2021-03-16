// Exercise 6: Raving Redactionist++
//A top secret document is shown on screen. On top of the document an animated text types, "** TOP SECRET! DO NOT EXPOSE!**" at the top of the page. Shortly after this happens the blocked out text is revealed. You must click on that exposed text to block it out again. When you click on the text to block it out you can hear the sound of the marker move across the page.
//Brief:
//[X] 'Find a different text to be redacted' Change the text, and redacted different text
//[X] 'Improve visual presentaiton by working with CSS and HTML' -  text types out ''** TOP SECRET! DO NOT EXPOSE! **' first, then the revealing happens - revelation is called after the text type animation is complete.

//[X] "Add audio to the experience" - audio of marker squeaking across page when user clicks on the revealed text.

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
