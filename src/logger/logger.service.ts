import { ILogObj, Logger } from "tslog";

export class LoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({ hideLogPositionForProduction: true });
  }

  log(...arg: unknown[]) {
    this.logger.info(...arg);
  }

  error(...arg: unknown[]) {
    this.logger.error(...arg);
  }

  warn(...arg: unknown[]) {
    this.logger.warn(...arg);
  }
}
