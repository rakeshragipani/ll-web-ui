import { TestBed } from '@angular/core/testing';

import { LlClientGuardService } from './ll-client-guard.service';

describe('ClientGuardService', () => {
  let service: LlClientGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlClientGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
