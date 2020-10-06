import qrcode from 'qrcode';
import { resolve } from 'path';

class QRCode {
  async generate(value, filename) {
    qrcode.toFile(
      resolve('temp', `${filename}.png`),
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
}

export default new QRCode();
