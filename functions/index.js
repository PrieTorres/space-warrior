/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const { default: rankingController } = require("../server/routes/controllers/rankController");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { default: appExpress } = require("..");

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbStringConnection = `mongodb+srv://${user}:${password}@spacewarrior.2fypyzc.mongodb.net/`;

mongoose.connect(dbStringConnection);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.addRank = onRequest(rankingController.saveRank);
// exports.getRanks = onRequest(rankingController.listRank);
exports.app = onRequest(appExpress);

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });
