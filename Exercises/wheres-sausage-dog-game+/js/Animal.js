class Animal {
  constructor(x, y, animalImage) {
    this.x = x;
    this.y = y;
    this.image = animalImage;
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
