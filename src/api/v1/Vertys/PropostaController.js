import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

import { staticDir } from '../../../utils/publicPaths';
import Mail from '../../../app/Mail/MailService';

class PropostaController {
  // async index(req, res) {
  //   const { file } = req.body;

  //   try {
  //     const browser = await puppeteer.launch({ headless: true });
  //     const page = await browser.newPage();
  //     // await page.setContent(finalTemplate);
  //     await page.setContent(file);
  //     await page.pdf({
  //       // path: path.resolve(staticDir, 'matricula-contrato', 'contrato.pdf'),
  //       path: path.resolve(staticDir, 'proposta.pdf'),
  //       format: 'A4',
  //       margin: {
  //         top: '20px',
  //         left: '20px',
  //         right: '40px',
  //         bottom: '20px',
  //       },
  //     });
  //     await browser.close();

  //     const pdf = fs.createReadStream(path.resolve(staticDir, 'proposta.pdf'));
  //     const stat = fs.statSync(path.resolve(staticDir, 'proposta.pdf'));
  //     res.setHeader('Content-Length', stat.size);
  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.setHeader('Content-Disposition', 'attachment; filename=proposta.pdf');
  //     pdf.pipe(res);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
  async index(req, res) {
    const { file, proposta, email } = req.body;

    const fileName = Date.now();
    const filePath = path.resolve(staticDir, 'vertys', 'proposta-comercial');

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      // await page.setContent(finalTemplate);
      await page.setContent(file);
      await page.pdf({
        // path: path.resolve(staticDir, 'matricula-contrato', 'contrato.pdf'),
        path: path.resolve(filePath, `${fileName}.pdf`),
        format: 'A4',
        margin: {
          top: '20px',
          left: '20px',
          right: '40px',
          bottom: '20px',
        },
      });
      await browser.close();

      // ENVIA E-MAIL
      await Mail.sendMail({
        to: email,
        // to: `Victor Gianvechio <victor.gianvecchio@live.com>`,
        subject: `Vertys Group - Proposta ${proposta}`,
        attachments: [
          // {
          //   filename: 'qrcode.png',
          //   path: path.resolve(tempDir, `${fileName}.png`),
          //   cid: 'qrcode',
          // },
          {
            filename: `${fileName}.pdf`,
            path: path.resolve(filePath, `${fileName}.pdf`),
          },
        ],
        template: path.join('vertys', 'proposta-comercial'),
        // context: {
        //   name: participant.name,
        //   board: event.board,
        //   cpf: participant.cpf,
        //   subject_mail: `Inscrição Evento - "${event.event_name}"`,
        //   event_name: event.event_name,
        //   id: participant.id,
        // },
      });
      res.status(200).json({ message: 'Proposta enviada com sucesso' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new PropostaController();
