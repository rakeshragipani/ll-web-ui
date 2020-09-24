import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlRiskassessmentPage3Component} from './ll-riskassessment-page3.component';

const routes: Routes = [
  {path: '', component: LlRiskassessmentPage3Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRiskassessmentPage3RoutingModule {
}
