// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blog-75424.firebaseapp.com",
  projectId: "my-blog-75424",
  storageBucket: "my-blog-75424.firebasestorage.app",
  messagingSenderId: "1075824023229",
  appId: "1:1075824023229:web:1b41c70b23cda4939449d4",
  measurementId: "G-SLLGB65CTM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
