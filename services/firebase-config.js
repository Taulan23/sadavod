import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKn7rY-dFZXwjmSjy7RBVoRLuBoKFEgaQ",
  authDomain: "sadavod-96f16.firebaseapp.com",
  projectId: "sadavod-96f16",
  storageBucket: "sadavod-96f16.firebasestorage.app",
  messagingSenderId: "1077640570744",
  appId: "1:1077640570744:web:6883c984f263795ddcca8d",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
