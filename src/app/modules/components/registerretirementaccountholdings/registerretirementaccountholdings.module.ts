import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material';
import { RegisterretirementaccountholdingsRoutingModule } from './registerretirementaccountholdings-routing.module';
import { RegisterretirementaccountholdingsComponent } from './registerretirementaccountholdings.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterretirementaccountholdingsComponent],
  exports: [RegisterretirementaccountholdingsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RegisterretirementaccountholdingsRoutingModule,
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
export class RegisterretirementaccountholdingsModule {}
