// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'mern-auth-80129.firebaseapp.com',
  projectId: 'mern-auth-80129',
  storageBucket: 'mern-auth-80129.appspot.com',
  messagingSenderId: '342088668614',
  appId: '1:342088668614:web:975d51bbbd7bd5ca3c0ec7'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
