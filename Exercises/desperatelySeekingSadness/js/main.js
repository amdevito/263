/**
E7: Desperately Seeking SadnessPLUSPLUS
-- plant is trying to get to the water, suns are in the way and dramatically bounce all over the place if collided with too intensely.

Alana DeVito

An emoji in search of satisfying sadness in a world of positivity

Brief:

- 2. Add sound effects  to collection and collision (see redactionist code)
- Choose any examples in the Phaser 3 examples and implement the ideas in the game
- **DONE*** 1. Change to a different metaphor with different images but the same core idea of collection in a physics based world. - plant searching for water and must navigate through the suns
*/

"use strict";

//fetch audio source set in HTML doc labeled 'droplet'
let droplet = document.getElementById("droplet");

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
function playAudio() {
  droplet.play();
}
