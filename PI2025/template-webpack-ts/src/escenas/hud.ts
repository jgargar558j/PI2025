import Constants from "../constantes";
import LevelHandler from "./levelHandler";

export default class HUD extends Phaser.Scene {
  private lifesTxt: Phaser.GameObjects.BitmapText;
  private scoreTxt: Phaser.GameObjects.BitmapText;
  private timeTxt: Phaser.GameObjects.BitmapText;

  private level: LevelHandler;
  private levelName: string;

  private leftControl: Phaser.GameObjects.Sprite;
  private rightControl: Phaser.GameObjects.Sprite;
  private upControl: Phaser.GameObjects.Sprite;

  constructor() {
    super(Constants.SCENES.HUD);
  }

  init(data: any): void {
    this.levelName = data.levelName;
  }

  create(): void {
    this.level = <LevelHandler>this.scene.get(this.levelName);
    this.level.events.on(Constants.EVENTS.LIFES, this.updateLifes, this);
    this.level.events.on(Constants.EVENTS.SCORE, this.updateScore, this);
    this.level.events.on(Constants.EVENTS.TIME, this.updateTime, this);

    if (this.sys.game.device.input.touch) {
      this.createHudControls();
    }

    this.lifesTxt = this.add.bitmapText(
      20,
      20,
      Constants.FONTS.BITMAP,
      "VIDAS:3",
      20
    );
    this.scoreTxt = this.add.bitmapText(
      20,
      50,
      Constants.FONTS.BITMAP,
      "SCORE:0",
      20
    );
    this.timeTxt = this.add.bitmapText(
      this.cameras.main.width / 2,
      20,
      Constants.FONTS.BITMAP,
      "05:00",
      20
    );
  }

  private updateLifes(): void {
    this.lifesTxt.text =
      "VIDAS:" + this.registry.get(Constants.GLOBAL_VARIABLES.LIFES);
  }
  private updateScore(): void {
    this.scoreTxt.text =
      "SCORE:" + this.registry.get(Constants.GLOBAL_VARIABLES.SCORE);
  }

  private updateTime(): void {
    this.timeTxt.text = this.registry.get(Constants.GLOBAL_VARIABLES.TIME);
  }

  createHudControls() {
    this.input.addPointer(2);

    const controlSize = 100;
    const padding = 1;
    const scaleFactor = 0.15;

    const baseXRight = this.cameras.main.width - controlSize - padding;
    const baseY = this.cameras.main.height - controlSize - padding;

    this.leftControl = this.add
      .sprite(
        baseXRight - controlSize - padding,
        baseY,
        Constants.CONTROLS.LEFT
      )
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setScale(scaleFactor);

    this.rightControl = this.add
      .sprite(baseXRight, baseY, Constants.CONTROLS.RIGHT)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setScale(scaleFactor);

    const baseXLeft = controlSize + padding;
    this.upControl = this.add
      .sprite(baseXLeft, baseY, Constants.CONTROLS.UP)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setScale(scaleFactor);

    this.leftControl.on("pointerdown", () => {
      this.level.player.leftControl = true;
    });
    this.leftControl.on("pointerup", () => {
      this.level.player.leftControl = false;
    });

    this.rightControl.on("pointerdown", () => {
      this.level.player.rightControl = true;
    });
    this.rightControl.on("pointerup", () => {
      this.level.player.rightControl = false;
    });

    this.upControl.on("pointerdown", () => {
      this.level.player.upControl = true;
    });
    this.upControl.on("pointerup", () => {
      this.level.player.upControl = false;
    });

    const controlContainer = this.add.container(0, 0);
    controlContainer.add([this.leftControl, this.rightControl, this.upControl]);
    controlContainer.setAlpha(0.8).setScrollFactor(0).setDepth(5);
  }
}
