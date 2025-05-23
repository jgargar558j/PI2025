import Constants from "../constantes";
export default class Menu extends Phaser.Scene {
    constructor() {
        super(Constants.SCENES.MENU);
        //private width : number;
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    init() {
        //this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }
    create() {
        this.add.image(500, 100, 'logo');
        const playTxt = this.add.bitmapText(50, this.height / 3, Constants.FONTS.BITMAP, Constants.TEXTS.PLAY, 35).setInteractive();
        this.changeScene(playTxt, Constants.SCENES.LEVEL_1);
    }
    /**
     * Cuando se pulse sobre el texto nos llevará a la escena indicada.
     * @param playTxt Texto el cual debe ser pulsado para que trate la función.
     * @param scene Escena del juego a la que será enviado el usuario cuando termine la función.
     */
    changeScene(playTxt, scene) {
        playTxt.on('pointerdown', () => {
            this.scene.start(scene);
            this.scene.start(Constants.SCENES.HUD);
            this.scene.bringToTop(Constants.SCENES.HUD);
        });
    }
}
