import { NextFunction, Router, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";

interface IRoute {
  path: string;
  fn: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "put" | "patch" | "delete">;
}

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  protected bindRoutes(routes: IRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);

      this._router[route.method](route.path, route.fn.bind(this));
    }
  }
}
