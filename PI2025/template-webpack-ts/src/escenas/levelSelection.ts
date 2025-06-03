import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class LevelSelection extends Phaser.Scene {
  private clickSound: Phaser.Sound.BaseSound;
  private database: DBManager;
  private lockSound: Phaser.Sound.BaseSound;
  private width: number;
  private height: number;

  constructor() {
    super(Constants.SCENES.LEVEL_SELECTION);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create() {
    this.clickSound = this.sound.add(Constants.SOUNDS.EFFECTS.CLICK, {
      loop: false,
      volume: 2,
    });
    this.lockSound = this.sound.add(Constants.SOUNDS.EFFECTS.LOCK, {
      loop: false,
      volume: 1,
    });
    this.database = new DBManager();
    this.createTexts();
    this.createBackground();
  }

  createTexts() {
    const db = new DBManager();

    const levels = [
      {
        key: "level01",
        text: Constants.TEXTS.MAPS.LEVEL_1,
        scene: Constants.SCENES.LEVELS.LEVEL_1,
        x: this.cameras.main.width / 3.5,
        y: this.cameras.main.height / 3,
      },
      {
        key: "level02",
        text: Constants.TEXTS.MAPS.LEVEL_2,
        scene: Constants.SCENES.LEVELS.LEVEL_2,
        x: this.cameras.main.width / 1.5,
        y: this.cameras.main.height / 3,
      },
      {
        key: "level03",
        text: Constants.TEXTS.MAPS.LEVEL_3,
        scene: Constants.SCENES.LEVELS.LEVEL_3,
        x: this.cameras.main.width / 3.5,
        y: this.cameras.main.height / 2,
      },
      {
        key: "level04",
        text: Constants.TEXTS.MAPS.LEVEL_4,
        scene: Constants.SCENES.LEVELS.LEVEL_4,
        x: this.cameras.main.width / 1.5,
        y: this.cameras.main.height / 2,
      },
      {
        key: "level05",
        text: Constants.TEXTS.MAPS.LEVEL_5,
        scene: Constants.SCENES.LEVELS.LEVEL_5,
        x: this.cameras.main.width / 2,
        y: this.cameras.main.height / 1.5,
      },
    ];

    levels.forEach((level) => {
      const isAccessible = db.canAccessLevel(level.key);

      const displayText = isAccessible ? level.text : `${level.text}`;
      const tintColor = isAccessible ? 0xffffff : 0x888888;

      const shadow = this.add
        .bitmapText(level.x, level.y, Constants.FONTS.BITMAP, displayText, 30)
        .setTint(0x000000)
        .setOrigin(0.5, 0.5);
      shadow.x += 2;
      shadow.y += 2;

      const button = this.add
        .bitmapText(level.x, level.y, Constants.FONTS.BITMAP, displayText, 30)
        .setTint(tintColor)
        .setOrigin(0.5, 0.5);

      if (isAccessible) {
        button.setInteractive();
        this.changeSceneToLevel(button, level.scene);
      } else {
        button.setInteractive();
        button.on("pointerdown", () => {
          button.disableInteractive();
          this.lockSound.play();
          this.tweens.add({
            targets: button,
            x: button.x + 5,
            duration: 50,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
              button.x = level.x;
              button.setInteractive();
            },
          });
        });

        this.add
          .text(level.x + 50, level.y - 15, "🔐", {
            font: "38px Arial",
            color: "#888888",
          })
          .setOrigin(-1.2, 0.2);
      }
    });

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

    const backTxt = this.add
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
    this.changeSceneToMenu(backTxt, Constants.SCENES.MENU);
  }

  createBackground() {
    this.add.image(this.width / 2, this.height / 2, Constants.BACKGROUNDS.MENU)
      .setScale(0.6)
      .setAlpha(0.7)
      .setOrigin(0.5, 0.5).setDepth(-1);
    this.add
      .image(this.width / 2, this.height / 2, Constants.OBJECTS.LOGO)
      .setScale(.85)
      .setOrigin(0.47, 0.47).setDepth(-1)
      .setTint(0x0000);
    this.add
      .image(this.width / 2, this.height / 2, Constants.OBJECTS.LOGO)
      .setScale(.8)
      .setAlpha(.6).setDepth(-1)
      .setOrigin(0.5, 0.5);
  }

  changeSceneToMenu(backTxt: Phaser.GameObjects.BitmapText, scene: string) {
    backTxt.on("pointerdown", () => {
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      this.scene.stop(Constants.SCENES.SETTINGS);
      this.scene.start(scene);
    });
  }

  changeSceneToLevel(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
    playTxt.on("pointerdown", () => {
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      playTxt.disableInteractive();
      this.cameras.main.fade(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.sound.stopAll();
        this.scene.start(scene);
        this.scene.start(Constants.SCENES.HUD, { levelName: scene });
        this.scene.bringToTop(Constants.SCENES.HUD);
      });
    });
  }
}
