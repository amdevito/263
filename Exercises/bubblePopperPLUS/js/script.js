/**************************************************
E4: Bubble Popper PLUS
Alana DeVito

Pop bubbles with your index finger as a pin or change to a hand tool and
bounce them around.

Brief:
- change colour when bubbles popped.

- popping sound when bubble popped. Colour of bubble changes when popped?

- start screen

- User closes hand, pin turns into hand and you can bounce bubbles instead. When bounced start flasing.


**************************************************/

//store user's webcam
let video = undefined;

let handpose = undefined;

//the bubble
let bubble = undefined;

//bubble sound
let popSound = undefined;

//hand image tool
let handTool = undefined;

//current set of predictions
let predictions = [];

//declare variables for the digits being used

let tipX = undefined;
let tipY = undefined;
let baseX = undefined;
let baseY = undefined;

let thumbTipX = undefined;
let thumbTipY = undefined;

//starting state is enter
let state = "enter";

//setup text for start up screen
let enterScreen = {
  string: `Pop the bubbles with the \n pin and watch them change colors! \n Your webcam will map your finger to the pin. \n Please CLICK to Begin!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

// How close the thumb tip should be to the index tip to change tools
const MIN_CHANGE_DISTANCE = 100;

//whether or not the user can change the tool currently
let canChange = true;

//load sounds and images used in this game
function preload() {
  popSound = loadSound(`assets/sounds/pop.ogg`);
  handTool = loadImage(`assets/images/handTool.png`);
}

function setup() {
  createCanvas(640, 480);

  setUpEnterScreen();

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
    r: 0,
    g: 100,
    b: 200,
    vx: 0,
    vy: -3,
  };
}

function draw() {
  background(0);

  if (state === `enter`) {
    enterStart();
  } else if (state === `gamePin`) {
    gameStart();
    drawPin();
  } else if (state === `gameHand`) {
    gameStart();
    drawHand();
  }
}

function gameStart() {
  if (predictions.length > 0) {
    let hand = predictions[0];

    let index = hand.annotations.indexFinger;

    let tip = index[3];
    let base = index[0];
    tipX = tip[0];
    tipY = tip[1];
    baseX = base[0];
    baseY = base[1];

    let thumb = hand.annotations.thumb;
    let thumbTip = thumb[3];
    thumbTipX = thumbTip[0];
    thumbTipY = thumbTip[1];

    //if index finger and thumb touch, change to hand image, if hand image is the current state, change to  pin
    let distIndexThumb = dist(tipX, tipY, thumbTipX, thumbTipY);

    if (
      distIndexThumb < MIN_CHANGE_DISTANCE &&
      state === `gamePin` &&
      canChange
    ) {
      state = `gameHand`;
      canChange = false;
    } else if (
      distIndexThumb < MIN_CHANGE_DISTANCE &&
      state === `gameHand` &&
      canChange
    ) {
      state = `gamePin`;
      canChange = false;
    } else if (distIndexThumb > MIN_CHANGE_DISTANCE && !canChange) {
      canChange = true;
    }
    push();
    fill(bubble.r, bubble.g, bubble.b);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);
    pop();

    console.log(distIndexThumb);
  }
}

function drawPin() {
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
  // change colour when popping
  let d = dist(tipX, tipY, bubble.x, bubble.y);
  if (d < bubble.size / 2) {
    popSound.play();
    bubble.x = random(width);
    bubble.y = height;
    if (bubble.r < 255) {
      bubble.r += 30;
    } else if (bubble.r > 254 && bubble.g < 255) {
      bubble.g += 30;
    } else {
      bubble.r = 0;
      bubble.g = 0;
      bubble.b = 255;
    }
  }

  //move the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }
}

function drawHand() {
  push();

  image(handTool, tipX, tipY);

  pop();

  //check bubble bounce
  // change colour when popping
  let d = dist(tipX, tipY, bubble.x, bubble.y);
  if (d < bubble.size / 2) {
    bubble.x += random(width);
    bubble.y += random(height);
    bubble.g = random(0, 255);
  }

  //move the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0 || bubble.x < 0 || bubble.x > 0) {
    bubble.x = random(width);
    bubble.y = height;
  }
}

function mousePressed() {
  if (state === `enter`) {
    state = `gamePin`;
  }
}
function setUpEnterScreen() {
  enterScreen.x = width / 2;
  enterScreen.y = 200;
  enterScreen.vx = 5;
  enterScreen.vy = 1;
  enterScreen.size = 20;
}

function enterStart() {
  background(0);
  textSize(enterScreen.size);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Monaco");

  noStroke();
  text(enterScreen.string, enterScreen.x, enterScreen.y);
}
