import express from 'express';

import allowCors from './middlewares/cors';
import logger from './middlewares/logger';

import apiRoutesV1 from './api/v1/routes';

class App {
  constructor() {
    this.subDirectory = process.env.SUBDIRECTORY;

    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);
    this.server.use(logger);
  }

  routes() {
    this.server.use(`${this.subDirectory}/api/v1`, apiRoutesV1);
    // this.server.use(`${this.subDirectory}/api/v2`, apiRoutesV2);
  }
}

export default new App().server;
