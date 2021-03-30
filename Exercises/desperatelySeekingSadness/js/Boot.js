class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }
  preload() {
    //load assets
    this.load.image(`plant`, `assets/images/plant.png`);
    this.load.image(`water`, `assets/images/water.png`);
    this.load.image(`sun`, `assets/images/sun.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {}

  update() {}
}
