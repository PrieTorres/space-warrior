// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR8fPf1_bwIrelQE3m73_Q8tS93jX4MbU",
  authDomain: "space-warrior-48bc2.firebaseapp.com",
  projectId: "space-warrior-48bc2",
  storageBucket: "space-warrior-48bc2.appspot.com",
  messagingSenderId: "388747600032",
  appId: "1:388747600032:web:91d11874d6b24b074fa9c5",
  measurementId: "G-5RGQGNW3G2"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
//export const db = firebase.firestore();
export const db = getFirestore(firebaseApp);

//export const analytics = getAnalytics(firebaseApp);
