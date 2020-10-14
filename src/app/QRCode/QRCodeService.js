import qrcode from 'qrcode';
import { resolve } from 'path';

// const tempDir = resolve(__dirname, '..', '..', '..', 'temp');

import { tempDir } from '../../utils/publicPaths';

class QRCode {
  async generate(value, filename) {
    qrcode.toFile(
      resolve(tempDir, `${filename}.png`),
      value,
      {
        color: {
          dark: '#000',
          light: '#FFF',
        },
      },
      err => {
        if (err) throw err;
      }
    );
  }

  // async generateBuffer(value) {
  //   qrcode.toFile(
  //     resolve(tempDir, `${filename}.png`),
  //     value,
  //     {
  //       color: {
  //         dark: '#000',
  //         light: '#FFF',
  //       },
  //     },
  //     err => {
  //       if (err) throw err;
  //     }
  //   );
  // }
}

export default new QRCode();
