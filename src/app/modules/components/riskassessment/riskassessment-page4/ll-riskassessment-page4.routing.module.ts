import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlRiskassessmentPage4Component} from './ll-riskassessment-page4.component';

const routes: Routes = [
  {path: '', component: LlRiskassessmentPage4Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRiskassessmentPage4RoutingModule {
}
