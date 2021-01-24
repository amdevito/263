class Sonic extends Character {
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.75;
    this.speed = 15;
  }
  update() {
    super.update();
    if (this.found && this.y) {
      this.angle += this.rotationSpeed;
      this.x += this.speed;
      this.y += this.speed;
      sonicDeath.play();
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
    }
  }
}
