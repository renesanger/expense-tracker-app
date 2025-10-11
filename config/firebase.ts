// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKuW_hQmcJ-N3xSzIQFJQWfzhKu207Rh0",
  authDomain: "expense-tracker-dc88a.firebaseapp.com",
  projectId: "expense-tracker-dc88a",
  storageBucket: "expense-tracker-dc88a.firebasestorage.app",
  messagingSenderId: "261948614623",
  appId: "1:261948614623:web:e8ed28b62453e1dcd9866a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//db
export const firestore = getFirestore(app);
