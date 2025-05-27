import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class LevelEnd extends Phaser.Scene {
  private backgroundImage: Phaser.GameObjects.TileSprite;
  private levelBackgroundName: string;
  private levelName: string;
  private isWin: boolean;
  private score: number;

  private database: DBManager;

  private clickSound: Phaser.Sound.BaseSound;

  constructor() {
    super(Constants.SCENES.LEVEL_END);
  }

  init(data: any): void {
    this.levelBackgroundName = data.levelBackgroundName;
    this.levelName = data.levelName;
    this.isWin = data.isWin;
    this.score = data.score;
  }

  create(): void {
    this.backgroundImage = this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        this.levelBackgroundName
      )
      .setOrigin(0, 0)
      .setDepth(-1);

    this.clickSound = this.sound.add(Constants.SOUNDS.EFFECTS.CLICK, {
      loop: false,
      volume: 2,
    });
    if (this.isWin) {
      let scorePad: string = Phaser.Utils.String.Pad(this.score, 4, "0", 1);
      this.add
        .bitmapText(
          this.cameras.main.width / 2,
          100,
          Constants.FONTS.BITMAP,
          Constants.TEXTS.MENU.WIN,
          40
        )
        .setOrigin(0.5, 0.5);
      this.add
        .bitmapText(
          this.cameras.main.width / 2,
          200,
          Constants.FONTS.BITMAP,
          Constants.TEXTS.MENU.SCORE + " " + scorePad,
          40
        )
        .setOrigin(0.5, 0.5);
      this.add
        .bitmapText(
          this.cameras.main.width / 2,
          300,
          Constants.FONTS.BITMAP,
          "NIVEL " + Constants.TEXTS.MENU.PASSED,
          40
        )
        .setOrigin(0.5, 0.5)
        .setTint(0x88e453);

      this.database = new DBManager();
      let level = this.levelName.toLowerCase();

      if (this.database.data.levels[level].score < this.score) {
        this.database.data.levels[level].score = this.score;
        this.database.data.levels[level].isPassed = true;
        this.database.saveDB();
      }
    } else {
      this.add
        .bitmapText(
          this.cameras.main.width / 2,
          100,
          Constants.FONTS.BITMAP,
          Constants.TEXTS.MENU.LOSE,
          40
        )
        .setOrigin(0.5, 0.5);
      this.add
        .bitmapText(
          this.cameras.main.width / 2,
          200,
          Constants.FONTS.BITMAP,
          "NIVEL " + Constants.TEXTS.MENU.NON_PASSED,
          40
        )
        .setOrigin(0.5, 0.5)
        .setTint(0xff0000);
    }
    const backTxtShadow = this.add
      .bitmapText(
        this.cameras.main.width / 8,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.BACK,
        30
      )
      .setTint(0x000000);

    backTxtShadow.x += 2;
    backTxtShadow.y += 2;
    backTxtShadow.setOrigin(0.5, 0.5);

    const backTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.cameras.main.width / 8,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.BACK,
        30
      )
      .setTint(0xffffff)
      .setInteractive();

    backTxt.setOrigin(0.5, 0.5);

    this.changeSceneToMenu(backTxt, Constants.SCENES.LEVEL_SELECTION);

    const rightButtonText = this.isWin
      ? Constants.TEXTS.MENU.NEXT
      : Constants.TEXTS.MENU.RETRY;

    const fontSize = rightButtonText.length > 10 ? 20 : 24;

    const rightTxtShadow = this.add
      .bitmapText(
        (this.cameras.main.width * 7) / 8.5,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        rightButtonText,
        fontSize
      )
      .setTint(0x000000);

    rightTxtShadow.x += 2;
    rightTxtShadow.y += 2;
    rightTxtShadow.setOrigin(0.5, 0.5);

    const rightTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        (this.cameras.main.width * 7) / 8.5,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        rightButtonText,
        fontSize
      )
      .setTint(0xffffff)
      .setInteractive();

    rightTxt.setOrigin(0.5, 0.5);

    rightTxt.on("pointerdown", () => {
      this.database = new DBManager();
      if (this.database.data.effects) {
        this.clickSound.play();
      }

      if (this.isWin) {
        const levelOrder = [
          Constants.SCENES.LEVELS.LEVEL_1,
          Constants.SCENES.LEVELS.LEVEL_2,
          Constants.SCENES.LEVELS.LEVEL_3,
          Constants.SCENES.LEVELS.LEVEL_4,
          Constants.SCENES.LEVELS.LEVEL_5,
        ];
        const currentIndex = levelOrder.indexOf(this.levelName);
        const nextLevel = levelOrder[currentIndex + 1];

        if (nextLevel) {
          this.scene.stop(Constants.SCENES.LEVEL_END);
          this.scene.start(nextLevel);
          this.scene.start(Constants.SCENES.HUD, { levelName: nextLevel });
          this.scene.bringToTop(Constants.SCENES.HUD);
        } else {
          this.scene.start(Constants.SCENES.LEVEL_SELECTION);
        }
      } else {
        this.scene.stop(Constants.SCENES.LEVEL_END);
        this.scene.start(this.levelName);
        this.scene.start(Constants.SCENES.HUD, { levelName: this.levelName });
        this.scene.bringToTop(Constants.SCENES.HUD);
      }
    });
  }

  update(): void {
    this.backgroundImage.tilePositionX -= 0.4;
  }

  changeSceneToMenu(backTxt: Phaser.GameObjects.BitmapText, scene: string) {
    backTxt.on("pointerdown", () => {
      this.database = new DBManager();
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      this.scene.stop(Constants.SCENES.LEVEL_END);
      this.scene.start(scene);
    });
  }
}
