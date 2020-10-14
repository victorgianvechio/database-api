/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */

import { resolve } from 'path';
import { unlinkSync } from 'fs';

import { sendEmail } from './driveinService';

import { tempDir } from '../../../utils/publicPaths';

// const tempDir = resolve(__dirname, '..', '..', '..', '..', 'temp');

class EventosController {
  async index(req, res) {
    const data = req.body;

    const promises = [];

    try {
      // ADICIONA AS PROMISES NO ARRAY
      for (const i in data.participants) {
        promises.push(await sendEmail(data, data.participants[i]));
      }

      // EXECUTA AS PROMISES
      await Promise.all(promises).then(result => {
        // REMOVE ARQUIVO
        result.forEach(participant => {
          unlinkSync(resolve(tempDir, `${participant.fileName}.png`));
        });

        return res.status(200).json({ result });
      });
    } catch (err) {
      return res.status(200).json({ err });
    }
  }
}

export default new EventosController();
