import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlRiskassessmentPage1Component} from './ll-riskassessment-page1.component';

const routes: Routes = [
  {path: '', component: LlRiskassessmentPage1Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRiskassessmentPage1RoutingModule {
}
