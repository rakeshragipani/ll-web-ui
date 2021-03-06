import { NgModule } from '@angular/core';
import { LlAccountanalysisPage3RoutingModule } from './ll-accountanalysis-page3.routing.module';
import { LlAccountanalysisPage3Component } from './ll-accountanalysis-page3.component';
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
import {LlAccountanalysisPage4Module} from '@app/modules/components/accountanalysis/accountanalysis-page4/ll-accountanalysis-page4.module';

@NgModule({
  declarations: [LlAccountanalysisPage3Component],
  exports: [LlAccountanalysisPage3Component],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    LlAccountanalysisPage3RoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    TooltipModule,
    LlAccountanalysisPage4Module,
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
export class LlAccountanalysisPage3Module { }
