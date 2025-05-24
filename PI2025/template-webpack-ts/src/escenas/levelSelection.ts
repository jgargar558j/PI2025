import Constants from "../constantes";

export default class LevelSelection extends Phaser.Scene {

    constructor(){
        super(Constants.SCENES.LEVEL_SELECTION);
    }

    create(){
        this.cameras.main.setBackgroundColor('#f09cbd');
        this.createTexts();
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'logo').setScale(0.4).setAlpha(0.2).setOrigin(0.5,0.5).setDepth(-1);
    }

    createTexts() {
        const levelSelectionTxtShadow = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.LEVEL_SELECTION,
            40
        ).setTint(0x000000);
    
        levelSelectionTxtShadow.x += 4;
        levelSelectionTxtShadow.y += 4;
        levelSelectionTxtShadow.setOrigin(0.5, 0.5);
    
        const levelSelectionTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.LEVEL_SELECTION,
            40
        ).setTint(0xFFFFFF);
    
        levelSelectionTxt.setOrigin(0.5, 0.5);
    
        const backTxtShadow = this.add.bitmapText(
            this.cameras.main.width / 8,
            this.cameras.main.height / 1.1,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.BACK,
            30
        ).setTint(0x000000);
    
        backTxtShadow.x += 2;
        backTxtShadow.y += 2;
        backTxtShadow.setOrigin(0.5, 0.5);
    
        const backTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 8,
            this.cameras.main.height / 1.1,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.BACK,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        backTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToMenu(backTxt, Constants.SCENES.MENU);
    
        const level1ButtonShadowTxt = this.add.bitmapText(
            this.cameras.main.width / 3.5,
            this.cameras.main.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_1,
            30
        ).setTint(0x000000);
    
        level1ButtonShadowTxt.x += 2;
        level1ButtonShadowTxt.y += 2;
        level1ButtonShadowTxt.setOrigin(0.5, 0.5);
    
        const level1ButtonTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 3.5,
            this.cameras.main.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_1,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        level1ButtonTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToLevel(level1ButtonTxt, Constants.SCENES.LEVELS.LEVEL_1);
    
        const level2ButtonShadowTxt = this.add.bitmapText(
            this.cameras.main.width / 1.5,
            this.cameras.main.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_2,
            30
        ).setTint(0x000000);
    
        level2ButtonShadowTxt.x += 2;
        level2ButtonShadowTxt.y += 2;
        level2ButtonShadowTxt.setOrigin(0.5, 0.5);
    
        const level2ButtonTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 1.5,
            this.cameras.main.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_2,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        level2ButtonTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToLevel(level2ButtonTxt, Constants.SCENES.LEVELS.LEVEL_2);

        const level3ButtonShadowTxt = this.add.bitmapText(
            this.cameras.main.width / 3.5,
            this.cameras.main.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_3,
            30
        ).setTint(0x000000);
    
        level3ButtonShadowTxt.x += 2;
        level3ButtonShadowTxt.y += 2;
        level3ButtonShadowTxt.setOrigin(0.5, 0.5);
    
        const level3ButtonTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 3.5,
            this.cameras.main.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_3,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        level3ButtonTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToLevel(level3ButtonTxt, Constants.SCENES.LEVELS.LEVEL_3);

        const level4ButtonShadowTxt = this.add.bitmapText(
            this.cameras.main.width / 1.5,
            this.cameras.main.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_4,
            30
        ).setTint(0x000000);
    
        level4ButtonShadowTxt.x += 2;
        level4ButtonShadowTxt.y += 2;
        level4ButtonShadowTxt.setOrigin(0.5, 0.5);
    
        const level4ButtonTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 1.5,
            this.cameras.main.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_4,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        level4ButtonTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToLevel(level4ButtonTxt, Constants.SCENES.LEVELS.LEVEL_4);

        const level5ButtonShadowTxt = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 1.5,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_5,
            30
        ).setTint(0x000000);
    
        level5ButtonShadowTxt.x += 2;
        level5ButtonShadowTxt.y += 2;
        level5ButtonShadowTxt.setOrigin(0.5, 0.5);
    
        const level5ButtonTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 1.5,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MAPS.LEVEL_5,
            30
        ).setTint(0xFFFFFF).setInteractive();
    
        level5ButtonTxt.setOrigin(0.5, 0.5);
    
        this.changeSceneToLevel(level5ButtonTxt, Constants.SCENES.LEVELS.LEVEL_5);
    }
    
    changeSceneToMenu(backTxt: Phaser.GameObjects.BitmapText, scene: string) {
        backTxt.on('pointerdown', () => {
            this.scene.stop(Constants.SCENES.SETTINGS);
            this.scene.start(scene);
        });
    }
    
    changeSceneToLevel(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
        playTxt.on('pointerdown', () => {
            playTxt.disableInteractive();
            this.cameras.main.fade(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.sound.stopAll();
                this.scene.start(scene);
                this.scene.start(Constants.SCENES.HUD,{levelName:scene});
                this.scene.bringToTop(Constants.SCENES.HUD);
            });
        });
    }
}