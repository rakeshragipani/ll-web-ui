import { NgModule } from '@angular/core';
import { SubscriptionPage2RoutingModule } from './subscriptionPage-page2.routing.module';
import { SubscriptionPage2Component } from '@app/modules/components/subscription/subscription-page2/subscription-page2.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
// import { PopupComponent } from '../../popup/popup.component';

@NgModule({
  declarations: [SubscriptionPage2Component],
  exports: [SubscriptionPage2Component],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionPage2RoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
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
export class SubscriptionPage2Module {}
