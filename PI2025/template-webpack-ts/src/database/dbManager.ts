import { ref, set } from "firebase/database";
import Constants from "../constantes";
import { database } from "./firebaseConfig";

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
          isPassed: false,
        },
        level02: {
          score: 0,
          isPassed: false,
        },
        level03: {
          score: 0,
          isPassed: false,
        },
        level04: {
          score: 0,
          isPassed: false,
        },
        level05: {
          score: 0,
          isPassed: false,
        },
      },
    };
    this.data = initialDB;
    this.saveDB();
  }

  public saveDB(): void {
    localStorage.setItem(
      Constants.LOCAL_STORAGE.DB_NAME,
      JSON.stringify(this.data)
    );
  }

  public canAccessLevel(level: string): boolean {
    const prerequisites: { [key: string]: string | null } = {
      level01: null,
      level02: "level01",
      level03: "level02",
      level04: "level03",
      level05: "level04",
    };

    const requiredLevel = prerequisites[level];
    if (!requiredLevel) return true;

    return this.data.levels[requiredLevel]?.isPassed === true;
  }

  public saveResumenToFirebase(userName: string): void {
    const userId = userName;

    let puntuacionTotal = 0;
    for (const nivel in this.data.levels) {
      const nivelData = this.data.levels[nivel];
      if (nivelData.isPassed) {
        puntuacionTotal += nivelData.score;
      }
    }

    const resumen = {
      nombre: userId,
      puntuacionTotal: puntuacionTotal,
    };

    const dbRef = ref(database, `jugadores/${userId}`);
    set(dbRef, resumen)
      .then(() => console.log("Resumen guardado en Firebase"))
      .catch((error) => console.error("Error al guardar resumen:", error));
  }
}
