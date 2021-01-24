class Sonic extends Character {
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.85;
    this.speed = 15;
  }
  update() {
    super.update();
    if (this.found) {
      this.angle += this.rotationSpeed;
      this.x += this.speed;
      this.y += this.speed;
    }
    if (this.y > height || this.x > width) {
      state = `end`;
    }
  }
  mousePressed() {
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      this.found = true;
      // let panning = map(Sonic.x, 0, width, -1.0, 1.0);
      // sonicDeath.pan(panning);// << I would like to make this work so that the sound pans with the direction of the Sonic movement
      // gameMusic.stop();
      sonicDeath.play(); //moving it here makes the tone not layer and go weird
    }
  }
}
