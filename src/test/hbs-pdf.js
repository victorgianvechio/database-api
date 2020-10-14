const pdf = require('handlebars-pdf');
const path = require('path');

const { staticDir } = require('../utils/publicPaths');

const document = {
  template: '<h1>{{msg}}</h1><p style="color:red">Red text</p>',
  context: {
    msg: 'Hello world',
  },
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
