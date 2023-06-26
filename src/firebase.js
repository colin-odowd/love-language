// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmivNy-YHlrPeuNF2xrts2GrpcNJn0QbI",
  authDomain: "love-language-95263.firebaseapp.com",
  projectId: "love-language-95263",
  storageBucket: "love-language-95263.appspot.com",
  messagingSenderId: "740358718165",
  appId: "1:740358718165:web:6b5c0fa65e8be89a21185c",
  measurementId: "G-RP2SL7R9ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase database
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage, analytics };
