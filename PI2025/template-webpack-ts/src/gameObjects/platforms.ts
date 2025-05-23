import Constants from "../constantes";
import LevelHandler from "../escenas/levelHandler";

export default class Platforms extends Phaser.Physics.Arcade.Group{
    public scene: LevelHandler;
    private velocity: number;
    private horizontal:boolean;

    constructor(scene: LevelHandler, nameObject:string, idObject:string, animObject: string, velocity:number, horizontal:boolean){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.velocity = velocity;

        this.horizontal = horizontal;

        let platformNameObject : string = (this.horizontal) ? Constants.PLATFORM_HORIZONTAL : Constants.PLATFORM_VERTICAL;

        scene.anims.create({
            key: animObject,
            frames: idObject,
            frameRate: 10,
            repeat: -1
        });

        this.addMultiple(scene.mapaNivel.createFromObjects(nameObject,{name:platformNameObject, key:idObject}));

        this.children.entries.map((platform:any) => {
            platform.body.setCollideWorldBounds(true);
            platform.body.setAllowGravity(false);
            platform.body.setImmovable(true);
            platform.body.setSize(32, 8);
            platform.body.setOffset(0, 0);
            platform.play(animObject);
            if(this.horizontal){
                platform.body.setVelocityX(this.velocity);
                platform.body.setFrictionX(1);
                this.movePlatformHorizontal(Phaser.Math.Between(0,1) ? 'left' : 'right', platform);
            } else{
                platform.body.setVelocityY(this.velocity);
                platform.body.setFrictionY(1);
                this.movePlatformVertical(Phaser.Math.Between(0,1) ? 'up' : 'down', platform);
            }
        });
    } 

    movePlatformHorizontal(direction: string, platform: any) {
        if (direction === 'left') {
            platform.body.setVelocityX(-this.velocity);
        }else{
            platform.body.setVelocityX(this.velocity);
        }
    }

    movePlatformVertical(direction: string, platform: any) {
        if (direction === 'up') {
            platform.body.setVelocityY(-this.velocity);
        }else{
            platform.body.setVelocityY(this.velocity);
        }
    }

    public update(): void{
        this.children.entries.map((platform:any) => {
            if(this.horizontal){
                if(platform.body.velocity.x === 0){
                    this.movePlatformHorizontal(Phaser.Math.Between(0,1) ? 'left' : 'right', platform);
                }
                if(platform.body.blocked.right || platform.body.blocked.left) {
                    if (platform.body.velocity.x < 0) {
                        this.movePlatformHorizontal('right', platform);
                    } else {
                        this.movePlatformHorizontal('left', platform);
                    }
                }
            }else{
                if(platform.body.velocity.y === 0){
                    this.movePlatformVertical(Phaser.Math.Between(0,1) ? 'up' : 'down', platform);
                }
                if(platform.body.blocked.up || platform.body.blocked.down) {
                    if (platform.body.velocity.y < 0) {
                        this.movePlatformVertical('down', platform);
                    } else {
                        this.movePlatformVertical('up', platform);
                    }
                }
            }
        });
    }
}