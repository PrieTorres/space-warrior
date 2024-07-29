import express from 'express';
import ranking from './rankingRoute.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirName = __dirname.slice(0, -14)

const routes = (app) => {
  app.use(express.static(path.join(dirName, 'build')));
  app.use(express.json());
  app.use(cors({origin: true}));
  app.use('/api', ranking);
  app.get('*', (req, res) => {
    res.sendFile(path.join(dirName, 'build', 'index.html'));
  });

}

export default routes;
