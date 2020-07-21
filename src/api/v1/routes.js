import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';
import Controller from './Controller';
import validation, { execValidation, execManyValidation } from './validation';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Database API is running' });
});

// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
routes.use(authMiddleware);

routes.get('/crud', (req, res) => {
  return res
    .status(200)
    .json({ message: 'Database API is running and token is valid' });
});

routes.post('/crud', validation, Controller.index);

routes.post('/exec', execValidation, Controller.exec);
routes.post('/execMany', execManyValidation, Controller.execMany);

export default routes;
