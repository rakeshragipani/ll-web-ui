import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlAccountanalysisPage1Component} from './ll-accountanalysis-page1.component';

const routes: Routes = [
  {path: '', component: LlAccountanalysisPage1Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountanalysisPage1RoutingModule {
}
