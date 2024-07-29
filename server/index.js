import express from 'express';
import functions from "firebase-functions";
import cors from "cors";
import db from './dbConnect.js'
import routes from './routes/index.js';

db.on('error', console.log.bind(console, 'erro ao conectar no banco de dados'));

db.once("open", () => {
  console.log('conexão com o banco realizada com sucesso');
});

const appExpress = express();
appExpress.use(cors());
appExpress.get("/", (req, res) => {
  res.send('Hello World!');
});

routes(appExpress);

const app = functions.https.onRequest(appExpress);

export { app };
export default appExpress;
