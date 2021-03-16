// Exercise 6: Raving Redactionist++
//A top secret document is shown on screen. On top of the document an animated text types, "** TOP SECRET! DO NOT EXPOSE!**" at the top of the page. Shortly after this happens the blocked out text is revealed. You must click on that exposed text to block it out again. When you click on the text to block it out you can hear the sound of the marker move across the page.

//Brief:
//[X] 'Find a different text to be redacted' Change the text, and redacted different text
//[X] 'Improve visual presentation by working with CSS and HTML' -  text types out ''** TOP SECRET! DO NOT EXPOSE! **' first, then the revealing happens - revelation is called after the text type animation is complete. Also changed the secret text to red with a line-through instead of line under.

//[X] "Add audio to the experience" - audio of marker squeaking across page when user clicks on the revealed text.

"use strict";
//fetch audio source set in HTML doc labeled 'marker'
let markerCrossOut = document.getElementById("marker");

//set line-1 ID in HTML to the element variable
let element = document.getElementById("title-typed");

//when the typing animation finishes call startInterval to start revealing the hidden text
element.addEventListener("animationend", startInterval, false);

//using JQUERY - when clicking on the top-secret sections, call redact to cover them up with a black box
$(`.top-secret`).on(`click`, redact);

//this function starts the setInterval function that reveals text elements every 1 second. it will be called only after the typing animation is finished
function startInterval() {
  setInterval(revelation, 1000);
}

//function to begin playing the marker writing audio sound effect
function playAudio() {
  markerCrossOut.play();
}

//cross out the text that is clicked - so the reealed class is removed or stopped and the redacted class is reinstated.
function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
  playAudio();
}

//revelation occurs at each of the items with the class 'redacted'- at those the attemptReveal function determines which text is revealed at each 1 second interval
function revelation() {
  $(`.redacted`).each(attemptReveal);
}

//random numbers (between 0-1) are called and set to the variable 'r', if the numbers are less than 0.1, the class 'redacted' is removed and the class 'revealed' is added, exposing the text.
function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
