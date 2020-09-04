import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';
import Controller from './Controller';
import AuthAlunoController from './AuthAlunoController';
import validation, { execValidation, execManyValidation } from './validation';
import authAlunoValidation from './authAlunoValidation';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Database API is running' });
});

// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
routes.use(authMiddleware);

routes.get('/isAuth', (req, res) => {
  return res.status(200).json({
    auth: true,
    message: 'Database API is running and token is valid',
  });
});

// APAGAR DEPOIS
routes.post('/crud', validation, Controller.index);

routes.post('/exec', execValidation, Controller.exec);
routes.post('/execMany', execManyValidation, Controller.execMany);

// TESTE PARA TALENTOS
routes.post('/auth/alunos', authAlunoValidation, AuthAlunoController.find);

export default routes;
