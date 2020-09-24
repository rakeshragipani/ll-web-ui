import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlAccountanalysisPage3Component} from './ll-accountanalysis-page3.component';

const routes: Routes = [
  {path: '', component: LlAccountanalysisPage3Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountanalysisPage3RoutingModule {
}
