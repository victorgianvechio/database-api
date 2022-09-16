import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

import { staticDir } from '../utils/publicPaths';

(async () => {
  const file = fs.readFileSync(
    path.resolve(staticDir, 'proposta.html'),
    'utf8'
  );

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(file);
  await page.pdf({
    path: path.resolve(staticDir, 'contratoeeewqe.pdf'),
    format: 'A4',
    margin: {
      top: '20px',
      left: '20px',
      right: '40px',
      bottom: '20px',
    },
  });
  await browser.close();
})();
