import { Response, Request, NextFunction } from "express";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "./http-error";

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

  catch(
    error: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Error ${error.statusCode} : ${error.message}`,
      );
      res.send(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      res.status(500).send({ error: error.message });
    }
  }
}
