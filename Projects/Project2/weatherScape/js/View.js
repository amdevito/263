///view is the constructor and takes an arguement - the 'canvas' object - that the view is managing
class View {
  constructor(canvas) {
    this.canvas = canvas;
    //set click array to collect the click location information
    this.circle = [];
    ///representing the frames per second - 3o frames per second.
    // this.frameRate = 1000 / 30;
    this.frameRate = 20;
    this.loopRate = 10000; ///amount of time before the circle is redrawn - 10sec. nice and slow. **MAP THE HIDDEN DIALOG CHOICES FOR REPLAY RATE HERE.
    this.maxRadius = 100; //*** IF BIGGER IS CHOSEN ADD 20 FOR BIGGER, MINUS 20 FOR SMALLER.

    ///when clicking the first group of radio buttons, change the size of the ripples - bigger to 300, smaller to 50 and normal, back to 100
    // //event listener on the clicking action of the radio buttons.
    // $(`#radio-1`).on(`click`, () => {
    //   this.maxRadius = 300; //big
    // });
    // $(`#radio-2`).on(`click`, () => {
    //   this.maxRadius = 50; //small
    // });
    // $(`#radio-3`).on(`click`, () => {
    //   this.maxRadius = 100; //back to normal
    // });
    //
    // //when clicking the next round of radio buttons, change the replay delay time on the ripple and tone play back
    // $(`#radio-4`).on(`click`, () => {
    //   this.loopRate = 3000; /// 3 seconds
    // });
    // $(`#radio-5`).on(`click`, () => {
    //   this.loopRate = 6000; ///6 seconds
    // });
    // $(`#radio-6`).on(`click`, () => {
    //   this.loopRate = 9000; /// 9 seconds
    // });
    // $(`#radio-7`).on(`click`, () => {
    //   this.loopRate = 12000; /// 12 seconds
    // });
    //every 3 seconds draw a black square over thecircles with a low opacity to slowly fade out the past drawn circles
    setInterval(function () {
      let context = canvas.getContext("2d");
      context.fillStyle = "rgba(0,0,0,0.01)";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }, 3000);
  }

  ///>>>>
  ///>>>!!! THIS NEED TO BE TRIGGERED WHEN playNotes function at weatherScape.js plays a note, rather than on the click
  ///>>>rather than take the position of the x click on canvas to pick the note, have the index of the note played from the array determine the position of the rings appearing on the canvas
  ///
  ///
  ////
  //handle the click location on the canvas and pass to an array
  // handleClick(event) {
  //   let view = this;
  //   //coordinates of the mouse when clicking - make these coorinates determined by something else
  //   let x = event.offsetX;
  //   let y = event.offsetY;
  //
  //   //push the mouse coordinate click location into an array - (event.offsetX, event.offsetY, radius (which is currently set at 0, because it will grow))
  //   //pos is the variable storing the length of the array
  //   let pos = view.circle.push({ x: x, y: y, radius: 0 });
  //   Audio.play(x % 10); //play the audio file when the circle begins to animate (when the circle radius is 0)( this is the initial CLICK )
  //   //timer to reset the radius to a random number to create more variance in the ripples (rather than just to 0)
  //   //!!>>could also vary the interval here by math random, but * a variable in the weather data.
  //   setInterval(function () {
  //     //anonymous function
  //     view.circle[pos - 1].radius = Math.random() * 20;
  //     x += 1; // addind this makes the sounds that play back (the repeated trigger) vary at each repeat
  //     Audio.play(x % 10); //get a number between 0 and 9, based on the x location of the circle - x % (modulus) 10: divide x by 10 and take the remainder - the width of the canvas is 1000, returning an number divisible by 10.
  //     //the location of the x value determines which sounds is played CHANGE THIS TO SOMETHING MORE RESPONSIVE? X AND Y?  THE CHANGING WEATHER? SOMETHING IN THE WEATHER THAT CHANGES REGULARLY?
  //   }, view.loopRate); //called every 10 sec.
  // }

  addCircle(x, y, maxRadius) {
    view.circle.push({ x: x, y: y, radius: 0, maxRadius: maxRadius });
    // setInterval(function () {
    //   //anonymous function
    //   view.circle[pos - 1].radius = Math.random() * 20;
    // }, view.loopRate); //called every 10 sec.
  }

  updateDisplay() {
    //setting to the view object
    //setting to the view object
    let view = this;

    let context = view.canvas.getContext("2d"); //tell the browser how you want to draw in the canvas - '2D', and save in the variable = context

    // Draw transparent rect over canvas (to gradually erase current circles
    // context.beginPath();
    // context.fillStyle = "rgba(0, 0, 0, 0.1)"; // Transparent fill
    // context.rect(0, 0, view.canvas.width, view.canvas.height); // Rectangle over whole canvas
    // context.fillStyle = "rgba(0, 0, 0, 0)"; // Removing fill for the circles later on
    // context.endPath();

    // Then the rest of updateDisplay down here...

    // context.clearRect(0, 0, view.canvas.width, view.canvas.height);
    // context.fillStyle = "black"; //what colour you are filling the above rectangle
    // context.fillRect(0, 0, view.canvas.width, view.canvas.height); //draw the rectangle starting at point 0, 0 and fill the entire canvas's width and height

    //for loop interating through the circle array (collecting the number of circle)
    for (let i = 0; i < view.circle.length; i++) {
      let circle = view.circle[i];
      let circleMaxRadius = circle.maxRadius;

      //if the circle's radius is bigger than the max, stop drawing that circle and create a new one
      if (circle.radius > circleMaxRadius) continue;
      //grow radius of circle by a random number at each frame math.radom here creates diff size ripples
      circle.radius += Math.random() * 12;

      ///maybe have the circles shrink at a setInterval? or when they get to a certain alpha value?
      // console.log(circleMaxRadius);
      let alpha = (circleMaxRadius - circle.radius) / circleMaxRadius;

      if (circle.radius > circleMaxRadius) alpha = 0;

      view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
      circle.x += 0.08; /// add by fractals?
      circle.y += 0.09; // circles move slightly giveing a blurred movement effect - change this to switch between x and y? or negative and positive?
    }
  }
  drawCircle(context, x, y, radius, alpha) {
    if (context.lineWidth <= 25) {
      alpha += 0.04;
      // context.lineWidth = 4;
      //interesting pattern
      context.lineWidth += 0.01; //the circles start with very thin lines and then increase over time until they are beautiful washed out circles of rippled colour
      context.beginPath(); //context = what you want to do , 'begin to draw ' or 'begin path'
      //draw the circle - x, y = location, radius, starting angle ('0' RADIANS - fraction of constant pi), specify 360 as radians, so 2xPI (math function Math.PI)
      context.arc(x, y, radius, 0, 2 * Math.PI);
      //choosing color based on it's x, y coordinate - alpha will change based on the size of the circle
      //IDEA? instead of filled circles - make it the ouline and have them grow and disappear and fade rather than shrink - stroke? strokeStyle and then stroke weight needs to be defined? can a sparkle also happen?
      //
      //changed to stroke effect, now the colours of the previous circles change as you add more circles.
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
      //removing the bottom line creates a really beautiful pattern with the circles becoming more like ripples and overlapping
      // context.fill();
    } else if (context.lineWidth > 25) {
      context.lineWidth = 0.05;

      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    console.log("line width: " + context.lineWidth);
  }
}
