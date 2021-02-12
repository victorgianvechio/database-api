import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import rootPath from 'app-root-path';
import { generateKey, encrypt } from '../lib/crypto';
import generateRandomString from './stringGenerator';

function createFile() {
  if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log(chalk.hex('#f00').bold('\nInvalid arguments [user pass]\n'));
    return;
  }

  const secretKey = generateKey();
  const user = encrypt(process.argv[2], secretKey);
  const pass = encrypt(process.argv[3], secretKey);
  const secretString = generateRandomString();

  const stream = fs.createWriteStream(path.join(rootPath.path, '.env'));

  stream.once('open', () => {
    // APP
    stream.write(`# App`);
    stream.write('\n\n');
    stream.write(`APP_URL="http://127.0.0.1"`);
    stream.write('\n');
    stream.write(`APP_PORT=8080`);
    stream.write('\n');
    stream.write(`NODE_ENV="development"`);
    stream.write('\n\n');

    // AUTH
    stream.write(`# Auth`);
    stream.write('\n\n');
    stream.write(`APP_SECRET="${secretString}"`);
    stream.write('\n\n');

    // Info
    stream.write(`# Info`);
    stream.write('\n\n');
    stream.write(`APP_NAME="Database API"`);
    stream.write('\n');
    stream.write(`COMPANY=""`);
    stream.write('\n');
    stream.write(`COMPANY_DESC=""`);
    stream.write('\n\n');

    // Database
    stream.write(`# Database`);
    stream.write('\n\n');
    stream.write(`DB_HOST=""`);
    stream.write('\n');
    stream.write(`DB_PORT=${1521}`);
    stream.write('\n');
    stream.write(`DB_NAME=""`);
    stream.write('\n');
    stream.write(`DB_USER="${user}"`);
    stream.write('\n');
    stream.write(`DB_PASS="${pass}"`);
    stream.write('\n');
    stream.write(`CRYPTO_KEY="${secretKey}"`);
    stream.write('\n\n');

    // Mail
    stream.write(`# Mail`);
    stream.write('\n\n');
    stream.write(`MAIL_HOST=""`);
    stream.write('\n');
    stream.write(`MAIL_PORT=`);
    stream.write('\n');
    stream.write(`MAIL_USER=""`);
    stream.write('\n');
    stream.write(`MAIL_PASS=""`);
    stream.write('\n\n');

    // Config
    stream.write('# Config');
    stream.write('\n\n');
    stream.write('SUBDIRECTORY="/sistemas/database-api"');
    stream.write('\n\n');

    // Sentry
    stream.write('# Sentry');
    stream.write('\n\n');
    stream.write('SENTRY_DSN=""');

    stream.end();

    console.log(chalk.hex('#2ed573').bold('\nSuccessfully created file\n'));
  });
}

createFile();
