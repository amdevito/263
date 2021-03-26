/**
E7: Desperately Seeking SadnessPLUSPLUS

Alana DeVito

An emoji in search of satisfying sadness in a world of positivity

Brief:

- Add sound effects  to collection and collision (see redactionist code)
- Choose any examples in the Phaser 3 examples and implement the ideas in the game
- Change to a different metaphor with different images but the same core idea of collection in a physics based world.
*/

"use strict";

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
