import LevelHandler from "../levelHandler";
import Constants from "../../constantes";

export class Level01 extends LevelHandler {
    constructor(){
        super(Constants.SCENES.LEVELS.LEVEL_1);
    }

    create(): void {
        this.createStage(Constants.MAPS.LEVELS.LEVEL_1.TILEMAP_JSON, Constants.MAPS.PLATFORM_LAYER, Constants.BACKGROUNDS.LEVEL_1);

        this.createEnemies([Constants.ENEMIES.BUNNY]) // , Constants.ENEMIES.BEE para añadir más enemigos
        this.createCollectables([Constants.OBJECTS.COLLECTABLES.FRUITS.APPLE, Constants.OBJECTS.COLLECTABLES.FRUITS.BANANA, Constants.OBJECTS.COLLECTABLES.FRUITS.CHERRY]);
        
        this.createDecorativeImages(Constants.MAPS.LOGO,Constants.OBJECTS.LOGO);

        this.createLevelTexts(Constants.MAPS.TEXTS);
    }
}