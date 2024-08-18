// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9NEPrWFYe2LIx1-s5gtk7G1y3fz1OVcg",
  authDomain: "payment-reminder-65967.firebaseapp.com",
  projectId: "payment-reminder-65967",
  storageBucket: "payment-reminder-65967.appspot.com",
  messagingSenderId: "908601290331",
  appId: "1:908601290331:web:38af046a81bef43bf9597e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, setDoc, doc, getDoc, collection, query, where, getDocs };




