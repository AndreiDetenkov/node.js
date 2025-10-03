import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../errors/http-error";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      { path: "/register", method: "post", fn: this.register },
      { path: "/login", method: "post", fn: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "User Unauthorized", "login"));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
