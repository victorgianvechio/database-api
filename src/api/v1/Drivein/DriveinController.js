/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */

import { resolve } from 'path';
import { unlinkSync } from 'fs';

import { sendEmail } from './driveinService';

class EventosController {
  async index(req, res) {
    const data = req.body;

    const promises = [];

    for (const i in data.participants) {
      console.log('\n');
      console.log('participante', i);
      promises.push(await sendEmail(data, data.participants[i]));
      console.log('fim participante', i);
      console.log('\n');
    }

    await Promise.all(promises).then(result => {
      // REMOVE ARQUIVO
      result.forEach(participant => {
        console.log('removendo arquivo', participant.name);
        unlinkSync(resolve('temp', `${participant.fileName}.png`));
        console.log('arquivo removido', participant.name);
      });

      console.log('retorno response');
      return res.status(200).json({ result });
    });
  }
}

export default new EventosController();
