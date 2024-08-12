import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
  window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const firebaseApp = initializeApp(firebaseConfig);
initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider(process.env.REACT_APP_RECAPTCHA_KEY_ENTERPRISE),
  isTokenAutoRefreshEnabled: true
});

export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
