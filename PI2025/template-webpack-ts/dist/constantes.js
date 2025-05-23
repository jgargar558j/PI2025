const Constants = {
    SCENES: {
        LOAD: 'Load',
        MENU: 'Menu',
        HUD: 'HUD',
        LEVEL_1: 'Nivel1'
    },
    MAPS: {
        LEVEL_1: {
            TILEMAP_JSON: 'nivel1',
            PLATFORM_LAYER: 'Plataformas'
        },
        TILESET: 'nivelestileset',
        FINAL_POSITION: 'PosicionFinal'
    },
    BACKGROUNDS: {
        LEVEL_1: 'Brown'
    },
    EVENTS: {
        LIFES: 'changeLifes',
        SCORE: 'changeScore'
    },
    GLOBAL_VARIABLES: {
        SCORE: 'score',
        LIFES: 'lifes'
    },
    TEXTS: {
        PLAY: 'JUGAR',
        PLAYING: 'JUGANDO',
        SCORE_PLUS: 'SCORE +',
        LIFES_MINUS: 'VIDAS -'
    },
    FONTS: {
        JSON: 'JSONfont',
        IMAGE: 'fontImage',
        BITMAP: 'pixelFont'
    },
    PLAYER: {
        ID: 'ninjaFrog', // Nombre del sprite o ID que se usa en el atlas
        ANIMATION: {
            IDLE: 'idle', // Nombre de la animación para 'idle'
            RUN: 'run',
            JUMP: 'jump',
            FALL: 'fall'
        }
    },
    OBJECTS: {
        FINAL_OBJECT: 'end'
    }
};
export default Constants;
