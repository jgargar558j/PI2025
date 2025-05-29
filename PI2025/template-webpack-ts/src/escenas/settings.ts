import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class Settings extends Phaser.Scene {
  private backgroundMusic: Phaser.Sound.BaseSound;

  private clickSound: Phaser.Sound.BaseSound;

  private database: DBManager;

  constructor() {
    super(Constants.SCENES.SETTINGS);
  }

  create() {
    this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo")
      .setScale(0.4)
      .setAlpha(0.5)
      .setOrigin(0.5, 0.5);
    this.database = new DBManager();

    this.cameras.main.setBackgroundColor("#f09cbd");
    this.clickSound = this.sound.add(Constants.SOUNDS.EFFECTS.CLICK, {
      loop: false,
      volume: 2,
    });
    this.createTexts();

    this.backgroundMusic = this.registry.get(
      "backgroundMusic"
    ) as Phaser.Sound.BaseSound;

    let musicOnOff: Phaser.GameObjects.Image = this.add
      .image(
        this.cameras.main.width / 3,
        this.cameras.main.height / 2.5,
        this.getSoundImg(this.database.data.music)
      )
      .setScale(0.1)
      .setInteractive();
    let effectsOnOff: Phaser.GameObjects.Image = this.add
      .image(
        this.cameras.main.width / 3,
        this.cameras.main.height / 1.6,
        this.getSoundImg(this.database.data.effects)
      )
      .setScale(0.1)
      .setInteractive();

    musicOnOff.on("pointerdown", () => {
      this.clickSound.play();
      this.database.data.music = !this.database.data.music;
      this.database.saveDB();
      musicOnOff.setTexture(this.getSoundImg(this.database.data.music));

      if (!this.database.data.music) {
        this.backgroundMusic.stop();
      } else {
        this.backgroundMusic.play();
      }
    });
    effectsOnOff.on("pointerdown", () => {
      this.database.data.effects = !this.database.data.effects;
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      this.database.saveDB();
      effectsOnOff.setTexture(this.getSoundImg(this.database.data.effects));
    });
  }

  getSoundImg(sound: boolean): string {
    return sound ? Constants.SETTINGS.SOUND_ON : Constants.SETTINGS.SOUND_OFF;
  }

  createTexts() {
    const settingsTxtShadow = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 8,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        50
      )
      .setTint(0x000000);

    settingsTxtShadow.x += 4;
    settingsTxtShadow.y += 4;
    settingsTxtShadow.setOrigin(0.5, 0.5);

    const settingsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 8,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        50
      )
      .setTint(0xffffff);

    settingsTxt.setOrigin(0.5, 0.5);

    const musicTxtShadow = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2.5,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.MUSIC,
        20
      )
      .setTint(0x000000);

    musicTxtShadow.x += 2;
    musicTxtShadow.y += 2;
    musicTxtShadow.setOrigin(0.5, 0.5);

    const musicTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2.5,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.MUSIC,
        20
      )
      .setTint(0xffffff);

    musicTxt.setOrigin(0.5, 0.5);

    const effectsTxtShadow = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 1.6,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.EFFECTS,
        20
      )
      .setTint(0x000000);

    effectsTxtShadow.x += 2;
    effectsTxtShadow.y += 2;
    effectsTxtShadow.setOrigin(0.5, 0.5);

    const effectsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 1.6,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.EFFECTS,
        20
      )
      .setTint(0xffffff);

    effectsTxt.setOrigin(0.5, 0.5);

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

    this.changeSceneToMenu(backTxt, Constants.SCENES.MENU);

    const synchronizeTxtShadow = this.add
      .bitmapText(
        this.cameras.main.width / 1.5,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SYNCHRONIZE,
        30
      )
      .setTint(0x000000);

    synchronizeTxtShadow.x += 2;
    synchronizeTxtShadow.y += 2;
    synchronizeTxtShadow.setOrigin(0.5, 0.5);

    const synchronizeTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.cameras.main.width / 1.5,
        this.cameras.main.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SYNCHRONIZE,
        30
      )
      .setTint(0xffffff)
      .setInteractive();

    synchronizeTxt.setOrigin(0.5, 0.5);

    this.synchronizeData(synchronizeTxt);
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

  synchronizeData(synchronizeTxt: Phaser.GameObjects.BitmapText) {
    synchronizeTxt.on("pointerdown", () => {
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      synchronizeTxt.disableInteractive();
      this.showSyncPopup(synchronizeTxt);
    });
  }

  private showSyncPopup(synchronizeTxt: Phaser.GameObjects.BitmapText): void {
    const width = 400;
    const height = 220;
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const popupBg = this.add
      .rectangle(centerX, centerY, width, height, 0x000000, 0.8)
      .setOrigin(0.5); // Texto principal con sombra

    const popupTextShadow = this.add
      .bitmapText(
        centerX + 2,
        centerY - 70,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.PUT_YOUR_NAME,
        20
      )
      .setTint(0x000000)
      .setOrigin(0.5);

    const popupText = this.add
      .bitmapText(
        centerX,
        centerY - 72,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.PUT_YOUR_NAME,
        20
      )
      .setTint(0xffffff)
      .setOrigin(0.5);

    // Input HTML
    const inputElement = document.createElement("input");
    inputElement.style.position = "absolute";
    inputElement.style.top = "58vh";
    inputElement.style.left = "48vw";
    inputElement.style.transform = "translate(-50%, -50%)";
    inputElement.style.width = "30vw";
    inputElement.style.maxWidth = "15vw";
    inputElement.style.fontSize = "2vh";
    inputElement.style.padding = "0.5vh";
    inputElement.style.borderRadius = "5px";
    inputElement.style.border = "1px solid #ccc";
    inputElement.style.zIndex = "1000";
    document.body.appendChild(inputElement);
    inputElement.focus();

    const closeBtnShadow = this.add
      .bitmapText(
        centerX + width / 2 - 18,
        centerY - height / 2 + 18,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CLOSE,
        20
      )
      .setTint(0x000000)
      .setOrigin(0.5);

    const closeBtn = this.add
      .bitmapText(
        centerX + width / 2 - 20,
        centerY - height / 2 + 16,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CLOSE,
        20
      )
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setInteractive();

    closeBtn.on("pointerdown", () => {
      synchronizeTxt.setInteractive();
      popupBg.destroy();
      popupText.destroy();
      popupTextShadow.destroy();
      confirmBtn.destroy();
      confirmBtnShadow.destroy();
      closeBtn.destroy();
      closeBtnShadow.destroy();
      document.body.removeChild(inputElement);
    });

    const confirmBtnShadow = this.add
      .bitmapText(
        centerX + 2,
        centerY + 50,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SAVE,
        20
      )
      .setTint(0x000000)
      .setOrigin(0.5);

    const confirmBtn = this.add
      .bitmapText(centerX, centerY + 50, Constants.FONTS.BITMAP, Constants.TEXTS.MENU.SAVE, 20)
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setInteractive();

    confirmBtn.on("pointerdown", () => {
      const userName = inputElement.value.trim();
      if (userName) {
        this.database.data.nombre = userName;
        this.database.saveDB();
        this.database.saveResumenToFirebase(userName);

        const successTextShadow = this.add
          .bitmapText(
            centerX + 2,
            centerY + 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.DATA_SAVED,
            30
          )
          .setTint(0x000000)
          .setOrigin(0.5);

        const successText = this.add
          .bitmapText(
            centerX,
            centerY,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.DATA_SAVED,
            30
          )
          .setTint(0x00ff00)
          .setOrigin(0.5);

        this.tweens.add({
          targets: [successText, successTextShadow],
          alpha: 0,
          duration: 3000,
          ease: "Linear",
          onComplete: () => {
            successText.destroy();
            successTextShadow.destroy();
          },
        });
      }

      synchronizeTxt.setInteractive();
      popupBg.destroy();
      popupText.destroy();
      popupTextShadow.destroy();
      confirmBtn.destroy();
      confirmBtnShadow.destroy();
      document.body.removeChild(inputElement);
    });
  }
}
