import LevelHandler from "../levelHandler";
import Constants from "../../constantes";

export class Level02 extends LevelHandler {
    constructor(){
        super(Constants.SCENES.LEVELS.LEVEL_2);
    }

    create(): void {
        this.createStage(Constants.MAPS.LEVELS.LEVEL_2.TILEMAP_JSON, Constants.MAPS.PLATFORM_LAYER, Constants.BACKGROUNDS.LEVEL_2);

        this.createEnemies([Constants.ENEMIES.BUNNY]) // , Constants.ENEMIES.BEE para añadir más enemigos
        this.createCollectables([Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE, Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA, Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY]);
    }
}