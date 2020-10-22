import uuid from 'uuid-generate';
import path from 'path';
import fs from 'fs';

import QRCode from '../../../app/QRCode/QRCodeService';
import { tempDir } from '../../../utils/publicPaths';

class QRCodeController {
  async base64(req, res) {
    const fsPromises = fs.promises;
    const { value } = req.body;
    const fileName = uuid.generate();

    try {
      // GERA O QRCODE COMO PNG
      await QRCode.generate(value, fileName);

      // CARREGAR O ARQUIVO PNG
      const file = await fsPromises.readFile(
        path.resolve(tempDir, `${fileName}.png`),
        {
          encoding: 'base64',
        }
      );

      // CONVERTE A IMAGEM PARA BASE64
      const base64str = Buffer.from(file).toString('base64');

      // REMOVE O ARQUIVO
      fs.unlinkSync(path.resolve(tempDir, `${fileName}.png`));

      // RETORNA O BASE64 DO ARQUIVO
      return res.status(200).json({ base64: base64str });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QRCodeController();
