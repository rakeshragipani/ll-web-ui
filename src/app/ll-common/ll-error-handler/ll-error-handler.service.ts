import {ErrorHandler, Injectable} from '@angular/core';

import {LlAlertService} from '../ll-alert/ll-alert.service';
import {LlAlertType} from '../ll-alert/ll-alert.enum';
import {LlLogEntry} from '../ll-log/ll-log-entry';
import {LlLogService} from '../ll-log/ll-log.service';

/**
 * Note: There is no providedIn or providers for this class
 * because it is like a mock service.
 * You must import the LlErrorHandlerModule at the app module.
 * The LlErrorHandlerModule injects this service as a mock for the built in Angular ErrorHandler.
 */
@Injectable()
export class LlErrorHandler implements ErrorHandler {
  constructor(
      private LlAlertService: LlAlertService,
      private LlLogService: LlLogService) {
  }

  handleError(error: Error) {
    const logEntry: LlLogEntry = new LlLogEntry(error.message);
    logEntry.stack = error.stack;
    this.LlLogService.log(logEntry);
    // TODO temporary don't handle known error from Angular Flex
    if (error.message.includes('split')) {
      return;
    }
    this.LlAlertService.openAlert(LlAlertType.ERROR, 'An error occurred. Try again or contact Customer Service.');
  }
}
