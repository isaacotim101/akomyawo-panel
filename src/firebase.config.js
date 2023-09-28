// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoBoXmU1gdLhzItM5by2Ucx6hBJmlPkvY",
  authDomain: "africanjearts-f0dc5.firebaseapp.com",
  projectId: "africanjearts-f0dc5",
  storageBucket: "africanjearts-f0dc5.appspot.com",
  messagingSenderId: "378160449550",
  appId: "1:378160449550:web:5889b42775cfa467a4d45f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
