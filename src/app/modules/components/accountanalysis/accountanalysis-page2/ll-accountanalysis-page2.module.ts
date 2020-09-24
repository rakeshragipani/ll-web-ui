import { NgModule } from '@angular/core';
import { LlAccountanalysisPage2RoutingModule } from './ll-accountanalysis-page2.routing.module';
import { LlAccountanalysisPage2Component } from '@app/modules/components/accountanalysis/accountanalysis-page2/ll-accountanalysis-page2.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {LlAccountanalysisPage3Module} from '@app/modules/components/accountanalysis/accountanalysis-page3/ll-accountanalysis-page3.module'

@NgModule({
  declarations: [LlAccountanalysisPage2Component],
  exports: [LlAccountanalysisPage2Component],
  imports: [
    FormsModule,
    HttpClientModule,
    LlAccountanalysisPage2RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    LlAccountanalysisPage3Module,
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
export class LlAccountanalysisPage2Module { }
