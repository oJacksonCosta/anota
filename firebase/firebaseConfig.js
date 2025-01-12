import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIZKgSz_t8F3fjkmdthKmwyMZflVQVnEg",
  authDomain: "anota-54767.firebaseapp.com",
  projectId: "anota-54767",
  storageBucket: "anota-54767.firebasestorage.app",
  messagingSenderId: "183749902008",
  appId: "1:183749902008:web:b6e741ff24f23f8a503e4d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
