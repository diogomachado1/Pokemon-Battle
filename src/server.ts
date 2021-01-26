/* eslint-disable import/first */
/* eslint-disable class-methods-use-this */
import './bootstrap';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './Routes';
import CustomError from './Libs/CustomError';

class App {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(
      async (
        err: Error | CustomError,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        if (err.name === 'CustomError') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return res.status(err?.code).json({ error: err.message });
        }

        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    );
  }
}

export default new App();
