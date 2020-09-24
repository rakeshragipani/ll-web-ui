import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlRiskassessmentPage5Component} from './ll-riskassessment-page5.component';

const routes: Routes = [
  {path: '', component: LlRiskassessmentPage5Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRiskassessmentPage5RoutingModule {
}
