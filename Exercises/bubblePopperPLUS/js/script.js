/**************************************************
E4: Bubble Popper PLUS
Alana DeVito

Pop bubbles with your index finger as a pin!

Brief:
- count how many bubbles the user pops
- popping sound when bubble popped. Colour of bubble changes when popped?
- Let the user change between different tools by closing and opening their hand?
(How would you detect a closed hand? Their finger-tips would be closer than usual to the base of their palm…)
Or
- Put a different tool on each finger of the user’s hand? - image?

**************************************************/

// setup()
//
//store user's webcam
let video = undefined;

let handpose = undefined;

//the bubble
let bubble = undefined;

//current set of predictions
let predictions = [];

function setup() {
  createCanvas(640, 480);

  //access user;s webcam
  video = createCapture(VIDEO);
  video.hide();

  //load the andpose model

  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log("Model Loaded.");
  });

  //listen for predictions
  handpose.on("predict", function (results) {
    console.log(results);
    predictions = results;
  });

  // our bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -3,
  };
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    push();
    noFill();
    stroke(255);
    line(baseX, baseY, tipX, tipY);
    strokeWeight(2);
    pop();

    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }

  //move the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
