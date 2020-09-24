import {TestBed} from '@angular/core/testing';

import {MockLlAlertService, MockLlLogService} from '../test';
import {LlAlertService, LlLogService} from '..';
import {LlErrorHandler} from './ll-error-handler.service';

class LlLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('LlErrorHandler', () => {
  let spyAlertService: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let LlAlertService: LlAlertService;
  let LlErrorHandler: LlErrorHandler;
  let LlLogService: LlLogService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LlAlertService, useClass: MockLlAlertService},
      LlErrorHandler,
      {provide: LlLogService, useClass: MockLlLogService}
    ]
  }));

  beforeEach(() => {
    LlAlertService = TestBed.get(LlAlertService);
    LlErrorHandler = TestBed.get(LlErrorHandler);
    LlLogService = TestBed.get(LlLogService);
    spyAlertService = spyOn(LlAlertService, 'openAlert');
    spyLogService = spyOn(LlLogService, 'log');
  });

  it('should be created', () => {
    expect(LlErrorHandler).toBeDefined();
  });

  it('should run LlLogService on handleError', () => {
    LlErrorHandler.handleError(new Error('test'));
    expect(spyLogService).toHaveBeenCalled();
  });

  // TODO temporary to handle branch for known angular flex error
  it('should run LlLogService on handleError with message split', () => {
    LlErrorHandler.handleError(new Error('split'));
    expect(spyAlertService).not.toHaveBeenCalled();
  });
});
