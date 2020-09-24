import { NgModule } from '@angular/core';
import { LlCreateaccountPageRoutingModule } from './ll-createaccount-page.routing.module';
import { LlCreateaccountPageComponent } from './ll-createaccount-page.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule, MatProgressSpinnerModule } from '@angular/material';
import { LlRetirementsavingsPageModule } from '@app/modules/components/retirementsavings/ll-retirementsavings-page.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LlCreateaccountPageComponent],
  exports: [LlCreateaccountPageComponent],
  imports: [
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    LlCreateaccountPageRoutingModule,
    LlRetirementsavingsPageModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    TooltipModule,
    RouterModule,
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
export class LlCreateaccountPageModule {
  constructor() {}
}
