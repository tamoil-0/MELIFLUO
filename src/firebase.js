import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXOsdBDHjnRj3QenFO0N8MuzRdEub-Ly8",
  authDomain: "melifluo-702cc.firebaseapp.com",
  projectId: "melifluo-702cc",
  storageBucket: "melifluo-702cc.firebasestorage.app",
  messagingSenderId: "505974924146",
  appId: "1:505974924146:web:794640e7bb97000f87f3eb",
  measurementId: "G-WTVZQ4PHQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
