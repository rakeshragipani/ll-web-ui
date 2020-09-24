import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//This service is being eager loaded. So it satisfies singleton design pattern.

@Injectable()
export class LlHttpService {
  headers: {} = new HttpHeaders({
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    // authorization: 'Bearer test',
  });
  constructor(private http: HttpClient) { }

  get(url, headers = this.headers) {
    return this.http.get(url, headers);
  }

  post(url, body, headers = this.headers) {
    return this.http.post(url, body, headers);
  }

  put(url, body, headers = this.headers) {
    return this.http.put(url, body, headers);
  }
  delete(url) {
    return this.http.delete(url);
  }
  deleteWithHeaders(url, headers = this.headers) {
    return this.http.delete(url,headers);
  }
}
