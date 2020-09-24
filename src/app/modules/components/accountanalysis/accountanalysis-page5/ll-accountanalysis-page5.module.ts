import { NgModule } from '@angular/core';
import { LlAccountanalysisPage5RoutingModule } from './ll-accountanalysis-page5.routing.module';
import { LlAccountanalysisPage5Component } from './ll-accountanalysis-page5.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SubscriptionPage1Module } from '@app/modules/components/subscription/subscription-page1/subscription-page1.module';
import { MatProgressSpinnerModule } from '@angular/material';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LlAccountanalysisPage5Component],
  exports: [LlAccountanalysisPage5Component],
  imports: [
    FormsModule,
    RouterModule,
    LlAccountanalysisPage5RoutingModule,
    SubscriptionPage1Module,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    // NgbModule,
    CommonModule,
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
export class LlAccountanalysisPage5Module {}
