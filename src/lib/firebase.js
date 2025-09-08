// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl5bK_7VhoveylDLYPl3B_xly6ALN8jOw",
  authDomain: "ilhaselementais.firebaseapp.com",
  projectId: "ilhaselementais",
  storageBucket: "ilhaselementais.appspot.com",
  messagingSenderId: "479508471261",
  appId: "1:479508471261:web:05fb638b52afae7eb52a34",
  measurementId: "G-KV37YL80QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth, analytics };