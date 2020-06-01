import { decrypt } from '../lib/crypto';

export default {
  user: decrypt(process.env.DB_USER, process.env.CRYPTO_KEY),
  password: decrypt(process.env.DB_PASS, process.env.CRYPTO_KEY),
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
