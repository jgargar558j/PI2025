import LevelHandler from "../escenas/levelHandler";

export default class Collectables extends Phaser.Physics.Arcade.Group{
    private escena: LevelHandler;

    constructor (escena: LevelHandler, nameObject:string, idObject:string, animObject: string){
        super(escena.physics.world, escena);

        this.escena = escena;

        this.addMultiple(this.escena.mapaNivel.createFromObjects(nameObject,{name:idObject, key: idObject}));
        this.escena.physics.world.enable(this.children.entries);
        escena.anims.create({
            key: animObject,
            frames: idObject,
            frameRate: 20,
            repeat: -1
        });
        this.children.entries.map((collectable:any) => {
            collectable.body.setAllowGravity(false);
            collectable.body.setImmovable(true);
            collectable.play(animObject);
        });
    }
}