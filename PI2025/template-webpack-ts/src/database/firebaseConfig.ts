// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB44_8D563uv-utz8sSSd7E-ap5ukDNP9o",
  authDomain: "frogalone-77.firebaseapp.com",
  databaseURL: "https://frogalone-77-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "frogalone-77",
  storageBucket: "frogalone-77.firebasestorage.app",
  messagingSenderId: "1051677992729",
  appId: "1:1051677992729:web:3e14cdeb237608863e4788"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
