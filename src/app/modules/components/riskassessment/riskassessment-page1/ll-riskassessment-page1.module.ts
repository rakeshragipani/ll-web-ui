import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlRiskassessmentPage1RoutingModule } from './ll-riskassessment-page1.routing.module';
import { LlRiskassessmentPage1Component } from './ll-riskassessment-page1.component';
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
  declarations: [LlRiskassessmentPage1Component],
  exports: [LlRiskassessmentPage1Component],
  imports: [
    ReactiveFormsModule,
    LlRiskassessmentPage1RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    RouterModule,
    // LlRiskassessmentPage2Module,
    HttpClientModule,
    FormsModule,
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
export class LlRiskassessmentPage1Module {}
