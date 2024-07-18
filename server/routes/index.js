import express from 'express';
import ranking from './rankingRoute.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirName = __dirname.slice(0, -7)

const routes = (app) => {
/*
  app.route('/').get((req, res) => {
    res.status(200).sendFile(path.join(dirName, '/'))
  })
  app.use(
    express.json(),
    express.static(dirName + '/'),
    express.static(dirName + '/node_modules/file-saver'),
    ranking
  )*/

  app.use(express.static(path.join(dirName, 'build')));
  app.use(express.json());
  app.use('/api', ranking);
  app.get('*', (req, res) => {
    res.sendFile(path.join(dirName, 'build', 'index.html'));
  });

}

export default routes;
