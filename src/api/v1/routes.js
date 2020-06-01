import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';
import Controller from './Controller';
import validation from './validation';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Backend api is running' });
});

routes.use(authMiddleware);

routes.get('/crud', (req, res) => {
  return res
    .status(200)
    .json({ message: 'Backend api is running and token is valid' });
});
routes.post('/crud', validation, Controller.index);

export default routes;
