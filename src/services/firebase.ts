import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXX9QClh4AacYxTbuK1vMB--Q83MD0eqg",
  authDomain: "gaber-b611d.firebaseapp.com",
  projectId: "gaber-b611d",
  storageBucket: "gaber-b611d.firebasestorage.app",
  messagingSenderId: "504073481531",
  appId: "1:504073481531:web:7ae9ed25ca0c564edbdb1e"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firestore = getFirestore(app)