// Firebase configuration
// IMPORTANT: Replace these values with your own Firebase project config.
// Go to https://console.firebase.google.com -> Project Settings -> General -> Your apps -> Web app

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvHF4AHivT_sjVCf_2WccfrYPYbLuO6jw",
  authDomain: "eshop-a86a7.firebaseapp.com",
  projectId: "eshop-a86a7",
  storageBucket: "eshop-a86a7.firebasestorage.app",
  messagingSenderId: "758506553974",
  appId: "1:758506553974:web:2ca8ef2515002f9c851557",
  measurementId: "G-HVTBHZQS2D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
