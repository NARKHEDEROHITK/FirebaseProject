// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCojUTaHJiHO7QtiscKea0AvAisfTwfgI",
  authDomain: "eshop-d3609.firebaseapp.com",
  projectId: "eshop-d3609",
  storageBucket: "eshop-d3609.appspot.com",
  messagingSenderId: "296874433921",
  appId: "1:296874433921:web:09a90a5b25940041905c80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app