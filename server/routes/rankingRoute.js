import Express from 'express';
import pedidosControllers from './controllers/rankController.js';

const router = Express.Router();

router
    .get('/rank', pedidosControllers.listRank)
    .post('/rank', pedidosControllers.saveRank)
    .delete('/rank/:id', pedidosControllers.deleteRank)


export default router;
