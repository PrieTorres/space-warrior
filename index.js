import express from 'express';
import db from './server/dbConnect.js'
import routes from './server/routes/index.js';

db.on('error', console.log.bind(console, 'erro ao conectar no banco de dados'));

db.once("open", () => {
  console.log('conexão com o banco realizada com sucesso');
});

const appExpress = express();

routes(appExpress);

export default appExpress;
