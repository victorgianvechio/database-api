import pdf from 'handlebars-pdf';
import path from 'path';
import fs from 'fs';

import { staticDir } from '../../utils/publicPaths';

const template = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'contrato-matricula-ead.hbs'),
  { encoding: 'utf8', flag: 'r' }
);

const context = {
  nome: 'Victor',
  cpf: '414.179.238-14',
  rg: '48.985.221-x',
  email: 'victor.jg@univem.edu.br',
  fone: '(14) 99647-0903',
  logradouro: 'rua teste',
  bairro: 'bairro teste',
  cidade: 'cidade teste',
  uf: 'SP',
  cep: '17505-250',
};

const document = {
  template,
  context,
  path: path.resolve(staticDir, 'matricula-contrato', 'file.pdf'),
};

pdf
  .create(document)
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
