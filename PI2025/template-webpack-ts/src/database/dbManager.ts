import Constants from "../constantes";

export default class DBManager {
    public data: any;

    constructor() {
        const dbData = localStorage.getItem(Constants.LOCAL_STORAGE.DB_NAME);
        if (dbData) {
            try {
                this.data = JSON.parse(dbData);
            } catch (error) {
                console.error("Error al parsear los datos de la base de datos:", error);
                this.createDB();
            }
        } else {
            this.createDB();
        }
    }

    private createDB(): void {
        const initialDB = {
            music: true,
            effects: true,
            levels: {
                level01: {
                    score: 0,
                    isPassed: false
                },
                level02: {
                    score: 0,
                    isPassed: false
                },
                level03: {
                    score: 0,
                    isPassed: false
                },
                level04:{
                    score: 0,
                    isPassed: false
                },
                level05:{
                    score: 0,
                    isPassed: false
                }
            }
        };
        this.data = initialDB;
        this.saveDB();
    }

    public saveDB(): void {
        localStorage.setItem(Constants.LOCAL_STORAGE.DB_NAME, JSON.stringify(this.data));
    }
}