import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class Settings extends Phaser.Scene{
    
    private backgroundMusic: Phaser.Sound.BaseSound;

    constructor(){
        super(Constants.SCENES.SETTINGS);
    }

    create(){
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'logo').setScale(0.4).setAlpha(0.5).setOrigin(0.5,0.5);
        let database = new DBManager();

        this.cameras.main.setBackgroundColor('#f09cbd');
        this.createTexts();

        this.backgroundMusic = this.registry.get('backgroundMusic') as Phaser.Sound.BaseSound;

        let musicOnOff : Phaser.GameObjects.Image = this.add.image(this.cameras.main.width / 3, this.cameras.main.height / 2.5, this.getSoundImg(database.data.music)).setScale(0.1).setInteractive();
        let effectsOnOff : Phaser.GameObjects.Image = this.add.image(this.cameras.main.width / 3, this.cameras.main.height / 1.6, this.getSoundImg(database.data.effects)).setScale(0.1).setInteractive();

        musicOnOff.on('pointerdown', () => {
            database.data.music = !database.data.music;
            database.saveDB();
            musicOnOff.setTexture(this.getSoundImg(database.data.music));

            if(!database.data.music){
                this.backgroundMusic.stop();
            }else{
                this.backgroundMusic.play();
            }
        });
        effectsOnOff.on('pointerdown', () => {
            database.data.effects = !database.data.effects;
            database.saveDB();
            effectsOnOff.setTexture(this.getSoundImg(database.data.effects));
        });
    }

    getSoundImg(sound:boolean): string {
        return sound ? Constants.SETTINGS.SOUND_ON : Constants.SETTINGS.SOUND_OFF
    }

    createTexts(){
        const settingsTxtShadow = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.SETTINGS,
            50
        ).setTint(0x000000);

        settingsTxtShadow.x += 4;
        settingsTxtShadow.y += 4;
        settingsTxtShadow.setOrigin(0.5, 0.5);

        const settingsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.SETTINGS,
            50
        ).setTint(0xFFFFFF);

        settingsTxt.setOrigin(0.5, 0.5);

        const musicTxtShadow = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2.5,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.MUSIC,
            20
        ).setTint(0x000000);

        musicTxtShadow.x += 2;
        musicTxtShadow.y += 2;
        musicTxtShadow.setOrigin(0.5, 0.5);
        
        const musicTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2.5,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.MUSIC,
            20
        ).setTint(0xFFFFFF);

        musicTxt.setOrigin(0.5, 0.5);

        const effectsTxtShadow = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 1.6,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.EFFECTS,
            20
        ).setTint(0x000000);

        effectsTxtShadow.x += 2;
        effectsTxtShadow.y += 2;
        effectsTxtShadow.setOrigin(0.5, 0.5);
        
        const effectsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 2,
            this.cameras.main.height / 1.6,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.EFFECTS,
            20
        ).setTint(0xFFFFFF);

        effectsTxt.setOrigin(0.5, 0.5);

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

        const backTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.cameras.main.width / 8,
            this.cameras.main.height / 1.1,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.BACK,
            30
        ).setTint(0xFFFFFF).setInteractive();

        backTxt.setOrigin(0.5, 0.5);

        this.changeSceneToMenu(backTxt, Constants.SCENES.MENU);
    }

    changeSceneToMenu(backTxt: Phaser.GameObjects.BitmapText, scene: string) {
        backTxt.on('pointerdown', () => {
            this.scene.stop(Constants.SCENES.SETTINGS);
            this.scene.start(scene);
        });   
    }
}