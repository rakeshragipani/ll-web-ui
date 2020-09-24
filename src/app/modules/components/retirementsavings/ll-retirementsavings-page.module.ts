import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LlRetirementsavingsPageRoutingModule } from './ll-retirementsavings-page.routing.module';
import { LlRetirementsavingsPageComponent } from './ll-retirementsavings-page.component';
// import { LlHeaderPageModule } from '@app/modules/header-page/ll-header-page.module';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { LlRiskassessmentPageModule } from '@app/modules/components/riskassessment/riskassessment-page/ll-riskassessment-page.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LlRetirementsavingsPageComponent],
  exports: [LlRetirementsavingsPageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LlRetirementsavingsPageRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterModule,
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
export class LlRetirementsavingsPageModule {}
