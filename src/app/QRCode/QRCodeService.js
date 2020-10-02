import qrcode from 'qrcode';
import { resolve } from 'path';

class QRCode {
  async generate(value) {
    qrcode.toFile(
      resolve('temp', `${value}.png`),
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
