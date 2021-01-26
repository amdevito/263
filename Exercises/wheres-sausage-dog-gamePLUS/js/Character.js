//set class for the Characters and the constructor elements
class Character {
  constructor(x, y, characterImage) {
    this.x = x;
    this.y = y;
    this.image = characterImage;
    this.angle = 0;
  }
  //update each new character with a new display element
  update() {
    this.display();
  }

  //set the character's image aspects, size, location, position
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }
}
