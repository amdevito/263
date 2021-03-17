///view is the constructor and take an arguement the 'canvas' object that the view is managing
function View(canvas) {
  this.canvas = canvas;
  //set click array to collect the click location information
  this.clicks = [];
  this.frameRate = 1000 / 30;
  this.loopRate = 4000;
  this.maxRadius = 80;
}

//handle the click location on the canvas and pass to an array
View.prototype.handleClick = function (event) {
  let view = this;
  //coordinates of the mouse when clicking
  let x = event.offsetX;
  let y = event.offsetY;

  //push the mouse coordinate click location into an array - (event.offsetX, event.offsetY, radius (which is currently set at 0, because it will grow))
  let pos = view.clicks.push({ x: x, y: y, radius: 0 });
  Audio.play(x % 10);
  setInterval(function () {
    view.clicks[pos - 1].radius = 0;
    Audio.play(x % 10);
  }, view.loopRate);
};

//prototypes in JavaScript - All JavaScript objects inherit properties and methods from a prototype, The JavaScript prototype property allows you to add new properties to object constructors. The JavaScript prototype property also allows you to add new methods to objects constructors.
View.prototype.updateDisplay = function () {
  let view = this;

  let context = view.canvas.getContext("2d"); //tell the browser how you want to draw in the canvas - '2D', and save in the variable = context
  context.clearRect(0, 0, view.canvas.width, view.canvas.height);
  context.fillStyle = "black"; //what colour you are filling the above rectangle
  context.fillRect(0, 0, view.canvas.width, view.canvas.height); //draw the rectangle starting at point 0, 0 and fill the entire canvas's width and height

  for (let i = 0; i < view.clicks.length; i++) {
    let circle = view.clicks[i];
    if (circle.radius > view.maxRadius) continue;
    circle.radius += 1;

    let alpha = 0.7;
    if (circle.radius > view.maxRadius - 15) {
      alpha = (view.maxRadius - circle.radius) / 10;
    }
    view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
  }
};

View.prototype.drawCircle = function (context, x, y, radius, alpha) {
  context.beginPath(); //context = what you want to do , 'begin to draw ' or 'begin path'
  //draw the circle - x, y = location, radius, starting angle ('0' RADIANS - fraction of constant pi), specify 360 as radians, so 2xPI (math function Math.PI)
  context.arc(x, y, radius, 0, 2 * Math.PI);
  //choosing color based on it's x, y coordinate - alpha will change based on the size of the circle
  //IDEA? instead of filled circles - make it the ouline and have them grow and disappear and fade rather than shrink - stroke? strokeStyle and then stroke weight needs to be defined? can a sparkle also happen?
  context.fillStyle =
    "rgba(" +
    (x % 256) +
    ", " +
    (y % 256) +
    ", " +
    ((x * y) % 256) +
    " ," +
    alpha +
    ")";
  context.fill();
};
