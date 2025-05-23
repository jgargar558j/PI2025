import Phaser from 'phaser';
import {config} from './configuracion';

export class Game extends Phaser.Game{
    constructor(config: Phaser.Types.Core.GameConfig){
        super(config);
    }
}

window.addEventListener('load', () => {
    new Game(config);
});