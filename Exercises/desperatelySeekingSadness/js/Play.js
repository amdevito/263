class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  create() {
    //create the avatar
    this.avatar = this.physics.add.sprite(400, 300, `avatar`);
    //stop avatar from exiting screen
    this.avatar.setCollideWorldBounds(true);

    ///place thrumbs-down sprite at a random location on the screen
    let x = Math.random() * this.sys.canvas.width; //access width
    let y = Math.random() * this.sys.canvas.height; //access height

    //place the thumbs down at those random x and y location
    this.sadness = this.physics.add.sprite(x, y, `thumbs-down`);

    ///place multiple thumbs up on screen with physics attributes attached
    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 80,
      bounceX: 0.5,
      bounceY: 0.5,
      CollideWorldBounds: true,
      dragX: 50,
      dragY: 50,
    });
    Phaser.Actions.RandomRectangle(
      this.happiness.getChildren(),
      this.physics.world.bounds
    );
    //check for the overlap of avatar and sprite
    this.physics.add.overlap(
      this.avatar, //check overlap with avatar
      this.sadness, ///check overlap with thumbs-down (sadness)
      this.getSad, //when overlap happens call getSad function, which resets the sprite
      null, ///no other method needed once the function is called
      this //telling it to use this scene when getSad is called
    );

    ///add collison physics between the avatar and the thumbs up sprite
    this.physics.add.collider(this.avatar, this.happiness);

    //add physics collider on the group
    this.physics.add.collider(this.happiness, this.happiness);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  //when the overlap happens between avatar and sadness, reset the sprite
  getSad(avatar, sadness) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness.setPosition(x, y);
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
