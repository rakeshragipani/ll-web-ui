import { NgModule } from '@angular/core';
import { TotalRetirementAccountRoutingModule } from '@app/modules/components/totalretirementaccount/totalretirementaccount.routing.module';
import { TotalRetirementAccount } from './totalretirementaccount.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { LlRetirementsavingsPageModule } from '@app/modules/retirementsavings-page/ll-retirementsavings-page.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LlAccountanalysisPage1Module } from '@app/modules/components/accountanalysis/accountanalysis-page1/ll-accountanalysis-page1.module';
import { LlAccountanalysisPage5Module } from '@app/modules/components/accountanalysis/accountanalysis-page5/ll-accountanalysis-page5.module';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [TotalRetirementAccount],
  exports: [TotalRetirementAccount],
  imports: [
    // LlAccountanalysisPage1Module,
    // LlAccountanalysisPage5Module,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TotalRetirementAccountRoutingModule,
    HttpClientModule,
    // LlRetirementsavingsPageModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
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
export class TotalRetirementAccountModule {}
