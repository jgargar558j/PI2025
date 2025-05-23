import Constants from "../constantes";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.escena, config.x, config.y, config.texture);
        // Control de entrada
        Object.defineProperty(this, "cursors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wasd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // Tipo any = tipo comodín
        Object.defineProperty(this, "space", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "escena", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);
        this.body?.setSize(20, 25);
        this.setCollideWorldBounds(true);
        this.movementByKeyboard();
        this.animationSpritesPlayer();
        this.play(Constants.PLAYER.ANIMATION.IDLE);
    }
    update() {
        // Control de movimiento del jugador
        // Izquierda
        if (this.wasd.A.isDown || this.cursors.left.isDown) {
            this.setVelocityX(-150);
            this.flipX = true;
            if (this.body?.blocked.down) {
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            }
            // Derecha
        }
        else if (this.wasd.D.isDown || this.cursors.right.isDown) {
            this.setVelocityX(+150);
            this.flipX = false;
            if (this.body?.blocked.down) {
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            }
            // Quieto
        }
        else {
            this.setVelocityX(0);
            if (this.body?.blocked.down) {
                this.anims.play(Constants.PLAYER.ANIMATION.IDLE, true);
            }
        }
        // Salto
        if ((this.space.isDown || this.wasd.W.isDown || this.cursors.up.isDown) && this.body?.blocked.down) {
            this.setVelocityY(-250);
            this.anims.stop();
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.JUMP);
        }
        // Caída
        if (this.body && this.body.velocity && !this.body.blocked.down && this.body.velocity.y > 0) {
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.FALL);
        }
    }
    /**
     * Función que realiza la conexión con las teclas del teclado para poder mover al personaje.
     */
    movementByKeyboard() {
        // Entrada de movimiento por teclado
        this.cursors = this.escena.input.keyboard?.createCursorKeys();
        this.wasd = this.escena.input.keyboard?.addKeys('W,A,S,D');
        this.space = this.escena.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    /**
     * Función que crea los tipos de animaciones que necesita el personaje para su funcionamiento: 'RUN','IDLE'.
     */
    animationSpritesPlayer() {
        // Crear animación de IDLE usando datos del JSON
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.IDLE,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.IDLE + '-', // Prefijo usado en los nombres de los frames
                start: 0, // Empieza desde el primer frame en el JSON para 'idle'
                end: 10 // Último número de frame de 'idle' en el JSON
            }),
            frameRate: 20,
            repeat: -1 // Repetir indefinidamente
        });
        // Crear animación de RUN usando datos del JSON
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.RUN,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.RUN + '-', // Prefijo usado en los nombres de los frames
                start: 0, // Empieza desde el primer frame en el JSON para 'idle'
                end: 11 // Último número de frame de 'idle' en el JSON
            }),
            frameRate: 20,
            repeat: -1 // Repetir indefinidamente
        });
    }
}
