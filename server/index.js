import express from 'express';
import db from './dbConnect.js'
import routes from './routes/index.js';

db.on('error', console.log.bind(console, 'erro ao conectar no banco de dados'));

db.once("open", () => {
    console.log('conexão com o banco realizada com sucesso');
});

const app = express();

routes(app);

export default app;
