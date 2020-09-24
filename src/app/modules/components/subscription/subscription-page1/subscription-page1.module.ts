import { NgModule } from '@angular/core';
import { SubscriptionPage1RoutingModule } from './subscription-page1.routing.module';
import { SubscriptionPage1Component } from './subscription-page1.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
// import { LlRetirementsavingsPageModule } from '@app/modules/retirementsavings-page/ll-retirementsavings-page.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SubscriptionPage2Module } from '@app/modules/components/subscription/subscription-page2/subscription-page2.module';

@NgModule({
  declarations: [SubscriptionPage1Component],
  exports: [SubscriptionPage1Component],
  imports: [
    FormsModule,
    HttpClientModule,
    SubscriptionPage1RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    TooltipModule,
    SubscriptionPage2Module,
    MatProgressSpinnerModule,
    MatButtonModule,
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
export class SubscriptionPage1Module {}
