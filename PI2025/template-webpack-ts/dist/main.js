import Phaser from 'phaser';
import { config } from './configuracion';
export class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}
window.addEventListener('load', () => {
    new Game(config);
});
