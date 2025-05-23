import Constants from "../constantes";
export default class HUD extends Phaser.Scene {
    constructor() {
        super(Constants.SCENES.HUD);
        Object.defineProperty(this, "lifesTxt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scoreTxt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    create() {
        // Recupera la escena de nivel 1
        const level1 = this.scene.get(Constants.SCENES.LEVEL_1);
        level1.events.on(Constants.EVENTS.LIFES, this.updateLifes, this);
        level1.events.on(Constants.EVENTS.SCORE, this.updateScore, this);
        this.lifesTxt = this.add.bitmapText(20, 20, Constants.FONTS.BITMAP, 'VIDAS:3', 20);
        this.scoreTxt = this.add.bitmapText(20, 50, Constants.FONTS.BITMAP, 'SCORE:0', 20);
    }
    updateLifes() {
        this.lifesTxt.text = "VIDAS:" + this.registry.get(Constants.GLOBAL_VARIABLES.LIFES);
    }
    updateScore() {
        this.scoreTxt.text = "SCORE:" + this.registry.get(Constants.GLOBAL_VARIABLES.SCORE);
    }
}
