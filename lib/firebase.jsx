// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyADwvUCszPTEkOIvjLW8aJUiZABmW7lp3s",
  authDomain: "anil-project-fac99.firebaseapp.com",
  projectId: "anil-project-fac99",
  storageBucket: "anil-project-fac99.firebasestorage.app",
  messagingSenderId: "298978705060",
  appId: "1:298978705060:web:6fc020c7aeb6180f373031"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

