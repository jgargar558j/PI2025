import Constants from "../constantes";
import DBManager from "../database/dbManager";
import Collectables from "../gameObjects/collectables";
import Enemies from "../gameObjects/enemies";
import Platforms from "../gameObjects/platforms";
import Player from "../gameObjects/player";

export default class LevelHandler extends Phaser.Scene{
    protected levelName : string;

    // Vida y puntuación del jugador
    public lifes : number;
    public score : number;

    // Tiempo del nivel
    protected seconds:number;
    protected timeRemaining:number;
    protected timeDone:boolean;

    // Mapa y capas
    public mapaNivel !: Phaser.Tilemaps.Tilemap;
    protected conjuntoPatrones !: Phaser.Tilemaps.Tileset;
    protected capaMapaNivel !: Phaser.Tilemaps.TilemapLayer;
    protected backgroundImage : Phaser.GameObjects.TileSprite;
    protected levelBackgroundName:string;

    // Jugador
    public player : Player;

    // Enemigos
    protected enemyGroup : Enemies[];

    // Plataformas
    protected platformsGroupV : Platforms;
    protected platformsGroupH : Platforms;

    // Recolectables
    protected appleGroup : Collectables;
    protected bananaGroup : Collectables;
    protected cherryGroup : Collectables;

    // Musica de fondo
    protected backgroundMusic : Phaser.Sound.BaseSound;

    constructor(levelName:string){
        super(levelName);
        this.levelName = levelName;
    }

    init():void{
        this.lifes = 3;
        this.score = 0;
        
       this.seconds = 1;
       this.timeRemaining = 240; // 4 minutos
       this.timeDone = false;
       this.sound.stopAll();

       this.registry.set(Constants.GLOBAL_VARIABLES.LIFES, this.lifes);
       this.registry.set(Constants.GLOBAL_VARIABLES.SCORE, this.score);

       this.enemyGroup = [];
    }

    preload(): void {
        this.createAndPlayBackgroundMusic();
    }

    createAndPlayBackgroundMusic():void{
        let database = new DBManager(); // Instancia de la base de datos
        
        if(database.data.music){
            this.backgroundMusic = this.sound.add(Constants.SOUNDS.MUSIC.IN_GAME, {
                loop: true,
                volume: 0
            });
            this.backgroundMusic.play();
            this.tweens.add({
                targets: this.backgroundMusic,
                volume: 0.2,
                duration: 2000
            });
        }
    }

    createStage(jsonMap:string,platformLayer:string,background:string):void{
        this.createMap(jsonMap,platformLayer);
        this.createBackgroundScroll(background);
        this.createAnimations();
        this.createPlayer();
        this.createObjects();
        this.createPlatforms();
    }

    createMap(jsonMap:string,platformLayer:string){
        // Cargamos el mapa y la capa de plataformas
        this.mapaNivel = this.make.tilemap({key: jsonMap, tileWidth:16,tileHeight:16});
        this.physics.world.bounds.setTo(0,0,
            this.mapaNivel.widthInPixels,this.mapaNivel.heightInPixels
        );
        
        if (this.mapaNivel.addTilesetImage(Constants.MAPS.TILESET)==null) {
            throw new Error(`No se pudo cargar el tileset ${Constants.MAPS.TILESET}`);
        }else{
            this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constants.MAPS.TILESET)!;
        }
        
