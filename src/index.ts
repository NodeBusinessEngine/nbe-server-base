import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import actuator from 'express-actuator';
import errorHandler from './common-middleware/error.middleware';
import notFoundHandler from './common-middleware/not-found.middleware';
import loggerMiddleware from './common-middleware/logger.middleware';
import { HttpMethod } from './common-domain/http-common';

export class NBEBaseServer {
  private app: any;
  private middlewareArray: any[];
  private routes: any;
  constructor() {
    this.app = express();
    this.middlewareArray = [];
    this.routes = {};
  }

  public addMiddleWare(middleWare: any) {
    this.middlewareArray.push(middleWare);
  }

  public createRoute(basePath: string) {
    const isDubplicatePath = Object.keys(this.routes).find((key: string) => key === basePath);
    if (!isDubplicatePath) this.routes[basePath] = express.Router();
  }
  public addSubRoutes(basePath: string, subPath: string, type: HttpMethod, handler: any) {
    const route: Router = this.routes[basePath];
    if (route) {
      if (type === HttpMethod.GET) route.get(subPath, handler);
      if (type === HttpMethod.POST) route.post(subPath, handler);
    }
  }

  public getServer() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(actuator());
    this.app.use(loggerMiddleware);
    this.buildMiddleware();
    this.buildRoutes();
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
    for (const key in this.routes) {
      if (key) {
        this.app.use(key, this.routes[key]);
      }
    }
  }
}
