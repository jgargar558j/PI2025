const Constants = {
    SCENES:{
        LOAD: 'Load',
        MENU: 'Menu',
        SETTINGS: 'Settings',
        CREDITS: 'Credits',
        HUD: 'HUD',
        LEVEL_SELECTION: 'LevelSelection',
        LEVEL_END: 'LevelEnd',
        LEVELS:{
            LEVEL_1: 'Level01',
            LEVEL_2: 'Level02',
            LEVEL_3: 'Level03',
            LEVEL_4: 'Level04',
            LEVEL_5: 'Level05'
        }
    },
    MAPS:{
        LEVELS:{
            LEVEL_1:{
                TILEMAP_JSON: 'nivel1',
            },
            LEVEL_2:{
                TILEMAP_JSON: 'nivel2',
            },
            LEVEL_3:{
                TILEMAP_JSON: 'nivel3',
            },
            LEVEL_4:{
                TILEMAP_JSON: 'nivel4',
            },
            LEVEL_5:{
                TILEMAP_JSON: 'nivel5',
            }
        },
        PLATFORM_LAYER: 'Plataformas',
        TILESET: 'nivelestileset',
        FINAL_POSITION: 'PosicionFinal',
        ENEMIES: 'enemies',
        PLATFORMS: 'platforms',
        COLLECTABLES: 'collectables',
        LOGO: 'logo',
        FAKE_FINAL: 'fakeFinal',
        TEXTS: 'texto'
    },
    BACKGROUNDS:{
        LEVEL_1: 'Blue',
        LEVEL_2: 'Green',
        LEVEL_3: 'Brown',
        LEVEL_4: 'Gray'
    },
    EVENTS:{
        LIFES: 'changeLifes',
        SCORE: 'changeScore',
        TIME: 'time'
    },
    GLOBAL_VARIABLES:{
        MUSIC: 'music',
        EFFECTS: 'effects',
        SCORE: 'score',
        LIFES: 'lifes',
        TIME: 'time'
    },
    TEXTS:{
        MENU:{
            LOADING: 'CARGANDO...',
            SETTINGS: 'AJUSTES',
            TITLE: 'FrogAlone',
            BACK: 'VOLVER',
            PLAY: 'JUGAR',
            CONFIGURATION : 'AJUSTES',
            LEVEL_SELECTION: 'SELECCION DE NIVELES',
            CREDITS: 'CREDITOS',
            WIN: 'HAS GANADO',
            LOSE: 'HAS PERDIDO',
            SCORE: 'PUNTUACION:',
            PASSED: 'SUPERADO',
            NON_PASSED: 'NO SUPERADO',
            MUSIC: 'MUSICA',
            EFFECTS: 'EFECTOS'
        },
        MAPS:{
            LEVEL_1:'NIVEL 1',
            LEVEL_2:'NIVEL 2',
            LEVEL_3:'NIVEL 3',
            LEVEL_4:'NIVEL 4',
            LEVEL_5:'NIVEL 5',
        },
        CREDITS:{
            GAME_DEVELOPER: 'DESARROLLADOR: JOSE LUIS GARCIA',
            VERSION: 'VERSION 1.0',
            GAME_TITLE: 'FROGALONE',
            SPRITES: 'SPRITES: -PIXEL ADVENTURE BY PIXELFROG\n         -SUNNYLAND WOODS BY THETOADZ',
            MUSIC_MENU: 'MUSICA DEL MENU:\n -BETABEATS FROM WWW.FREESOUND.ORG',
            MUSIC_INGAME: 'MUSICA IN-GAME:\n -EDWARDSZAKAL FROM WWW.FREESOUND.ORG',
        }
    },
    SETTINGS:{
        SOUND_ON: 'soundon',
        SOUND_OFF: 'soundoff'
    },
    FONTS:{
        JSON: 'JSONfont',
        IMAGE: 'fontImage',
        BITMAP: 'pixelFont'
    },
    PLAYER: {
        ID: 'ninjaFrog',
        ANIMATION: {
            IDLE: 'idle',
            RUN: 'run',
            JUMP: 'jump',
            FALL: 'fall'
        }
    },
    OBJECTS:{
        FINAL_OBJECT: 'end',
        COLLECTABLES:{
            FRUITS:{
                APPLE:{
                    ID:'apple',
                    ANIMATION:'apple',
                },
                BANANA:{
                    ID:'banana',
                    ANIMATION:'banana',
                },
                CHERRY:{
                    ID:'cherry',
                    ANIMATION:'cherry',
                }
            }
        },
        LOGO: 'logoNoBG',
        ANIMATION:'collected'

    },
    ENEMIES:{
        BUNNY:{
            ID:'bunny',
            ANIMATION:'bunny',
            VELOCITY: 75
        },
        DEATH:{
            ID:'death',
            ANIM:'death'
        }
    },
    PLATFORMS:{
        ID:'platforms',
        ANIMATION:'platforms',
        VELOCITY: 50
    },
    PLATFORM_VERTICAL:'platformVertical',
    PLATFORM_HORIZONTAL:'platformHorizontal',

    SOUNDS:{
        EFFECTS:{
            JUMP: 'jump',
            COIN: 'coin',
            ENEMY_DESTROY: 'enemyDestroy',
            PLAYER_DAMAGE: 'playerDamage',
            COLLECT: 'collect',
        },
        MUSIC:{
            BACKGROUND: 'backgroundMusic',
            IN_GAME: 'backgroundMusicGame'
        }
    },

    LOCAL_STORAGE:{
        DB_NAME: 'FrogAlonev1.0',
    },

    CONTROLS:{
        LEFT: 'arrowLeft',
        RIGHT: 'arrowRight',
        UP: 'arrowUp',
    }
    
}

export default Constants;