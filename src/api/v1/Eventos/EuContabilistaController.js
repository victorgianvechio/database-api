import { resolve } from 'path';
import fs from 'fs';

import QRCode from '../../../app/QRCode/QRCodeService';
import Mail from '../../../app/Mail/MailService';

class EventosController {
  async index(req, res) {
    const data = req.body;

    try {
      // Gera o QR Code
      await QRCode.generate(data.board);

      // Envia e-mail
      await Mail.sendMail({
        to: `${data.name} <${data.email}>`,
        subject: 'Inscrição Evento - "Eu Contabilista"',
        attachments: [
          {
            filename: 'qrcode.png',
            path: resolve('temp', `${data.board}.png`),
            cid: 'qrcode',
          },
        ],
        template: 'evento-eu-contabilista',
        context: {
          name: data.name,
          board: data.board,
          cpf: data.cpf,
          subject_mail: 'Inscrição Evento - "Eu Contabilista"',
        },
      });
    } catch (err) {
      err.status = false;
      return res.status(408).json({ err });
    } finally {
      // Exclui o arquivo após enviar o e-mail
      fs.unlink(resolve('temp', `${data.board}.png`), err => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Email enviado',
    });
  }
}

export default new EventosController();
