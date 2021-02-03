//set class for the hints and the constructor elements
class Hint {
  constructor(x, y, hint) {
    this.x = x;
    this.y = y;
    this.string = hint;
  }
  //update each new hint with a new display element
  update() {
    this.display();
  }

  //set the hint's image aspects, size, location, position
  display() {
    push();
    stroke(0, 0, random(0, 255));
    textSize(15);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textFont("Tahoma");
    stroke(0, 0, random(0, 255));
    strokeWeight(2);
    text(this.string, this.x, this.y);
    pop();
  }
}
