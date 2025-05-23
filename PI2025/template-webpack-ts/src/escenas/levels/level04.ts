import LevelHandler from "../levelHandler";
import Constants from "../../constantes";

export class Level04 extends LevelHandler {
    constructor(){
        super(Constants.SCENES.LEVELS.LEVEL_4);
    }

    create(): void {
        this.createStage(Constants.MAPS.LEVELS.LEVEL_4.TILEMAP_JSON, Constants.MAPS.PLATFORM_LAYER, Constants.BACKGROUNDS.LEVEL_4);

        this.createEnemies([Constants.ENEMIES.BUNNY]) // , Constants.ENEMIES.BEE para añadir más enemigos
        this.createCollectables([Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE, Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA, Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY]);
    }
}