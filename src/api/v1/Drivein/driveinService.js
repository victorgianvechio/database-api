/* eslint-disable no-async-promise-executor */
/* eslint-disable import/prefer-default-export */

import path from 'path';

import QRCode from '../../../app/QRCode/QRCodeService';
import Mail from '../../../app/Mail/MailService';

import { tempDir, staticDir } from '../../../utils/publicPaths';

// const tempDir = path.resolve(__dirname, '..', '..', '..', '..', 'temp');

// FUNÇÃO RESPONSÁVEL POR GERAR O QRCODE E ENVIAR O EMAIL
export async function sendEmail(event, participant) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = `${event.board}-${participant.id}`;

      // GERA QRCODE
      await QRCode.generate(participant.url, fileName);

      // ENVIA E-MAIL
      await Mail.sendMail({
        to: `${participant.name} <${participant.email}>`,
        subject: `Inscrição Evento - "${event.event_name}"`,
        attachments: [
          {
            filename: 'qrcode.png',
            path: path.resolve(tempDir, `${fileName}.png`),
            cid: 'qrcode',
          },
          {
            filename: 'protocolo.pdf',
            path: path.resolve(staticDir, 'drivein', 'protocolo.pdf'),
          },
        ],
        template: path.join('drivein', event.event_slug),
        context: {
          name: participant.name,
          board: event.board,
          cpf: participant.cpf,
          subject_mail: `Inscrição Evento - "${event.event_name}"`,
          event_name: event.event_name,
          id: participant.id,
        },
      });
      console.log(`E-mail enviado: ${participant.email} - ${event.event_name}`);

      // DEVOLVE O RESULTADO DA PROMISE
      resolve({
        status: true,
        name: participant.name,
        cpf: participant.cpf,
        fileName,
      });
    } catch (err) {
      err.status = false;
      console.error(err);
      reject(err);
    }
  });
}
