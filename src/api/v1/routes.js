import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';

import DatabaseController from './Database/DatabaseController';
import validation, {
  execValidation,
  execManyValidation,
} from './Database/databaseValidation';

import AuthAlunoController from './Talentos/AuthAlunoController';
import authAlunoValidation from './Talentos/authAlunoValidation';

import EuContabilistaController from './Eventos/EuContabilistaController';

const routes = new Router();

// ---------------------- ROTAS LIVRE PARA TESTAR API ----------------------- //
routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Database API is running' });
});

routes.use(authMiddleware);

// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
routes.get('/authToken', (req, res) => {
  return res.status(200).json({
    auth: true,
    message: 'Database API is running and token is valid',
  });
});

// ---------------------------- APAGAR DEPOIS --------------------------------//
routes.post('/crud', validation, DatabaseController.index);

// ------------------------------ DATABASE -----------------------------------//
routes.post('/exec', execValidation, DatabaseController.exec);
routes.post('/execMany', execManyValidation, DatabaseController.execMany);

// ------------------------------ TALENTOS -----------------------------------//
routes.post('/auth/alunos', authAlunoValidation, AuthAlunoController.find);

// ------------------------------ EU CONTABILISTA ------------------------------------//
routes.post('/carros', EuContabilistaController.index);

export default routes;
