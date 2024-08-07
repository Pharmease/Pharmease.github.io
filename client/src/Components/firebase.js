// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  get,
  update,
  child,
} from "firebase/database";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs05-AkFxjanMpraP3FCxkUa2ShS8ZFmM",
  authDomain: "pharmease-74d30.firebaseapp.com",
  projectId: "pharmease-74d30",
  storageBucket: "pharmease-74d30.appspot.com",
  messagingSenderId: "987810303149",
  appId: "1:987810303149:web:3215b630557e1b474c8a24",
  measurementId: "G-JCDL28DTSJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

export default app;
export {
  getDatabase,
  database,
  ref,
  set,
  onValue,
  get,
  push,
  update,
  child,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getStorage,
  uploadBytes,
  storageRef,
  getDownloadURL,
  uploadBytesResumable,
};
