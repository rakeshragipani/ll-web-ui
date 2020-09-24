import { NgModule } from '@angular/core';
import { RegisterRetirementLoginAccountRoutingModule } from '@app/modules/components/registerretirementloginaccount/registerretirementloginaccount.routing.module';
import { RegisterRetirementLoginAccount } from '@app/modules/components/registerretirementloginaccount/registerretirementloginaccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [RegisterRetirementLoginAccount],
  exports: [RegisterRetirementLoginAccount],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRetirementLoginAccountRoutingModule,
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
export class RegisterRetirementLoginAccountModule {}
