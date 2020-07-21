import chalk from 'chalk';

import '../lib/dotenv';
import db from '../database/OracleConnection';

async function testConnection() {
  const { err } = await db.testConnection();

  if (err) {
    console.log(chalk.hex('#f00').bold(`\n${err}\n`));
  } else {
    console.log(chalk.hex('#2ed573').bold(`\nSuccessfully connected!\n`));
  }
}

testConnection();
