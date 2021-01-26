//take character class and use elements for the sonic character
class Sonic extends Character {
  constructor(x, y, image) {
    super(x, y, image);
    this.found = false; // start out as 'not found'
    this.rotationSpeed = 1; //sonic spins when clicked
    this.speed = 15; //set speed that sonic moves when clicked
  }

  update() {
    super.update();
    if (this.found) {
      // when Sonic is found (i.e. clicked), sonic spins fast and diagonally off screen.
      this.angle += this.rotationSpeed;
      this.x += this.speed;
      this.y += this.speed;
    }

    if (this.y > height || this.x > width) {
      //when sonic moves off screen, state changes to 'end' and gameEnd function is called, setting the end screen for game.
      state = `end`;
    }
  }
  mousePressed() {
    //if mouse pressed occurs on the Sonic character, this.found changes from false to true.
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      this.found = true;
      //BELOW is left so that I can try and make it work eventually:
      let panning = map(this.x, 0, width, -1.0, 1.0);
      // << panning is mapped to the sonic character's movement direction
      sonicDeath.pan(panning); // << I would like to make this work so that the sound pans with the direction of the Sonic movement
      gameMusic.stop();
      sonicDeath.play(); //Sonic Death song plays when Sonic is 'found', i.e. is clicked.
    }
  }
}
