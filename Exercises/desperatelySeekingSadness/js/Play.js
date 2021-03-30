class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  create() {
    //create the avatar
    this.avatar = this.physics.add.sprite(400, 300, `plant`);
    //stop avatar from exiting screen
    this.avatar.setCollideWorldBounds(true);

    ///place thrumbs-down sprite at a random location on the screen
    let x = Math.random() * this.sys.canvas.width; //access width
    let y = Math.random() * this.sys.canvas.height; //access height

    //place the thumbs down at those random x and y location
    this.water = this.physics.add.sprite(x, y, `water`);

    ///place multiple thumbs up on screen with physics attributes attached
    this.sun = this.physics.add.group({
      key: `sun`,
      quantity: 30,
      bounceX: 2, //increased sun bouncing
      bounceY: 2, //increased sun bouncing
      CollideWorldBounds: true,
      dragX: 400, //increase drag
      dragY: 400, // increase drag, make more difficult for plant to get to water
    });
    Phaser.Actions.RandomRectangle(
      this.sun.getChildren(),
      this.physics.world.bounds
    );
    //check for the overlap of avatar and sprite
    this.physics.add.overlap(
      this.avatar, //check overlap with avatar
      this.water, ///check overlap with water droplet
      this.getWater, //when overlap happens call getWater function, which resets the sprite
      null, ///no other method needed once the function is called
      this //telling it to use this scene when getWater is called
    );

    ///add collison physics between the avatar and the sun sprite
    this.physics.add.collider(this.avatar, this.sun, this.getSun); //call getSun function to play the sizzle sound on collision between plant and sun

    //add physics collider on the group
    this.physics.add.collider(this.sun, this.sun);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  getSun(avatar, happiness) {
    playAudioSiz();
  }

  //when the overlap happens between avatar and water droplet, reset the sprite
  getWater(avatar, water) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.water.setPosition(x, y);
    playAudioDrop();
  }

  update() {
    this.handleInput();
  }
  /**
  Moves the avatar based on the arrow keys for rotation and thrust
  */
  handleInput() {
    // If either left or right is pressed, rotate appropriately
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    }
    // Otherwise stop rotating
    else {
      this.avatar.setAngularVelocity(0);
    }

    // If the up key is pressed, accelerate in the current rotation direction
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.avatar.rotation,
        200,
        this.avatar.body.acceleration
      );
    }
    // Otherwise, zero the acceleration
    else {
      this.avatar.setAcceleration(0);
    }
  }
}
