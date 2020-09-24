import { NgModule } from '@angular/core';
import { LlRiskassessmentPage4RoutingModule } from './ll-riskassessment-page4.routing.module';
import { LlRiskassessmentPage4Component } from './ll-riskassessment-page4.component';
import {MatSliderModule} from '@angular/material/slider';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LlRiskassessmentPage4Component],
  exports: [LlRiskassessmentPage4Component],
  imports: [
    LlRiskassessmentPage4RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSliderModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory: (http: HttpClient) => {return new TranslateHttpLoader(http,'assets/json/','.json')},
        deps: [HttpClient]
      }
    })
  ]
})
export class LlRiskassessmentPage4Module { }
