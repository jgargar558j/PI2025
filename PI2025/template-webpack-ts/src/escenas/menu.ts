import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class Menu extends Phaser.Scene {
  private width: number;
  private height: number;

  private backgroundMusic: Phaser.Sound.BaseSound;

  private clickSound: Phaser.Sound.BaseSound;

  private database: DBManager;

  constructor() {
    super(Constants.SCENES.MENU);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  preload() {
    this.createAndPlayMusic();
  }

  create() {
    this.createBackground();
    this.createTexts();
    this.input.once("pointerdown", () => {
      this.sound.unlock(); // Desbloquea el sistema de sonido en móviles
    });

    this.clickSound = this.sound.add(Constants.SOUNDS.EFFECTS.CLICK, {
      loop: false,
      volume: 2,
    });
  }

  createAndPlayMusic() {
    this.database = new DBManager(); // Instancia de la base de datos

    if (!this.backgroundMusic) {
      this.backgroundMusic = this.sound.add(Constants.SOUNDS.MUSIC.BACKGROUND, {
        loop: true,
        volume: 1.25,
      });
      this.registry.set("backgroundMusic", this.backgroundMusic);
    }

    // Verifica el estado de la música desde la base de datos
    if (this.database.data.music && !this.backgroundMusic.isPlaying) {
      this.backgroundMusic.play();
    } else if (!this.database.data.music && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.stop();
    }
  }

  createBackground() {
    this.add.image(this.width / 2, this.height / 2, Constants.BACKGROUNDS.MENU)
      .setScale(0.6)
      .setAlpha(0.7)
      .setOrigin(0.5, 0.5).setDepth(-1);
    this.add
      .image(this.width / 2, this.height / 2, Constants.OBJECTS.LOGO)
      .setScale(.85)
      .setOrigin(0.47, 0.47)
      .setTint(0x0000);
    this.add
      .image(this.width / 2, this.height / 2, Constants.OBJECTS.LOGO)
      .setScale(.8)
      .setOrigin(0.5, 0.5);
  }

  createTexts() {
    this.createPlayText();
    this.createSettingsTxt();
    this.createCreditsTxt();
  }
  createPlayText() {
    const text = Constants.TEXTS.MENU.PLAY;
    const font = Constants.FONTS.BITMAP;
    const fontSize = 35;
    const x = this.width / 2;
    const y = this.height / 1.1;

    const retroSign = this.add.image(x, y, Constants.OBJECTS.RETRO_SIGN).setDepth(-1).setScale(0.3).setInteractive();

    const playTxtShadow = this.add.bitmapText(x, y - 2, font, text, fontSize)
      .setOrigin(0.5)
      .setTint(0x0000);

    const playTxt = this.add.bitmapText(x - 4, y - 6, font, text, fontSize)
      .setOrigin(0.5)
      .setInteractive();

    this.tweens.add({
      targets: [retroSign, playTxt],
      alpha: { from: 1, to: 0.65 },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    retroSign.on('pointerover', () => {
      this.tweens.add({
        targets: [retroSign, playTxtShadow, playTxt],
        y: y - 10,
        duration: 200,
        ease: 'Back.Out'
      });
    });

    retroSign.on('pointerout', () => {
      this.tweens.add({
        targets: [retroSign, playTxtShadow, playTxt],
        y: y,
        duration: 200,
        ease: 'Back.In'
      });
    });

    this.changeSceneToLevel(playTxt, Constants.SCENES.LEVEL_SELECTION);
  }

  createSettingsTxt() {
    const textY = this.height / 1.2;       // Y para el texto
    const retroSignY = this.height / 1.15; // Y para retroSign

    const settingsTxtShadow = this.add
      .bitmapText(
        this.width / 20,
        textY,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        25
      )
      .setTint(0x000000);

    settingsTxtShadow.x -= 2;
    settingsTxtShadow.y -= 2;

    const settingsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.width / 20,
        textY,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        25
      )
      .setInteractive();

    const retroSign = this.add.image(this.width / 6.5, retroSignY, Constants.OBJECTS.RETRO_SIGN_PURPLE)
      .setDepth(-1)
      .setScale(0.25)
      .setInteractive();

    retroSign.on('pointerover', () => {
      this.tweens.add({
        targets: [retroSign],
        y: retroSignY - 10,
        duration: 200,
        ease: 'Back.Out'
      });
      this.tweens.add({
        targets: [settingsTxtShadow, settingsTxt],
        y: textY - 10,
        duration: 200,
        ease: 'Back.Out'
      });
    });

    retroSign.on('pointerout', () => {
      this.tweens.add({
        targets: [retroSign],
        y: retroSignY,
        duration: 200,
        ease: 'Back.In'
      });
      this.tweens.add({
        targets: [settingsTxtShadow, settingsTxt],
        y: textY,
        duration: 200,
        ease: 'Back.In'
      });
    });

    this.changeSceneToSettings(settingsTxt, Constants.SCENES.SETTINGS);
  }

  createCreditsTxt() {
    const textX = this.width / 1.4;
    const textY = this.height / 1.2;

    const retroSignY = this.height / 1.15;

    const creditsTxtShadow = this.add
      .bitmapText(
        textX,
        textY,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CREDITS,
        25
      )
      .setTint(0x000000);

    creditsTxtShadow.x -= 2;
    creditsTxtShadow.y -= 2;

    const creditsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        textX,
        textY,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CREDITS,
        25
      )
      .setInteractive();

    const retroSign = this.add.image(this.width / 1.20, retroSignY, Constants.OBJECTS.RETRO_SIGN_PURPLE)
      .setDepth(-1)
      .setScale(0.3,0.25)
      .setInteractive();

    retroSign.on('pointerover', () => {
      this.tweens.add({
        targets: [retroSign],
        y: retroSignY - 10,
        duration: 200,
        ease: 'Back.Out'
      });
      this.tweens.add({
        targets: [creditsTxtShadow, creditsTxt],
        y: textY - 10,
        duration: 200,
        ease: 'Back.Out'
      });
    });

    retroSign.on('pointerout', () => {
      this.tweens.add({
        targets: [retroSign],
        y: retroSignY,
        duration: 200,
        ease: 'Back.In'
      });
      this.tweens.add({
        targets: [creditsTxtShadow, creditsTxt],
        y: textY,
        duration: 200,
        ease: 'Back.In'
      });
    });

    this.changeSceneToSettings(creditsTxt, Constants.SCENES.CREDITS);
  }


  /**
   * Cuando se puse sobre el texto nos llevará a la escena indicada.
   * @param playTxt Texto el cual debe ser pulsado para que trate la función.
   * @param scene Escena del juego a la que será enviado el usuario cuando termine la función.
   */
  changeSceneToLevel(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
    playTxt.on("pointerdown", () => {
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      this.scene.start(scene); // Lanza la escena LevelSelection y detiene la actual
    });
  }

  changeSceneToSettings(
    settingsTxt: Phaser.GameObjects.BitmapText,
    scene: string
  ) {
    settingsTxt.on("pointerdown", () => {
      if (this.database.data.effects) {
        this.clickSound.play();
      }
      this.scene.start(scene); // Lanza la escena Settings sin detener la actual
    });
  }
}
