/**
 * These convert to sequential integers equal to the array index
 */
export enum LlLogLevelEnum {
  ALL,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
  OFF
}

export class LlLogEntry {
  level: LlLogLevelEnum;
  message: string;
  stack: string;
  time: Date;

  /**
   * Create a log entry object.
   * @param message: log message
   * @param level: log level, optional, default is ERROR
   */
  constructor(message: string, level?: LlLogLevelEnum) {
    this.level = level || LlLogLevelEnum.ERROR;
    this.message = message;
    this.time = new Date();
  }
}
