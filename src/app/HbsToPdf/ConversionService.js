import path from 'path';
import fs from 'fs';

import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { staticDir } from '../../utils/publicPaths';

// const template = fs.readFileSync(
//   path.resolve(__dirname, 'templates', 'contrato-matricula-ead.hbs'),
//   { encoding: 'utf8', flag: 'r' }
// );

// const context = {
//   nome: 'Victor',
//   cpf: '414.179.238-14',
//   rg: '48.985.221-x',
//   email: 'victor.jg@univem.edu.br',
//   fone: '(14) 99647-0903',
//   logradouro: 'rua teste',
//   bairro: 'bairro teste',
//   cidade: 'cidade teste',
//   uf: 'SP',
//   cep: '17505-250',
// };

// const document = {
//   template,
//   context,
//   path: path.resolve(staticDir, 'matricula-contrato', 'file.pdf'),
// };

// pdf
//   .create(document)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// const fs = require('fs');
// const path = require('path');

(async () => {
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

  const templateHtml = fs.readFileSync(
    path.resolve(__dirname, 'templates', 'contrato-matricula-ead.hbs'),
    'utf8'
  );

  const template = handlebars.compile(templateHtml);
  const finalHtml = template(context);

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setContent(finalHtml);
  await page.pdf({
    path: path.resolve(staticDir, 'matricula-contrato', 'contrato.pdf'),
    format: 'A4',
    margin: {
      top: '20px',
      left: '20px',
      right: '40px',
      bottom: '20px',
    },
  });
  await browser.close();
})();
