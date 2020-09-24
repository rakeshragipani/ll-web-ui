import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import {environment} from '@env/environment';

import {LlAlertType} from '../ll-alert/ll-alert.enum';
import {LlMessage} from '../ll-message/ll-message';
import {LlMessageService} from '../ll-message/ll-message.service';

@Injectable({providedIn: 'root'})
export class LlDataResponseInterceptor implements HttpInterceptor {
  constructor(private LlMessageService: LlMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
            catchError((err: any) => {
              let errorMsg = '';
              if (err instanceof HttpErrorResponse) {
                if (!navigator.onLine) {
                  errorMsg = 'Not connected to internet.';
                } else {
                  if (err.status === 401) {
                    this.handleAuthError();
                  } else {
                    errorMsg = `Error Code: ${err.status},  Message: ${err.message}`;
                  }
                }
              } else {
                errorMsg = 'Unknown Error. Response format not recognized.';
              }
              this.handleError(errorMsg);
              return throwError(errorMsg);
            })
        );
  }

  private handleError(errorMsg): void {
    const message = new LlMessage('data.responseError');
    message.payload = {
      alertType: LlAlertType.ERROR,
      alertMessage: errorMsg
    };
    this.LlMessageService.broadcast(message);
  }

  private handleAuthError(): void {
    // TODO added temporary console log for testing this stub
    // console.log('HTTP 401 error');
    // TODO Needs back end service to do auth and handle redirect url
    // let client = new XMLHttpRequest();
    // let parts = window.location.pathname.split('/');
    // const url = environment.serviceRootUrl + parts[1] + '/login?redirectUrl=' + window.location.href;
    // client.open('POST', url, true);
    // client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // client.withCredentials = true;
    // client.send();
    // client.onreadystatechange = function () {
    //   if (this.status === 401 && this.readyState === this.HEADERS_RECEIVED) {
    //     window.parent.location.href = client.getResponseHeader('Location');
    //   }
    // };
  }
}
