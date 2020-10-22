import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';

import DatabaseController from './Database/DatabaseController';
import validation, {
  execValidation,
  execManyValidation,
} from './Database/databaseValidation';

import RepositorioController from './Repositorio/RepositorioController';

import AuthAlunoController from './Talentos/AuthAlunoController';
import authAlunoValidation from './Talentos/authAlunoValidation';

import DriveinController from './Drivein/DriveinController';
import driveinValidation from './Drivein/driveinValidation';

import AcompanhamentoController from './VestibularPresencial/Acompanhamento/AcompanhamentoController';
import acompanhamentoValidation from './VestibularPresencial/Acompanhamento/acompanhamentoValidation';

import QRCodeController from './QRCode/QRCodeController';
import qrcodeValidation from './QRCode/qrcodeValidation';

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

// ---------------------------- GERADOR DE QRCODE ----------------------------//
routes.post('/qrcode/base64', qrcodeValidation, QRCodeController.base64);

// ------------------------ VESTIBULAR PRESENCIAL ----------------------------//

// ACOMPANHAMENTO
routes.get(
  '/vestibular-presencial/acompanhamento/:cpf',
  acompanhamentoValidation,
  AcompanhamentoController.find
);

// -------------------------------------------------------------------------- //
// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
// -------------------------------------------------------------------------- //

routes.use(authMiddleware);

// ---------------------------- DEFAULT COM TOKEN ----------------------------//
routes.get('/auth-token', (req, res) => {
  return res.status(200).json({
    auth: true,
    message: 'Database API is running and token is valid',
  });
});

// ------------------------------ REPOSITORIO --------------------------------//
routes.get('/repositorio', RepositorioController.index);

// ---------------------------- APAGAR DEPOIS --------------------------------//
routes.post('/crud', validation, DatabaseController.index);

// ------------------------------ DATABASE -----------------------------------//
routes.post('/exec', execValidation, DatabaseController.exec);
routes.post('/exec-many', execManyValidation, DatabaseController.execMany);

// ------------------------------ TALENTOS -----------------------------------//
routes.post(
  '/talentos/auth/alunos',
  authAlunoValidation,
  AuthAlunoController.find
);

export default routes;
