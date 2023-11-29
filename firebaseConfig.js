// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const auth = getAuth(app);

const db = getFirestore(app);
// put the below line at the bottom of the file
const firestore = getFirestore(app);

export { app, auth, db, firestore, getApp, getAuth };
