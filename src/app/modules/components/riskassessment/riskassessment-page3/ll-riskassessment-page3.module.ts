import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlRiskassessmentPage3RoutingModule } from './ll-riskassessment-page3.routing.module';
import { LlRiskassessmentPage3Component } from './ll-riskassessment-page3.component';
import { MatSliderModule } from '@angular/material/slider';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LlRiskassessmentPage3Component],
  exports: [LlRiskassessmentPage3Component],
  imports: [
    ReactiveFormsModule,
    LlRiskassessmentPage3RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
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
export class LlRiskassessmentPage3Module {}
