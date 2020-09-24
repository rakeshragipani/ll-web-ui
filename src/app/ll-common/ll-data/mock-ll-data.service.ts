import {Observable, of} from 'rxjs';

export class MockLlDataService {
  getData(url: string): Observable<any> {
    return of({});
  }
}
