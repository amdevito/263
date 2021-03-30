// ///
// E7: Desperately Seeking SadnessPLUSPLUS
// -- plant is trying to get to the water, suns are in the way and dramatically bounce all over the place if collided with too intensely.
//
// Alana DeVito
//
// A plant in search of water in a world with too much sun.
//
// Brief:
// - **DONE*** 1. Change to a different metaphor with different images but the same core idea of collection in a physics based world. - plant searching for water and must navigate through the suns
//
// // - 2. **DONE** Add sound effects  to collection and collision
/// -3. **done** Play with physics options to improve on the 'game feel'
// // - 4. Choose any examples in the Phaser 3 examples and implement the ideas in the game
// //

"use strict";

//fetch audio source set in HTML doc labeled 'droplet'
let droplet = document.getElementById("droplet");

let sizzle = document.getElementById("sizzle");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`,
  },
  scene: [Boot, Play],
};

let game = new Phaser.Game(config);

//function to begin playing the water droplet audio sound effect
function playAudioDrop() {
  droplet.play();
}
function playAudioSiz() {
  sizzle.play();
}
