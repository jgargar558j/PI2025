import Load from './escenas/load';
import Menu from './escenas/menu';
import HUD from './escenas/hud';
import Settings from './escenas/settings';
import Credits from './escenas/credits';
import LevelSelection from './escenas/levelSelection';
import {Level01,} from './escenas/levels/level01';
import { Level02 } from './escenas/levels/level02';
import { Level03 } from './escenas/levels/level03';
import LevelEnd from './escenas/levelEnd';
import { Level04 } from './escenas/levels/level04';
import { Level05 } from './escenas/levels/level05';

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 854,
        height: 480,
        parent: 'game-container',
    },
    scene: [Load,
            Menu,
            HUD,
            Settings,
            Credits,
            LevelSelection,
            LevelEnd,
            Level01,
            Level02,
            Level03,
            Level04,
            Level05],
    render:{
        pixelArt : true,
        antialias:true
    },
    physics:{
        default:'arcade',
        arcade:{
            gravity:{x:0,y:600},
            debug:false
        }
    },
    audio: {
        disableWebAudio: true
    },
};