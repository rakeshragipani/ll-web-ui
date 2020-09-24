import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {LlHttpService} from './ll-http.service';

@NgModule({
    imports: [
      HttpClientModule,
    ],
    providers: [LlHttpService],
    exports : [HttpClientModule]
  })
export class LlHttpModule{

}