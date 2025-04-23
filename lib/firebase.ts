// firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC_3uNrdj_Ny_68fIlWLCxFXCIfYxW7KWM",
  authDomain: "cmc-db-final.firebaseapp.com",
  projectId: "cmc-db-final",
  storageBucket: "cmc-db-final.firebasestorage.app",
  messagingSenderId: "931051452635",
  appId: "1:931051452635:web:53ba3e0194d3705530b4fe",
  measurementId: "G-E8EH6HD13J"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth with AsyncStorage persistence
const auth = getApps().length === 0
  ? initializeAuth(app, {
      persistence: browserLocalPersistence,
    })
  : getAuth(app);

// Firestore
const db = getFirestore(app);

export { auth, db };
