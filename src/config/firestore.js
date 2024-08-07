// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
/*import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";*/
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
//self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.APP_CHECK_DEBUG_TOKEN_FROM_CI;
if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
  window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const firebaseApp = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});
//export const db = firebase.firestore();
export const db = getFirestore(firebaseApp);

//export const analytics = getAnalytics(firebaseApp);
