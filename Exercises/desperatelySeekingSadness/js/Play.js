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
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;

    this.sadness = this.physics.add.sprite(x, y, `thumbs-down`);

    this.physics.add.overlap(
      this.avatar,
      this.sadness,
      this.getSad,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

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
