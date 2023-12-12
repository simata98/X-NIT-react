import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxHjiqHUqsFdCYeMHp4UReTccqCZWdEhY",
  authDomain: "x-nit-22836.firebaseapp.com",
  projectId: "x-nit-22836",
  storageBucket: "x-nit-22836.appspot.com",
  messagingSenderId: "327091377215",
  appId: "1:327091377215:web:4d023820097f1661b3548a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);