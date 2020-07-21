import express from 'express';
import morgan from 'morgan';

import allowCors from './middlewares/cors';
import logger from './middlewares/logger';

import apiRoutesV1 from './api/v1/routes';

class App {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.subDirectory = process.env.SUBDIRECTORY;
    this.apiVersion = process.env.CURRENT_API_VERSION;

    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);

    if (this.nodeEnv === 'development') {
      this.server.use(logger);
    } else {
      this.server.use(
        morgan(`[:date] - :method [:status] :url - :response-time ms`)
      );
    }
  }

  routes() {
    this.server.use(`${this.subDirectory}${this.apiVersion}`, apiRoutesV1);
    // this.server.use(`${this.subDirectory}/v2`, apiRoutesV2);
  }
}

export default new App().server;
