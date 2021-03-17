///view is the constructor and take an arguement the 'canvas' object that the view is managing
function View(canvas) {
  this.canvas = canvas;
  this.clicks = [];
  this.frameRate = 1000 / 30;
  this.loopRate = 4000;
  this.maxRadius = 80;
}

View.prototype.handleClick = function (event) {
  let view = this;
  let x = event.offsetX;
  let y = event.offsetY;
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
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
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
