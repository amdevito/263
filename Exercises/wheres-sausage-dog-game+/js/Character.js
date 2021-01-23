class Character {
  constructor(x, y, characterImage) {
    this.x = x;
    this.y = y;
    this.image = characterImage;
    this.angle = 0;
  }
  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }
}
