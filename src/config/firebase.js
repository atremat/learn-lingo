// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'learnlingo-project-ed08f.firebaseapp.com',
  projectId: 'learnlingo-project-ed08f',
  storageBucket: 'learnlingo-project-ed08f.appspot.com',
  messagingSenderId: '1006360093652',
  appId: '1:1006360093652:web:4a98a1e96effd045512c41',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
