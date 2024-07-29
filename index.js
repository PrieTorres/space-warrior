import express from 'express';
import functions from "firebase-functions";
import cors from "cors";
import db from './server/dbConnect.js'
import routes from './server/routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const buildPath = path.join(__dirname, 'build');

db.on('error', console.log.bind(console, 'erro ao conectar no banco de dados'));

db.once("open", () => {
  console.log('conexão com o banco realizada com sucesso');
});

const appExpress = express();

appExpress.use(express.static(buildPath));
appExpress.use(express.json());
appExpress.use(cors());
appExpress.get("/", (req, res) => {
  res.send('Hello World!');
});

routes(appExpress);

const app = functions.https.onRequest(appExpress);

export { app };
export default appExpress;
