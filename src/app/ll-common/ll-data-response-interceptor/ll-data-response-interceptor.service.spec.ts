import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LlMessageService} from '..';
import {LlDataResponseInterceptor} from './ll-data-response-interceptor.service';

describe('LlDataResponseInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const mockUrl = 'https://mockurl?param1=1&param2=2';
  let spyMessageBroadcast: jasmine.Spy;
  let spyConsoleLog: jasmine.Spy;

  // stub dependant class
  class LlMessage {
    key: string;
    payload: any = null;

    constructor(key: string) {
      this.key = key;
    }
  }

  beforeEach(() => {
    let LlMessageService: LlMessageService;
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LlDataResponseInterceptor,
          multi: true
        },
        LlMessageService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    LlMessageService = TestBed.get(LlMessageService);
    spyMessageBroadcast = spyOn(LlMessageService, 'broadcast');
    spyConsoleLog = spyOn(console, 'log');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const theInterceptor = TestBed.get(HTTP_INTERCEPTORS);
    expect(theInterceptor).toBeDefined();
  });

  it('should run message broadcast on request 400 error', fakeAsync(() => {
    let testRequest: TestRequest;
    httpClient.get(mockUrl).subscribe(() => {
    }, () => {
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(new ErrorEvent('Bad request'), {
      status: 400
    });
    tick();
    expect(spyMessageBroadcast).toHaveBeenCalled();
    const args = spyMessageBroadcast.calls.mostRecent().args;
    const testMessage: LlMessage = args[0];
    const alertMessage: string = testMessage.payload.alertMessage;
    const isErrorCodeFound = alertMessage.includes('Error Code: 400');
    expect(isErrorCodeFound).toBe(true);
  }));

  it('should run handleAuthError on request 401 error', fakeAsync(() => {
    let testRequest: TestRequest;
    httpClient.get(mockUrl).subscribe(() => {
    }, () => {
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(new ErrorEvent('Unauthorized error'), {
      status: 401
    });
    tick();
    expect(spyConsoleLog).toHaveBeenCalledWith('HTTP 401 error');
  }));

  it('should handle offline condition', fakeAsync(() => {
    let testRequest: TestRequest;
    spyOnProperty(Navigator.prototype, 'onLine').and.returnValue(false);
    httpClient.get(mockUrl).subscribe(() => {
    }, () => {
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(new ErrorEvent('Unknown Error'), {
      status: 0
    });
    tick();
    expect(spyMessageBroadcast).toHaveBeenCalled();
    const args = spyMessageBroadcast.calls.mostRecent().args;
    const testMessage: LlMessage = args[0];
    const alertMessage: string = testMessage.payload.alertMessage;
    expect(alertMessage).toBe('Not connected to internet.');
  }));
});
