import express from 'express';
import morgan from 'morgan';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import * as Sentry from '@sentry/node';

import sentryConfig from './config/sentry';
import allowCors from './middlewares/cors';

import apiRoutesV1 from './api/v1/routes';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

class App {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.subDirectory = process.env.SUBDIRECTORY;

    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(allowCors);

    this.server.use(expressLogger);

    this.server.use(
      morgan(`[:date] - :method [:status] :url - :response-time ms`)
    );
  }

  routes() {
    this.server.use(`${this.subDirectory}/v1`, apiRoutesV1);
    this.server.use(Sentry.Handlers.errorHandler());
    // this.server.use(`${this.subDirectory}/v2`, apiRoutesV2);
  }
}

export default new App().server;
