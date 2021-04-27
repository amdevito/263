///View is the constructor and takes an arguement - the 'canvas' object - that the view is managing
class View {
  constructor(canvas) {
    this.canvas = canvas;
    //set click array to collect the location information from the x position determined by the note value, mapped across the x axis
    this.circle = [];
    ///representing the frames per second
    this.frameRate = 20;
    this.loopRate = 10000; ///amount of time before the ripple is redrawn
    this.maxRadius = 100; //set default max radius to 100

    //every 3 seconds draw a black square over thecircles with a low opacity to slowly fade out the past drawn circles
    setInterval(function () {
      let context = canvas.getContext("2d");
      context.fillStyle = "rgba(0,0,0,0.01)";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }, 3000);
  }

  ///draw the circular ripples with x, y, radius and maxradius values.
  addCircle(x, y, maxRadius) {
    view.circle.push({ x: x, y: y, radius: 0, maxRadius: maxRadius });
    // setInterval(function () {
    //   //anonymous function
    //   view.circle[pos - 1].radius = Math.random() * 20;
    // }, view.loopRate); //called every 10 sec.
  }

  //when update  display function called, draw the ripples.
  updateDisplay() {
    let view = this;

    let context = view.canvas.getContext("2d"); //tell the browser how you want to draw in the canvas - '2D', and save in the variable = context

    //for loop interating through the circle array (collecting the number of rings in each ripple)
    for (let i = 0; i < view.circle.length; i++) {
      let circle = view.circle[i];
      let circleMaxRadius = circle.maxRadius;

      //if the ripples'(circle) radius is bigger than the max, stop drawing that ripple and create a new one
      if (circle.radius > circleMaxRadius) continue;
      //grow radius of ripple by a random number at each frame math.random. Creates diff size ripples within each circle (the large, all encompassing ripple.)
      circle.radius += Math.random() * 12;

      ///ripples closer to circleMaxRadius are more transparent.
      let alpha = (circleMaxRadius - circle.radius) / circleMaxRadius;

      ////ripples disappear when reach max radius of the circle
      if (circle.radius > circleMaxRadius) alpha = 0;
      ////
      view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
      circle.x += 0.08; /// move slightly each time to give less robotic look
      circle.y += 0.09; /// move slightly each time to give less robotic look, vary instances where ripples overlap (gives it more depth).
    }
  }
  drawCircle(context, x, y, radius, alpha) {
    if (context.lineWidth <= 20) {
      ///add to alpha parameter, increasing the opacity overall every time a note is played
      alpha += 0.04;

      ///increase size of the ripples everytime a note is played
      context.lineWidth += 0.01; //the circles start with very thin lines and then increase over time until they are beautiful washed out circles of rippled colour, and then start over (see code below)
      context.beginPath(); //context = what you want to do , 'begin to draw ' or 'begin path'
      //draw the circle - x, y = location, radius, starting angle ('0' RADIANS - fraction of constant pi), specify 360 as radians, so 2xPI (math function Math.PI)
      context.arc(x, y, radius, 0, 2 * Math.PI);
      //choosing color based on it's x, y coordinate - alpha will change based on the size of the circle

      //changed to stroke effect, the colours of the previous circles change as you add more circles.
      context.stroke();
      context.strokeStyle =
        "rgba(" +
        (x % 256) +
        ", " +
        (y % 256) +
        ", " +
        ((x * y) % 256) +
        " ," +
        alpha +
        ")";
    } else if (context.lineWidth > 20) {
      ///when ripples line width reaches 20, clear the ripples and start at lineWidth 0.05 again (very thin)
      context.lineWidth = 0.05;

      context.clearRect(0, 0, canvas.width, canvas.height); ///clear previous ripples drawn on canvas
    }
  }
}
