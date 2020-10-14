import uuid from 'uuid-generate';
import path from 'path';
import fs from 'fs';

import QRCode from '../../../app/QRCode/QRCodeService';
import { tempDir } from '../../../utils/publicPaths';

class QRCodeController {
  async index(req, res) {
    const { value } = req.query;

    const fileName = uuid.generate();

    await QRCode.generate(value, fileName);

    const readStream = fs.createReadStream(
      path.resolve(tempDir, `${fileName}.png`),
      {
        highWaterMark: 16,
      }
    );
    const buffer = [];

    readStream.on('data', chunk => {
      buffer.push(chunk);
    });

    readStream.on('end', () => {
      // Cria a imagem a partir do buffer
      // Buffer.concat(buffer).toString();

      // REMOVE ARQUIVO
      fs.unlinkSync(path.resolve(tempDir, `${fileName}.png`));

      // RETORNA BUFFER DA IMAGEM
      return res.status(200).json(buffer);
    });
  }
}

export default new QRCodeController();
