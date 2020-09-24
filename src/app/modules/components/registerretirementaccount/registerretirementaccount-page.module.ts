import { NgModule } from '@angular/core';
import { RegisterRetirementAccountRoutingModule } from './registerretirementaccount-page.routing.module';
import { RegisterRetirementAccountComponent } from './registerretirementaccount-page.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
// import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import { LlRetirementsavingsPageModule } from '@app/modules/retirementsavings-page/ll-retirementsavings-page.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterRetirementAccountComponent],
  exports: [RegisterRetirementAccountComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegisterRetirementAccountRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    RouterModule,
    // CompanyRetirementAccountModule,
    // NgbModule,
    CommonModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory: (http: HttpClient) => {return new TranslateHttpLoader(http,'assets/json/','.json')},
        deps: [HttpClient]
      }
    })
  ]
})
export class RegisterRetirementAccountModule { }
