import Phaser from 'phaser';
import Constants from '../constantes';
import Player from '../gameObjects/player';
export class Nivel1 extends Phaser.Scene {
    constructor() {
        super(Constants.SCENES.LEVEL_1);
        /*
            private width : number;
            private height : number;
        
            private lifes : number;
            private score : number;
        */
        Object.defineProperty(this, "mapaNivel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "conjuntoPatrones", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "capaMapaNivel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backgroundImage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    init() {
        /*
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lifes = 3;
        this.score = 0;
        */
    }
    create() {
        // Carga del logo
        this.add.image(500, 100, 'logo');
        // Carga de textos y su interactividad
        /*
        const minusLifes : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width/2,
            this.height / 3,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.LIFES_MINUS, 20
        ).setInteractive();

        minusLifes.on('pointerdown',()=>{
            this.lifes --;
            if(this.lifes<0){
                this.scene.start(Constants.SCENES.MENU);
            }else{
                this.registry.set(Constants.GLOBAL_VARIABLES.LIFES, this.lifes);
                this.events.emit(Constants.EVENTS.LIFES);
            }
        });
        

        const addScore : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width/2,
            this.height / 2,
            Constants.FONTS.BITMAP,
            Constants.TEXTS.SCORE_PLUS, 20
        ).setInteractive();

        addScore.on('pointerdown',()=>{
            this.score +=10;
            this.registry.set(Constants.GLOBAL_VARIABLES.SCORE, this.score);
            this.events.emit(Constants.EVENTS.SCORE);
        })
        */
        // Carga del mapa
        this.chargeMap();
        // Carga del fondo
        this.chargeBackground();
        // Crear el sprite del jugador y asignar la animación 'idle' por defecto
        this.chargePlayer();
        // Crear sprite de objeto final con su posición
        this.chargeObjects();
    }
    update() {
        // Mover fondo
        this.backgroundImage.tilePositionY -= 0.4;
        this.player.update();
    }
    /**
     * Función que se encarga de cargar en el nivel todo lo relacionado con el mapa, tileset y capas del mapa.
     */
    chargeMap() {
        this.mapaNivel = this.make.tilemap({ key: Constants.MAPS.LEVEL_1.TILEMAP_JSON, tileWidth: 16, tileHeight: 16 });
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        if (this.mapaNivel.addTilesetImage(Constants.MAPS.TILESET) == null) {
            throw new Error(`No se pudo cargar el tileset ${Constants.MAPS.TILESET}`);
        }
        else {
            this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constants.MAPS.TILESET);
        }
        this.capaMapaNivel = this.mapaNivel.createLayer(Constants.MAPS.LEVEL_1.PLATFORM_LAYER, this.conjuntoPatrones);
        this.capaMapaNivel.setCollisionByExclusion([-1]);
    }
    /**
     * Función que se encarga de cargar el fondo del nivel.
     */
    chargeBackground() {
        this.backgroundImage = this.add.tileSprite(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels, Constants.BACKGROUNDS.LEVEL_1).setOrigin(0, 0).setDepth(-1);
    }
    /**
     * Función que se encarga de cargar al jugador en la posición indicada en la capa del mapa y además
     * carga las cámaras para que sigan al jugador.
     */
    chargePlayer() {
        // Busca si hay un objeto que se llame como el id en el mapa.
        let objeto = this.mapaNivel.findObject(Constants.PLAYER.ID, (d) => {
            return d.name === Constants.PLAYER.ID; // Suponiendo que estás buscando por el nombre del objeto
        });
        if (objeto) {
            this.player = new Player({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                texture: Constants.PLAYER.ID
            });
            this.physics.add.collider(this.player, this.capaMapaNivel);
            // Para que las cámaras sigan al jugador:
            this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
            this.cameras.main.startFollow(this.player);
        }
    }
    /**
     * Funcion encargada de cargar todos los objetos del nivel.
     */
    chargeObjects() {
        // Crea un objeto a partir de si encuentra ese nombre en el mapa.
        let finalObject = this.mapaNivel.createFromObjects(Constants.MAPS.FINAL_POSITION, { name: Constants.MAPS.FINAL_POSITION })[0];
        this.physics.world.enable(finalObject); // lo activa
        finalObject.body.setAllowGravity(false); // le quita la gravedad
        finalObject.setTexture(Constants.OBJECTS.FINAL_OBJECT); // le pone textura
        finalObject.body.setSize(40, 70); // le pone tamaño
        // Función del objeto cuando el jugador choca contra este.
        this.physics.add.collider(this.player, finalObject, () => {
            this.stopLevel();
        });
    }
    /**
    * Cuando se active esta función acabará con la escena actual.
    */
    stopLevel() {
        this.scene.stop(Constants.SCENES.LEVEL_1);
        this.scene.stop(Constants.SCENES.HUD);
        this.scene.start(Constants.SCENES.MENU);
    }
    ;
}
