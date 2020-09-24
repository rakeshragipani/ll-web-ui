import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {LlDataResponseInterceptor} from '../ll-data-response-interceptor/ll-data-response-interceptor.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LlDataResponseInterceptor, multi: true}
  ]
})

export class LlDataModule {
}
