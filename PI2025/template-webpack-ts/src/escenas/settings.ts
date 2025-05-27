import Constants from "../constantes";
import DBManager from "../database/dbManager";

export default class Settings extends Phaser.Scene{
    
    private backgroundMusic: Phaser.Sound.BaseSound;

    private clickSound: Phaser.Sound.BaseSound;

    private database: DBManager;

    constructor(){
        super(Constants.SCENES.SETTINGS);
    }

    create(){
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'logo').setScale(0.4).setAlpha(0.5).setOrigin(0.5,0.5);
        this.database = new DBManager();

        this.cameras.main.setBackgroundColor('#f09cbd');
        this.clickSound = this.sound.add(Constants.SOUNDS.EFFECTS.CLICK, {
            loop: false,
            volume: 2,
        });
        this.createTexts();

        this.backgroundMusic = this.registry.get('backgroundMusic') as Phaser.Sound.BaseSound;

        let musicOnOff : Phaser.GameObjects.Image = this.add.image(this.cameras.main.width / 3, this.cameras.main.height / 2.5, this.getSoundImg(this.database.data.music)).setScale(0.1).setInteractive();
        let effectsOnOff : Phaser.GameObjects.Image = this.add.image(this.cameras.main.width / 3, this.cameras.main.height / 1.6, this.getSoundImg(this.database.data.effects)).setScale(0.1).setInteractive();

        musicOnOff.on('pointerdown', () => {
            this.clickSound.play();
            this.database.data.music = !this.database.data.music;
            this.database.saveDB();
            musicOnOff.setTexture(this.getSoundImg(this.database.data.music));

            if(!this.database.data.music){
                this.backgroundMusic.stop();
            }else{
                this.backgroundMusic.play();
            }
        });
        effectsOnOff.on('pointerdown', () => {
            this.database.data.effects = !this.database.data.effects;
            if(this.database.data.effects){
                this.clickSound.play();
            }
            this.database.saveDB();
            effectsOnOff.setTexture(this.getSoundImg(this.database.data.effects));
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
            if(this.database.data.effects){
                this.clickSound.play();
            }
            this.scene.stop(Constants.SCENES.SETTINGS);
            this.scene.start(scene);
        });   
    }
}