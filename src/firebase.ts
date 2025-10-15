// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaw5Dnz_CUB_uTqSyDI8sMpGkkhXm2vdM",
  authDomain: "pc-builder-533f2.firebaseapp.com",
  projectId: "pc-builder-533f2",
  storageBucket: "pc-builder-533f2.firebasestorage.app",
  messagingSenderId: "291671942265",
  appId: "1:291671942265:web:1fd22616879783d97ba0a8",
  measurementId: "G-EV14VDFF2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);