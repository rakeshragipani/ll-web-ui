import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LlDataService} from './ll-data.service';

describe('LlDataService', () => {
  let httpMock: HttpTestingController;
  const mockData = {key: 'value'};
  const mockError = new ErrorEvent('Unknown Error');
  const mockUrl = 'https://mockurl?param1=1&param2=2';
  let LlDataService: LlDataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LlDataService]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    LlDataService = TestBed.get(LlDataService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', fakeAsync(() => {
    tick();
    expect(LlDataService).toBeDefined();
  }));

  it('should run getData and return data on success', fakeAsync(() => {
    let result: any;
    let testRequest: TestRequest;
    LlDataService.getData(mockUrl).subscribe((response: HttpResponse<any>) => {
      result = response;
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.flush(mockData);
    tick();
    expect(result).toEqual(mockData);
  }));

  it('should run getData and handle error', fakeAsync(() => {
    let result: any;
    let testRequest: TestRequest;
    LlDataService.getData(mockUrl).subscribe((response: HttpResponse<any>) => {
      result = response;
    }, (errorResponse: HttpErrorResponse) => {
      result = errorResponse;
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(mockError);
    tick();
    expect(result.statusText).toEqual('Unknown Error');
  }));
});
