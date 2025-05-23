import Constants from "../constantes";
import DBManager from "../database/dbManager";
import LevelHandler from "../escenas/levelHandler";

export default class Player extends Phaser.Physics.Arcade.Sprite{

    // Control de entrada
    private cursors : Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd : any; // Tipo any = tipo comodín
    private space : Phaser.Input.Keyboard.Key;

    private initialPositionX:any;
    private initialPositionY:any;

    private collisionActive : boolean;
    private collectingActive : boolean;

    private jumpCount: number;
    private maxJumps: number = 2;

    private jumpSound : Phaser.Sound.BaseSound;

    private database : DBManager;

    private escena : LevelHandler;

    // Controles para el HUD pantalla táctil
    public leftControl : boolean;
    public rightControl : boolean;
    public upControl : boolean;

    constructor(config:any){
        super(config.escena, config.x, config.y, config.texture);

        this.initialPositionX = config.x;
        this.initialPositionY = config.y;
        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);
        
        this.body?.setSize(20,25);
        this.setCollideWorldBounds(true);
        
        this.movementByKeyboard();
        this.animationSpritesPlayer();

        this.collisionActive = false;
        this.collectingActive = false;
        this.jumpCount = 0;

        this.jumpSound = this.escena.sound.add(Constants.SOUNDS.EFFECTS.JUMP, {
            loop: false,
            volume: 1.75
        });

        this.database = new DBManager();

        this.play(Constants.PLAYER.ANIMATION.IDLE);
    }

    update():void{
        // Control de movimiento del jugador
        // Izquierda
        if(this.wasd.A.isDown || this.cursors.left.isDown || this.leftControl){
            this.setVelocityX(-150);
            this.flipX = true;
            if(this.body?.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.RUN,true);
            }

        // Derecha
        }else if(this.wasd.D.isDown || this.cursors.right.isDown || this.rightControl){
            this.setVelocityX(+150);
            this.flipX = false;
            if(this.body?.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.RUN,true);
            }

        // Quieto
        }else{
            this.setVelocityX(0);
            if(this.body?.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.IDLE,true);
            }
        }

        // Salto
        const jumpPressed =
            Phaser.Input.Keyboard.JustDown(this.space) ||
            Phaser.Input.Keyboard.JustDown(this.wasd.W) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
            this.upControl; // Asumiendo que upControl se activa solo al presionar, no mantener
    
        // Ejecutar salto si aún no se alcanza el máximo permitido
        if (jumpPressed && this.jumpCount < this.maxJumps-1) {
            if (this.database.data.effects) {
                this.jumpSound.play();
            }
        
            this.setVelocityY(-250);
            this.anims.stop();
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.JUMP);
            this.jumpCount++;
        }

        if (this.body?.blocked.down) {
            this.jumpCount = 0;
        }

        // Caída
        if (this.body && this.body.velocity && !this.body.blocked.down && this.body.velocity.y > 0) {
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.FALL);
        }


    }

    /**
     * Función que realiza la conexión con las teclas del teclado para poder mover al personaje.
     */
    movementByKeyboard():void{
        // Entrada de movimiento por teclado
        this.cursors = this.escena.input.keyboard?.createCursorKeys()!;
        this.wasd = this.escena.input.keyboard?.addKeys('W,A,S,D');
        this.space = this.escena.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!;
    }

    /**
     * Función que crea los tipos de animaciones que necesita el personaje para su funcionamiento: 'RUN','IDLE'.
     */
    animationSpritesPlayer():void{
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
    }

    public worldBoundsCollision(player:Player){    
        player.escena.lifes--;
        player.escena.registry.set(Constants.GLOBAL_VARIABLES.LIFES, player.escena.lifes);
        player.escena.events.emit(Constants.EVENTS.LIFES);
        player.tint = 0xff0000; // Cambia el color del jugador a rojo
        player.escena.time.addEvent({
            delay: 600,
            callback: () => {
                player.collisionActive = false;
                player.clearTint(); // Limpia el tinte del jugador
            }
        });
        player.setPosition(player.initialPositionX,player.initialPositionY);
    }

    public enemyCollision(player: Player, enemy: Phaser.Physics.Arcade.Sprite): void {
        // Verificamos que player.body y enemy.body no sean null
        if (
            player.body &&
            enemy.body &&
            player.body.velocity.y > 1 &&
            enemy.body.touching.up &&
            player.body.touching.down
        ) {
            if (!player.collisionActive) {
                let posX = enemy.x;
                let posY = enemy.y;
                enemy.destroy();
    
                player.escena.score += 100;
                player.escena.registry.set(Constants.GLOBAL_VARIABLES.SCORE, player.escena.score);
                player.escena.events.emit(Constants.EVENTS.SCORE);
    
                let explosion: Phaser.GameObjects.Sprite = player.escena.add.sprite(
                    posX,
                    posY,
                    Constants.ENEMIES.DEATH.ID
                );
                let explosionSound: Phaser.Sound.BaseSound = player.escena.sound.add(Constants.SOUNDS.EFFECTS.ENEMY_DESTROY, {
                    loop: false
                });
                if(player.database.data.effects){
                    explosionSound.play();
                }
                explosion.play(Constants.ENEMIES.DEATH.ANIM);
                explosion.once('animationcomplete', () => {
                    explosion.destroy();
                });
            }
        } else if (!player.collisionActive) {
            player.escena.lifes--;
            player.escena.registry.set(Constants.GLOBAL_VARIABLES.LIFES, player.escena.lifes);
            player.escena.events.emit(Constants.EVENTS.LIFES);
    
            player.collisionActive = true;
            player.tint = 0xff0000; // Cambia el color del jugador a rojo
            player.escena.time.addEvent({
                delay: 600,
                callback: () => {
                    player.collisionActive = false;
                    player.clearTint(); // Limpia el tinte del jugador
                }
            });
        }
    }

    public collectObject(player: Player, collectable: Phaser.Physics.Arcade.Sprite): void {
        if(!this.collectingActive){
            this.collectingActive = true;
            
            player.escena.score += 50;
            player.escena.registry.set(Constants.GLOBAL_VARIABLES.SCORE, player.escena.score);
            player.escena.events.emit(Constants.EVENTS.SCORE);

            collectable.play(Constants.OBJECTS.ANIMATION);
            collectable.once('animationcomplete', () => {
                collectable.destroy();
                this.collectingActive = false;
            });
        }
    }
}