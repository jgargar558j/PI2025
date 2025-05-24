import Constants from "../constantes";

export default class Load extends Phaser.Scene{
    
    // Barra de carga
    private loadBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor(){
        super(Constants.SCENES.LOAD);
    }

    preload():void{
        this.load.path = 'assets/';

        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadText();
        this.createBars();
        this.chargeAssets();

        this.load.on(
            'progress',
            (value:number) =>{
                this.progressBar.clear();
                this.progressBar.fillStyle(0x88e453,1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2)*value,
                    16
                );
            },
            this
        );

        this.load.on(
            'complete', () =>{
                const jsonFont = this.cache.json.get(Constants.FONTS.JSON);
                this.cache.bitmapFont.add(Constants.FONTS.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, jsonFont));

                this.scene.start(Constants.SCENES.MENU);
            },
            this
        );

       
    }

    create():void{
        this.registry.set(Constants.GLOBAL_VARIABLES.MUSIC, Constants.SETTINGS.SOUND_ON);
        this.registry.set(Constants.GLOBAL_VARIABLES.EFFECTS, Constants.SETTINGS.SOUND_ON);
    }

    /*
    *   Método que crea las barras de progreso.
    */
    createBars():void{
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xffffff,1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }

    createLoadText():void{
        const loadTxt = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 50,
            Constants.TEXTS.MENU.LOADING
        );
        loadTxt.setOrigin(0.5, 0.5);
        loadTxt.setFontFamily(Constants.FONTS.BITMAP);
        loadTxt.setFontSize(60);
    }

    chargeAssets():void{
        this.load.image('logo', 'logo.png');
        this.load.image(Constants.OBJECTS.LOGO,'imagenes/decorativeBackground/logoNoBG.png')

        // Cargar el tilemap y el tileset
        this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL_1.TILEMAP_JSON, 'levels/nivel1.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL_2.TILEMAP_JSON, 'levels/nivel2.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL_3.TILEMAP_JSON, 'levels/nivel3.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL_4.TILEMAP_JSON, 'levels/nivel4.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL_5.TILEMAP_JSON, 'levels/nivel5.json');

        this.load.image(Constants.MAPS.TILESET, 'levels/nivelestileset.png');

        // Cargar fondo
        this.load.image(Constants.BACKGROUNDS.LEVEL_1, 'imagenes/Green.png');
        this.load.image(Constants.BACKGROUNDS.LEVEL_2, 'imagenes/Blue.png');
        this.load.image(Constants.BACKGROUNDS.LEVEL_3, 'imagenes/Brown.png');
        this.load.image(Constants.BACKGROUNDS.LEVEL_4, 'imagenes/Gray.png');

        // Cargar fuentes
        this.load.json(Constants.FONTS.JSON, 'fuentes/font.json');
        this.load.image(Constants.FONTS.IMAGE, 'fuentes/fontImage.png');

        // Cargar jugador
        this.load.atlas(Constants.PLAYER.ID, 'characters/ninjafrog-0.png', 'characters/ninjaFrog.json');    
    
        // Cargar objeto de final del juego.
        this.load.image(Constants.OBJECTS.FINAL_OBJECT, 'objetos/end.png');

        // Cargar enemigos
        this.load.spritesheet(Constants.ENEMIES.BUNNY.ID, 'enemies/bunny.png', { frameWidth: 34, frameHeight: 44 });
        this.load.spritesheet(Constants.ENEMIES.DEATH.ID, 'enemies/death.png', { frameWidth: 38, frameHeight: 38 });

        // Carga plataformas
        this.load.spritesheet(Constants.PLATFORMS.ID, 'objetos/platforms/brown/brown.png', { frameWidth: 32, frameHeight: 8 });

        // Cargar sonidos
        this.load.audio(Constants.SOUNDS.EFFECTS.JUMP, 'sounds/effects/jump.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.ENEMY_DESTROY, 'sounds/effects/enemyDestroy.ogg');
        this.load.audio(Constants.SOUNDS.MUSIC.BACKGROUND, 'sounds/background/backgroundMusic.ogg');
        this.load.audio(Constants.SOUNDS.MUSIC.IN_GAME, 'sounds/background/backgroundMusicGame.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.PLAYER_DAMAGE, 'sounds/effects/playerDamage.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.COLLECT, 'sounds/effects/collect.ogg');

        // Cargar recolectables
        this.load.spritesheet(Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE.ID, 'objetos/collectables/fruits/apple.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA.ID, 'objetos/collectables/fruits/banana.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY.ID, 'objetos/collectables/fruits/cherry.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constants.OBJECTS.ANIMATION, 'objetos/collected.png', { frameWidth: 32, frameHeight: 32 });

        // Cargar imagenes de ajustes
        this.load.image(Constants.SETTINGS.SOUND_ON, 'settings/soundon.png');
        this.load.image(Constants.SETTINGS.SOUND_OFF, 'settings/soundoff.png');

        // Cargar imagenes de controles
        this.load.image(Constants.CONTROLS.LEFT, 'imagenes/controls/arrowLeft.png');
        this.load.image(Constants.CONTROLS.RIGHT, 'imagenes/controls/arrowRight.png');
        this.load.image(Constants.CONTROLS.UP, 'imagenes/controls/arrowUp.png');
    }
}