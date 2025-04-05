// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV8XPHJTIjQSxRa8rXAGoMpZYYpY1N2SA",
  authDomain: "shopcart-c83e2.firebaseapp.com",
  projectId: "shopcart-c83e2",
  storageBucket: "shopcart-c83e2.firebasestorage.app",
  messagingSenderId: "544876255723",
  appId: "1:544876255723:web:5f53f3ea340857fb73a1ae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
