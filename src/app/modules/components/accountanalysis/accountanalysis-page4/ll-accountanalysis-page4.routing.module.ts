import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlAccountanalysisPage4Component} from './ll-accountanalysis-page4.component';

const routes: Routes = [
  {path: '', component: LlAccountanalysisPage4Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountanalysisPage4RoutingModule {
}
