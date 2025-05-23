import Constants from "../constantes";
export default class Load extends Phaser.Scene {
    constructor() {
        super(Constants.SCENES.LOAD);
        // Barra de carga
        Object.defineProperty(this, "loadBar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "progressBar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    preload() {
        this.load.path = 'assets/';
        // Cambiar el color de fondo del apartado de la cámara
        this.cameras.main.setBackgroundColor(0x000000);
        this.createBars();
        // Listener mientras se cargan los assets para que progrese la barra de carga.
        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0x88e453, 1);
            this.progressBar.fillRect(this.cameras.main.width / 4, this.cameras.main.height / 2 - 16, (this.cameras.main.width / 2) * value, 16);
        }, this);
        this.load.on('complete', () => {
            // Carga fuente
            const jsonFont = this.cache.json.get(Constants.FONTS.JSON);
            this.cache.bitmapFont.add(Constants.FONTS.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, jsonFont));
            // Carga menú
            this.scene.start(Constants.SCENES.MENU);
        }, this);
        this.load.image('logo', 'logo.png'); // Asegúrate de que esta ruta es correcta
        // Cargar el tilemap y el tileset
        this.load.tilemapTiledJSON(Constants.MAPS.LEVEL_1.TILEMAP_JSON, 'nivel1.json');
        this.load.image(Constants.MAPS.TILESET, 'nivelestileset.png');
        // Cargar fondo
        this.load.image(Constants.BACKGROUNDS.LEVEL_1, 'imagenes/Brown.png');
        // Cargar fuentes
        this.load.json(Constants.FONTS.JSON, 'fuentes/font.json');
        this.load.image(Constants.FONTS.IMAGE, 'fuentes/fontImage.png');
        // Cargar jugador
        this.load.atlas(Constants.PLAYER.ID, 'characters/ninjafrog-0.png', 'characters/ninjaFrog.json');
        // Cargar objeto de final del juego.
        this.load.image(Constants.OBJECTS.FINAL_OBJECT, 'objetos/end.png');
    }
    /*
    *   Método que crea las barras de progreso.
    */
    createBars() {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xffffff, 1); // Rellena de un color
        //Crea un rectángulo con las medidas del juego para que sea responsive
        this.loadBar.fillRect(this.cameras.main.width / 4 - 2, this.cameras.main.height / 2 - 18, this.cameras.main.width / 2 + 4, 20);
        this.progressBar = this.add.graphics(); // Solo lo inicializamos
    }
}
