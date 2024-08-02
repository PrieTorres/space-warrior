import express from 'express';
import routes from './server/routes/index.js';

const appExpress = express();

routes(appExpress);

export default appExpress;
