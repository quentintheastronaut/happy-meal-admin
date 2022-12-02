// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDE2d4papCqehHrXp-6r7JdtBnYVRFt1m0',
  authDomain: 'happy-meal-5f5a4.firebaseapp.com',
  projectId: 'happy-meal-5f5a4',
  storageBucket: 'happy-meal-5f5a4.appspot.com',
  messagingSenderId: '624693673102',
  appId: '1:624693673102:web:ad150630e7cdfdef529ddf',
  measurementId: 'G-LNVNYBQXYJ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
