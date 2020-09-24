import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlRiskassessmentPageRoutingModule } from './ll-riskassessment-page.routing.module';
import { LlRiskassessmentPageComponent } from './ll-riskassessment-page.component';
import { MatSliderModule } from '@angular/material/slider';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GaugeChartModule } from 'angular-gauge-chart';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LlRiskassessmentPageComponent],
  exports: [LlRiskassessmentPageComponent],
  imports: [
    LlRiskassessmentPageRoutingModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    GaugeChartModule,
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
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
export class LlRiskassessmentPageModule {}
