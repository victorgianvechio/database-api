import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';

import DatabaseController from './Database/DatabaseController';
import validation, {
  execValidation,
  execManyValidation,
} from './Database/databaseValidation';

import AuthAlunoController from './Talentos/AuthAlunoController';
import authAlunoValidation from './Talentos/authAlunoValidation';

import DriveinController from './Drivein/DriveinController';
import driveinValidation from './Drivein/driveinValidation';

const routes = new Router();

// -------------------------------------------------------------------------- //
// ------------------------------- ROTAS LIVRE ------------------------------ //
// -------------------------------------------------------------------------- //

// --------------------------------- DEFAULT ---------------------------------//
routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Database API is running' });
});

// ----------------------------- DRIVE-IN EVENTOS ----------------------------//
routes.post('/drivein/qrcode', driveinValidation, DriveinController.index);

// -------------------------------------------------------------------------- //
// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
// -------------------------------------------------------------------------- //

routes.use(authMiddleware);

// ---------------------------- DEFAULT COM TOKEN ----------------------------//
routes.get('/auth', (req, res) => {
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

export default routes;
