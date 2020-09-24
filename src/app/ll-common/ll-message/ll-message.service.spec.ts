import {TestBed} from '@angular/core/testing';
import {Subscription} from 'rxjs';

import {LlMessage} from './ll-message';
import {LlMessageService} from './ll-message.service';

describe('LlMessageService', () => {
  let LlMessageService: LlMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LlMessageService]
    });
    LlMessageService = TestBed.get(LlMessageService);
  });

  it('should be created', () => {
    expect(LlMessageService).toBeTruthy();
  });

  it('should be subscribed fires callback on broadcast', () => {
    let isCalled = false;
    const subscription: Subscription = LlMessageService.subscribe('test-key', () => {
      isCalled = true;
    });
    LlMessageService.broadcast(new LlMessage('test-key'));
    expect(isCalled).toBeTruthy();
    subscription.unsubscribe();
  });
});
