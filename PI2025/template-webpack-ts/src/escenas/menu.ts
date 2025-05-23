import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class Menu extends Phaser.Scene {
  private width: number;
  private height: number;

  private backgroundMusic: Phaser.Sound.BaseSound;

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
  }

  createAndPlayMusic() {
    const database = new DBManager(); // Instancia de la base de datos

    if (!this.backgroundMusic) {
      this.backgroundMusic = this.sound.add(Constants.SOUNDS.MUSIC.BACKGROUND, {
        loop: true,
        volume: 1.25,
      });
      this.registry.set("backgroundMusic", this.backgroundMusic);
    }

    // Verifica el estado de la música desde la base de datos
    if (database.data.music && !this.backgroundMusic.isPlaying) {
      this.backgroundMusic.play();
    } else if (!database.data.music && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.stop();
    }
  }

  createBackground() {
    this.add
      .image(this.width / 2, this.height / 2, "logo")
      .setScale(0.4)
      .setOrigin(0.5, 0.5);
    this.cameras.main.setBackgroundColor("#f09cbd");
  }

  createTexts() {
    this.createPlayText();
    this.createSettingsTxt();
    this.createCreditsTxt();
  }

  createPlayText() {
    const playTxtShadow = this.add
      .bitmapText(
        this.width / 2,
        this.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.PLAY,
        35
      )
      .setTint(0x000000); // Color negro para el borde

    // Desplazar el texto de sombra para simular un borde
    playTxtShadow.setOrigin(0.5, 0.5);
    playTxtShadow.x -= 2;
    playTxtShadow.y -= 2;

    const playTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.width / 2,
        this.height / 1.1,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.PLAY,
        35
      )
      .setInteractive();

    playTxt.setOrigin(0.5, 0.5);
    this.changeSceneToLevel(playTxt, Constants.SCENES.LEVEL_SELECTION);
  }

  createSettingsTxt() {
    const settingsTxtShadow = this.add
      .bitmapText(
        this.width / 20,
        this.height / 1.2,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        25
      )
      .setTint(0x000000); // Color negro para el borde

    // Desplazar el texto de sombra para simular un borde
    settingsTxtShadow.x -= 2;
    settingsTxtShadow.y -= 2;

    const settingsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.width / 20,
        this.height / 1.2,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.SETTINGS,
        25
      )
      .setInteractive();

    this.changeSceneToSettings(settingsTxt, Constants.SCENES.SETTINGS);
  }

  createCreditsTxt() {
    const creditsTxtShadow = this.add
      .bitmapText(
        this.width / 1.4,
        this.height / 1.2,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CREDITS,
        25
      )
      .setTint(0x000000); // Color negro para el borde

    // Desplazar el texto de sombra para simular un borde
    creditsTxtShadow.x -= 2;
    creditsTxtShadow.y -= 2;

    const creditsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.width / 1.4,
        this.height / 1.2,
        Constants.FONTS.BITMAP,
        Constants.TEXTS.MENU.CREDITS,
        25
      )
      .setInteractive();

    this.changeSceneToSettings(creditsTxt, Constants.SCENES.CREDITS);
  }

  /**
   * Cuando se puse sobre el texto nos llevará a la escena indicada.
   * @param playTxt Texto el cual debe ser pulsado para que trate la función.
   * @param scene Escena del juego a la que será enviado el usuario cuando termine la función.
   */
  changeSceneToLevel(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
    playTxt.on("pointerdown", () => {
      this.scene.start(scene); // Lanza la escena LevelSelection y detiene la actual
    });
  }

  changeSceneToSettings(
    settingsTxt: Phaser.GameObjects.BitmapText,
    scene: string
  ) {
    settingsTxt.on("pointerdown", () => {
      this.scene.start(scene); // Lanza la escena Settings sin detener la actual
    });
  }
}
