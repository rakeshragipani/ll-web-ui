import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlRiskassessmentPage2Component} from './ll-riskassessment-page2.component';

const routes: Routes = [
  {path: '', component: LlRiskassessmentPage2Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRiskassessmentPage2RoutingModule {
}
