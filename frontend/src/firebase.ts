// Firebase configuration (currently not used in the app)
// This file is kept for future Firebase features

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

// Initialize Analytics safely (only in production/HTTPS)
let analytics: ReturnType<typeof getAnalytics> | null = null;
try {
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    analytics = getAnalytics(app);
  }
} catch (error) {
  // Analytics not available (e.g., localhost), continue without it
  console.debug("Firebase Analytics not available:", error);
}

export { analytics };

