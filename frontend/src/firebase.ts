import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_uUjjdWzPqhX79Y7w3utxgn0tcKdjosI",
  authDomain: "pc-builder-backend.firebaseapp.com",
  projectId: "pc-builder-backend",
  storageBucket: "pc-builder-backend.firebasestorage.app",
  messagingSenderId: "456294698597",
  appId: "1:456294698597:web:d9678073266b542d7a408c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
