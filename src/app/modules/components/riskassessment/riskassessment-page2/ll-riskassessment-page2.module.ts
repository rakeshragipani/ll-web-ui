import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlRiskassessmentPage2RoutingModule } from './ll-riskassessment-page2.routing.module';
import { LlRiskassessmentPage2Component } from './ll-riskassessment-page2.component';
import { MatSliderModule } from '@angular/material/slider';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LlRiskassessmentPage2Component],
  exports: [LlRiskassessmentPage2Component],
  imports: [
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    LlRiskassessmentPage2RoutingModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, 'assets/json/', '.json');
        },
        deps: [HttpClient],
      },
    }),
  ],
})
export class LlRiskassessmentPage2Module {}
