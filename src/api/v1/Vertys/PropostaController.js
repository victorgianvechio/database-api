import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

import { staticDir } from '../../../utils/publicPaths';

class PropostaController {
  async index(req, res) {
    const { file } = req.body;

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      // await page.setContent(finalTemplate);
      await page.setContent(file);
      await page.pdf({
        // path: path.resolve(staticDir, 'matricula-contrato', 'contrato.pdf'),
        path: path.resolve(staticDir, 'proposta.pdf'),
        format: 'A4',
        margin: {
          top: '20px',
          left: '20px',
          right: '40px',
          bottom: '20px',
        },
      });
      await browser.close();

      const pdf = fs.createReadStream(path.resolve(staticDir, 'proposta.pdf'));
      const stat = fs.statSync(path.resolve(staticDir, 'proposta.pdf'));
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=proposta.pdf');
      pdf.pipe(res);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new PropostaController();