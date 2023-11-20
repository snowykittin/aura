// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbm-c774m28VxqIM3qc8lkFd9ohAL60ik",
  authDomain: "data-law.firebaseapp.com",
  projectId: "data-law",
  storageBucket: "data-law.appspot.com",
  messagingSenderId: "385149619141",
  appId: "1:385149619141:web:43ce6b49beb3b707ee59ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// put the below line at the bottom of the file
export const firestore = getFirestore(app);
