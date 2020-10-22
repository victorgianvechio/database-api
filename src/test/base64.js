import fs from 'fs';
import path from 'path';

import { tempDir } from '../utils/publicPaths';
import QRCode from '../app/QRCode/QRCodeService';

const fsPromises = fs.promises;

(async () => {
  await QRCode.generate(
    'texto teste para gerar qrcode',
    path.resolve(tempDir, 'teste')
  );

  const file = await fsPromises.readFile(path.resolve(tempDir, 'teste.png'), {
    encoding: 'base64',
  });
  const base64str = Buffer.from(file).toString('base64');
  console.log(base64str);

  // CRIA IMAGEM A PARTIR DA STRING BASE64
  // const buffer = Buffer.from(base64str, 'base64');
  // fs.writeFileSync(path.resolve(tempDir, 'teste_decoded.png'), buffer);
})();
