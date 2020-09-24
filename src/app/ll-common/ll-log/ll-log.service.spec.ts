import {TestBed} from '@angular/core/testing';

import {LlLogEntry} from './ll-log-entry';
import {LlLogService} from './ll-log.service';

describe('LlLogService', () => {
  let spyConsoleLog: jasmine.Spy;
  let LlLogService: LlLogService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [LlLogService]
  }));

  beforeEach(() => {
    LlLogService = TestBed.get(LlLogService);
    spyConsoleLog = spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(LlLogService).toBeDefined();
  });

  it('should after log run console log', () => {
    LlLogService.log(new LlLogEntry('test'));
    expect(spyConsoleLog).toHaveBeenCalled();
  });
});
