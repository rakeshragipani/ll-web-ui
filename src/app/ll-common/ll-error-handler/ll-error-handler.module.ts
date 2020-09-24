import {ErrorHandler, NgModule} from '@angular/core';

import {LlAlertModule} from '../ll-alert/ll-alert.module';
import {LlLogModule} from '../ll-log/ll-log.module';
import {LlErrorHandler} from './ll-error-handler.service';

@NgModule({
  imports: [
    LlAlertModule,
    LlLogModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: LlErrorHandler}
  ]
})
export class LlErrorHandlerModule {
}
