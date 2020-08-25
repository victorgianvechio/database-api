import '../lib/dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import authConfig from '../config/auth';

function generateToken() {
  const value = new Date();
  let token = '';

  if (process.argv[2] !== undefined) {
    const expiresIn = String(process.argv[2]);
    token = jwt.sign({ value }, authConfig.secret, {
      expiresIn,
    });
  } else {
    token = jwt.sign({ value }, authConfig.secret, {});
  }

  console.log(chalk.hex('#fffa65').bold(`\n${token}\n`));
}

generateToken();