        this.capaMapaNivel = this.mapaNivel.createLayer(platformLayer, this.conjuntoPatrones)!;
        this.capaMapaNivel.setCollisionByExclusion([-1]);
    }

    createBackgroundScroll(background:string):void{
        this.backgroundImage = this.add.tileSprite(0,0,this.mapaNivel.widthInPixels,
            this.mapaNivel.heightInPixels,background).setOrigin(0,0).setDepth(-1);

        this.levelBackgroundName = background;
    }

    createAnimations():void{

        // ANIMACION JUGADOR

        // Crear animación de IDLE usando datos del JSON
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.IDLE,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.IDLE + '-',  // Prefijo usado en los nombres de los frames
                start: 0,  // Empieza desde el primer frame en el JSON para 'idle'
                end: 10    // Último número de frame de 'idle' en el JSON
            }),
            frameRate: 20,
            repeat: -1   // Repetir indefinidamente
        });

        // Crear animación de RUN usando datos del JSON
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.RUN,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.RUN + '-',  // Prefijo usado en los nombres de los frames
                start: 0,  // Empieza desde el primer frame en el JSON para 'idle'
                end: 11    // Último número de frame de 'idle' en el JSON
            }),
            frameRate: 20,
            repeat: -1   // Repetir indefinidamente
        });

        // ANIMACION MUERTE ENEMIGO
        this.anims.create({
            key: Constants.ENEMIES.DEATH.ANIM,
            frames: Constants.ENEMIES.DEATH.ID,
            frameRate: 15,
            repeat: 0
        });

        // ANIMACIONES FRUTAS
        this.anims.create({
            key: Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE.ANIMATION,
            frames: Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE.ANIMATION,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA.ANIMATION,
            frames: Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA.ANIMATION,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY.ANIMATION,
            frames: Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY.ANIMATION,
            frameRate: 20,
            repeat: -1
        });

        // ANIMACIONES OBJETO RECOLECTADO
        this.anims.create({
            key: Constants.OBJECTS.ANIMATION,
            frames: Constants.OBJECTS.ANIMATION,
            frameRate: 20
        });
    }

    createPlayer():void{
        // Busca si hay un objeto que se llame como el id en el mapa.
        let objeto = this.mapaNivel.findObject(Constants.PLAYER.ID, (d: any) => {
            return d.name === Constants.PLAYER.ID; // Suponiendo que estás buscando por el nombre del objeto
        });

        if (objeto) {
            this.player = new Player({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                texture: Constants.PLAYER.ID
            });
            this.physics.add.collider(this.player,this.capaMapaNivel);

            this.cameras.main.setBounds(0,0,this.mapaNivel.widthInPixels,this.mapaNivel.heightInPixels);
            this.cameras.main.startFollow(this.player);
        }
    }

    createObjects():void{
        let finalObject: any = this.mapaNivel.createFromObjects(
            Constants.MAPS.FINAL_POSITION,
            {name:Constants.MAPS.FINAL_POSITION})[0];

        this.physics.world.enable(finalObject);
        finalObject.body.setAllowGravity(false);
        finalObject.setTexture(Constants.OBJECTS.FINAL_OBJECT);
        finalObject.body.setSize(40,70);
        finalObject.body.setImmovable(true);

        this.physics.add.collider(this.player, finalObject, ()=>{

            this.stopLevel();
        });
    }

    createCollectables(collectablesConfig:any[]):void{
        collectablesConfig.forEach((collectable) => {
            let collectables : Collectables = new Collectables(
                this,
                Constants.MAPS.COLLECTABLES,
                collectable.ID,
                collectable.ANIMATION
            );
            this.physics.add.overlap(this.player, collectables, this.player.collectObject as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
        });
    }

    createEnemies(enemyConfig:any[]): void {
        enemyConfig.forEach((enemy) => {
            let enemies : Enemies = new Enemies(
                this,
                Constants.MAPS.ENEMIES,
                enemy.ID,
                enemy.ANIMATION,
                enemy.VELOCITY
            );
            this.physics.add.collider(enemies, this.capaMapaNivel);
            this.physics.add.overlap(this.player, enemies, this.player.enemyCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
            this.enemyGroup.push(enemies);
        });
    }

    createPlatforms() {
        this.platformsGroupV = new Platforms(this, Constants.MAPS.PLATFORMS, Constants.PLATFORMS.ID, Constants.PLATFORMS.ANIMATION, Constants.PLATFORMS.VELOCITY, false);
        this.platformsGroupH = new Platforms(this, Constants.MAPS.PLATFORMS, Constants.PLATFORMS.ID, Constants.PLATFORMS.ANIMATION, Constants.PLATFORMS.VELOCITY, true);

        this.physics.add.collider(this.platformsGroupV, this.capaMapaNivel);
        this.physics.add.collider(this.platformsGroupH, this.capaMapaNivel);
        
        this.physics.add.collider(this.platformsGroupV, this.player);
        this.physics.add.collider(this.platformsGroupH, this.player);
    }

    createDecorativeImages(tileMapLayer:string,image:string){
        let logo :any = this.mapaNivel.createFromObjects(tileMapLayer,{name:tileMapLayer});
        logo.forEach((element: { setTexture: (arg0: string) => void; setDepth: (arg0: number) => void; }) => {
            element.setTexture(image);
            element.setDepth(-1);
        });
    }

    createLevelTexts(text:string) {
        const objetosTexto: any[] = this.mapaNivel.getObjectLayer(text)?.objects || [];

        objetosTexto.forEach((obj: any) => {
            const mensaje = obj.properties?.find((p: { name: string; }) => p.name === 'mensaje')?.value || 'Texto no definido';
    
            this.add.bitmapText(
                obj.x!,
                obj.y!,
                Constants.FONTS.BITMAP,
                mensaje,
                20
            ).setScale(0.5).setCenterAlign().setMaxWidth(250);
        });
    }
    

    stopLevel():void {
        let isWin: boolean = false;

        if(this.lifes > 0 || this.timeDone){
            isWin = true;
        }

        this.cameras.main.fade(200, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.stopAndSendInfoLevelEnd(isWin);
        });
    }

    stopAndSendInfoLevelEnd(isWin: boolean): void {
        this.sound.stopAll();
        this.scene.stop(this.levelName);
        this.scene.stop(Constants.SCENES.HUD);
        this.scene.start(Constants.SCENES.LEVEL_END, {
            isWin: isWin,
            levelName: this.levelName,
            score: this.score + this.timeRemaining,
            levelBackgroundName: this.levelBackgroundName
        });
    }

    backToMenu():void{
        this.cameras.main.fade(500,0,0,0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.sound.stopAll();
            this.scene.stop(this.levelName);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.start(Constants.SCENES.MENU);
        });
    }

    update(time: number): void {
        // Mover fondo
        this.backgroundImage.tilePositionY -= 0.4;

        this.player.update();

        this.enemyGroup.forEach((enemy) => {
            enemy.update();
        });
        this.platformsGroupH.update();
        this.platformsGroupV.update();

        if(this.lifes <= 0){
            this.stopLevel();
        }

        // Gestión del tiempo
        if((this.seconds != Math.floor(Math.abs(time/1000)))&& !this.timeDone){
            this.seconds = Math.floor(Math.abs(time/1000));
            this.timeRemaining--;

            let minutes: number = Math.floor(this.timeRemaining/60);
            let segundos: number = Math.floor(this.timeRemaining - (minutes*60));

            let timeText:string = Phaser.Utils.String.Pad(minutes,2,'0',1) + ":" + Phaser.Utils.String.Pad(segundos,2,'0',1);
            this.registry.set(Constants.GLOBAL_VARIABLES.TIME,timeText);
            this.events.emit(Constants.EVENTS.TIME);

            if(this.timeRemaining == 0) {
                this.timeDone= true;
                this.stopLevel();
            }
        }
        if(this.player.y + this.player.height / 2 >= this.physics.world.bounds.bottom){
            this.player.worldBoundsCollision(this.player);
        }
    }
}