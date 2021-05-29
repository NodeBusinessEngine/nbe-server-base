import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import actuator from 'express-actuator';
import errorHandler from './common-middleware/error.middleware';
import notFoundHandler from './common-middleware/not-found.middleware';

export class NBEBaseServer {
  private app: any;
  private middlewareArray: any[];
  private routerArray: any[];
  constructor() {
    this.app = express();
    this.middlewareArray = [];
    this.routerArray = [];
  }
  
  public addMiddleWare(middleWare: Function) {
    this.middlewareArray.push(middleWare)
  }
  public addRouter(baseUrl: string, handler: Function) {
    this.routerArray.push({baseUrl, handler});
  }

  public getServer() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(actuator());
    this.buildMiddleware();
    this.buildRoutes()
    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
    return this.app;
  }
  
  private buildMiddleware() {
    if (this.middlewareArray.length > 0) {
      for (const middleWare of this.middlewareArray) {
        this.app.use(middleWare);
      }
    }
  }

  private buildRoutes() {
    if (this.routerArray.length > 0) {
      for (const route of this.routerArray) {
        const { baseUrl = '', handler } = route;
        if (baseUrl && handler) this.app.use(baseUrl, handler);
      }
    }
  }
}