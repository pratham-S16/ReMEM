// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyDa2obZivXbcNy8gVj4wqPO0cUxhao2mTA",
  authDomain: "remem-d74dd.firebaseapp.com",
  projectId: "remem-d74dd",
  storageBucket: "remem-d74dd.firebasestorage.app",
  messagingSenderId: "187036472674",
  appId: "1:187036472674:web:3121351c98cec73b5a883b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
