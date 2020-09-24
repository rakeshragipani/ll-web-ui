import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRetirementPlanRoutingModule } from './registerretirementplan.routing.module';
import { RegisterRetirementPlanComponent } from './registerretirementplan.component';
// import { LlHeaderPageModule } from '@app/modules/header-page/ll-header-page.module';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import{TotalRetirementAccountModule} from '@app/modules/components/totalretirementaccount/totalretirementaccount.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterRetirementPlanComponent],
  exports: [RegisterRetirementPlanComponent],
  imports: [
    // TotalRetirementAccountModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegisterRetirementPlanRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
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
export class RegisterRetirementPlanModule { }
