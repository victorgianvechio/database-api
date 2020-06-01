import './dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import authConfig from '../config/auth';

function generateToken() {
  const value = new Date();

  const token = jwt.sign({ value }, authConfig.secret, {
    /* expiresIn: authConfig.expiresIn, */
  });

  console.log(chalk.hex('#fffa65').bold(`\n${token}\n`));
}

generateToken();
