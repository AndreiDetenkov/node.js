import { Response, Request, NextFunction } from "express";
import { LoggerService } from "../logger/logger.service";

interface IExceptionFilter {
  catch: (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
}

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(error: Error, req: Request, res: Response, next: NextFunction) {
    this.logger.error(`${error.message}`);

    res.status(500).send({ error: error.message });
  }
}
