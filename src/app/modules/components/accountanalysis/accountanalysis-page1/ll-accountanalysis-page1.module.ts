import { NgModule } from '@angular/core';
import { LlAccountanalysisPage1RoutingModule } from './ll-accountanalysis-page1.routing.module';
import { LlAccountanalysisPage1Component } from './ll-accountanalysis-page1.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { FormsModule } from "@angular/forms";
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

import {LlAccountanalysisPage2Module} from '@app/modules/components/accountanalysis/accountanalysis-page2/ll-accountanalysis-page2.module';

@NgModule({
  declarations: [LlAccountanalysisPage1Component],
  exports: [LlAccountanalysisPage1Component],
  imports: [
    FormsModule,
    RouterModule,
    HttpClientModule,
    LlAccountanalysisPage1RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    LlAccountanalysisPage2Module,
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
export class LlAccountanalysisPage1Module { }
