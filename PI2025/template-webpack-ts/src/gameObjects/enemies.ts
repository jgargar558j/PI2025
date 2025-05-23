import Constants from "../constantes";
import LevelHandler from "../escenas/levelHandler";

export default class Enemies extends Phaser.Physics.Arcade.Group{
    public scene: LevelHandler;
    private velocity: number;

    constructor(scene: LevelHandler, nameObject:string, idObject:string, animObject: string, velocity:number){
        super(scene.physics.world, scene);
        this.scene = scene;
        this.velocity = velocity;
        
        // Crear el grupo de enemigos
        this.addMultiple(scene.mapaNivel.createFromObjects(nameObject,{name:idObject}));

        // Dar fisica
        scene.physics.world.enable(this.children.entries);

        // Dar animación
        scene.anims.create({
            key: animObject,
            frames: idObject,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((enemy:any) => {
            enemy.body.setCollideWorldBounds(true);
            switch (idObject) {
                case Constants.ENEMIES.BUNNY.ID: {
                    enemy.body.setSize(25, 25); // Ajusta el tamaño del cuerpo del enemigo
                    enemy.body.setOffset(5, 15); // Ajusta el offset del cuerpo del enemigo
                    break;
                }
                default: {
                    enemy.body.setSize(20, 20); // Ajusta el tamaño del cuerpo del enemigo
                    break;
                }
            }
            enemy.play(animObject);
            this.moveEnemy(Phaser.Math.Between(0,1) ? 'left' : 'right', enemy);
        });
    }

    moveEnemy(direction: string, enemy: any): void {
        if (direction === 'left') {
            enemy.body.setVelocityX(-this.velocity);
            enemy.flipX = false; // Voltea el sprite a la izquierda
        }else if (direction === 'right') {
            enemy.body.setVelocityX(this.velocity);
            enemy.flipX = true; // Voltea el sprite a la derecha
        }
    }

    public update(): void{
        this.children.entries.map((enemy:any) => {
            if(enemy.body.velocity.x === 0){
                this.moveEnemy(Phaser.Math.Between(0,1) ? 'left' : 'right', enemy);
            }
            if(enemy.body.blocked.right || enemy.body.blocked.left) {
                if (enemy.body.velocity.x < 0) {
                    this.moveEnemy('right', enemy);
                } else {
                    this.moveEnemy('left', enemy);
                }
            }
        });

    }
}