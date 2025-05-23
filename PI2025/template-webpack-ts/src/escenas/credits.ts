import Constants from "../constantes";

export default class Credits extends Phaser.Scene {

    private width: number;
    private height: number;

    constructor(){
        super(Constants.SCENES.CREDITS);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(){
        this.add.image(this.width/2, this.height/2, 'logo').setScale(0.4).setAlpha(0.5).setOrigin(0.5,0.5);
        this.cameras.main.setBackgroundColor('#f09cbd');
        this.createTexts();
    }

    createTexts(){
        const creditsTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.CREDITS,
            40
        ).setTint(0x000000);

        creditsTxtShadow.x += 4;
        creditsTxtShadow.y += 4;
        creditsTxtShadow.setOrigin(0.5, 0.5);

        const creditsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 8,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.CREDITS,
            40
        ).setTint(0xFFFFFF);

        creditsTxt.setOrigin(0.5, 0.5);

        const backTxtShadow = this.add.bitmapText(
            this.width / 8,
            this.height / 1.1,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.BACK,
            25
        ).setTint(0x000000);

        backTxtShadow.x += 2;
        backTxtShadow.y += 2;
        backTxtShadow.setOrigin(0.5, 0.5);

        const backTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 8,
            this.height / 1.1,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.MENU.BACK,
            25
        ).setTint(0xFFFFFF).setInteractive();

        backTxt.setOrigin(0.5, 0.5);

        this.changeSceneToMenu(backTxt, Constants.SCENES.MENU);

        this.createCreditsText();
    }

    createCreditsText(){

        //Desarrollador: José Luis García
        const developerTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 4,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.GAME_DEVELOPER,
            15
        ).setTint(0x000000);

        developerTxtShadow.x += 2;
        developerTxtShadow.y += 2;
        developerTxtShadow.setOrigin(0.5, 0.5);

        const developerTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 4,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.GAME_DEVELOPER,
            15
        ).setTint(0xFFFFFF);

        developerTxt.setOrigin(0.5, 0.5);

        //Game Title: FrogAlone
        //Version 1.0
        const gameTitleTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.GAME_TITLE,
            15
        ).setTint(0x000000);

        gameTitleTxtShadow.x += 2;
        gameTitleTxtShadow.y += 2;
        gameTitleTxtShadow.setOrigin(0.5, 0.5);

        const gameTitleTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.GAME_TITLE,
            15
        ).setTint(0xFFFFFF);

        gameTitleTxt.setOrigin(0.5, 0.5);

        //Version 1.0
        const versionTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 2.4,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.VERSION,
            15
        ).setTint(0x000000);

        versionTxtShadow.x += 2;
        versionTxtShadow.y += 2;
        versionTxtShadow.setOrigin(0.5, 0.5);

        const versionTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 2.4,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.VERSION,
            15
        ).setTint(0xFFFFFF);

        versionTxt.setOrigin(0.5, 0.5);

        //Sprites: Pixel Adventure by PixelFrog
        const spritesTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.SPRITES,
            15
        ).setTint(0x000000);

        spritesTxtShadow.x += 2;
        spritesTxtShadow.y += 2;
        spritesTxtShadow.setOrigin(0.5, 0.5);

        const spritesTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.SPRITES,
            15
        ).setTint(0xFFFFFF);

        spritesTxt.setOrigin(0.5, 0.5);

        //Música del menú
        const musicMenuTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 1.6,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.MUSIC_MENU,
            15
        ).setTint(0x000000);

        musicMenuTxtShadow.x += 2;
        musicMenuTxtShadow.y += 2;
        musicMenuTxtShadow.setOrigin(0.5, 0.5);

        const musicMenuTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 1.6,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.MUSIC_MENU,
            15
        ).setTint(0xFFFFFF);

        musicMenuTxt.setOrigin(0.5, 0.5);

        //Música INGAME
        const musicGameTxtShadow = this.add.bitmapText(
            this.width / 2,
            this.height / 1.3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.MUSIC_INGAME,
            15
        ).setTint(0x000000);

        musicGameTxtShadow.x += 2;
        musicGameTxtShadow.y += 2;
        musicGameTxtShadow.setOrigin(0.5, 0.5);

        const musicGameTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2,
            this.height / 1.3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.CREDITS.MUSIC_INGAME,
            15
        ).setTint(0xFFFFFF);

        musicGameTxt.setOrigin(0.5, 0.5);
    }

    changeSceneToMenu(backTxt: Phaser.GameObjects.BitmapText, scene: string) {
        backTxt.on('pointerdown', () => {
            this.scene.stop(Constants.SCENES.SETTINGS);
            this.scene.start(scene);
        });   
    }
}