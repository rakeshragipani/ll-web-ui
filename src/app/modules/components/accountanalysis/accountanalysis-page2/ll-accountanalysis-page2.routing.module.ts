import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlAccountanalysisPage2Component} from './ll-accountanalysis-page2.component';

const routes: Routes = [
  {path: '', component: LlAccountanalysisPage2Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountanalysisPage2RoutingModule {
}
