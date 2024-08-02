{
  "name": "space-warrior",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "homepage": "https://prietorres.github.io/space-warrior/",
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "animate.css": "^4.1.1",
    "babel-plugin-react-css-modules": "^5.2.6",
    "concurrently": "^8.2.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "firebase": "^10.12.4",
    "firebase-functions": "^5.0.1",
    "lodash": "^4.17.21",
    "mongoose": "^8.5.1",
    "nodemon": "^3.1.4",
    "path": "^0.12.7",
    "postcss": "^8.4.31",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-joystick-component": "^6.2.1",
    "react-scripts": "5.0.1",
    "sass": "^1.67.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy-pages": "npm run build && gh-pages -d build",
    "start": "nodemon src/server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint-plugin-prettier": "^5.0.0",
    "gh-pages": "^6.0.0",
    "prettier": "^3.0.0"
  }
}









/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
// const { default: rankingController } = require("../server/routes/controllers/rankController");
initializeApp()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { default: appExpress } = require("..");

try {
  dotenv.config();

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbStringConnection = `mongodb+srv://${user}:${password}@spacewarrior.2fypyzc.mongodb.net/`;

  mongoose.connect(dbStringConnection);
} catch (err) {
  logger.error(err, err?.message, { structuredData: true });
}

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.addRank = onRequest(rankingController.saveRank);
// exports.getRanks = onRequest(rankingController.listRank);
exports.app = onRequest(appExpress);

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });










{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^12.1.0",
    "firebase-functions": "^5.0.0",
    "mongoose": "^8.5.1",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "firebase-functions-test": "^3.1.0"
  },
  "private": true
}



https://www.youtube.com/watch?v=LCvBPsuHe6g
