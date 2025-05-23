import Phaser from 'phaser';
import { Nivel1 } from './escenas/nivel1';
import Load from './escenas/load';
import Menu from './escenas/menu';
import HUD from './escenas/hud';
export const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: 'game-container',
    scene: [Load,
        Menu,
        HUD,
        Nivel1],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 600 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
