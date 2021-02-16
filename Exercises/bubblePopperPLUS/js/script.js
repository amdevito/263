/**************************************************
E4: Bubble Popper PLUS
Alana DeVito

Pop bubbles with your index finger as a pin!

Brief:
- change colour when bubbles popped.

- popping sound when bubble popped. Colour of bubble changes when popped?

- start screen

- when poped bubbles, use Open Sound Control to affect a hydra drawing online.

>>>>
User closes hand, pin turns into hand and you can bounce bubbles instead. When bounced start flasing.
- Let the user change between different tools by closing and opening their hand? -

(How would you detect a closed hand? Their finger-tips would be closer than usual to the base of their palm…)
- count how many bubbles the user pops

**************************************************/

// setup()
//
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

let state = "enter";

let enterScreen = {
  string: `Pop the bubbles with the \n pin and watch them change colors! \n Your webcam will map your finger to the pin. \n Please CLICK to Begin!`,
  x: undefined,
  y: undefined,
  vx: undefined,
  vy: undefined,
  size: undefined,
};

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
  } else if (state === `game`) {
    gameStart();
    drawPin();
  } else if (state === `gameHand`) {
    gameState();
    drawHand();
  }
}

function gameStart() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let thumb = hand.annotations.thumb;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    //if index finger and thumb touch, change to hand image, if hand image is the current state, change to  pin
    let distIndexThumb = dist(tipX, tipY, thumbTipX, thumbTipY);

    if (distIndexThumb < 2 && state === `game`) {
      state = `gameHand`;
    } else if (distIndexThumb < 2 && state === `gameHand`) {
      state = "game";
    }

    push();
    fill(bubble.r, bubble.g, bubble.b);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);
    pop();
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

  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(baseX, baseY, 20);
  pop();
}

function mousePressed() {
  if (state === `enter`) {
    state = `game`;
  }
}
