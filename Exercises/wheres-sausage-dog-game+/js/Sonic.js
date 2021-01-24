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
      console.log(`off screen`);
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
    }
  }
}
