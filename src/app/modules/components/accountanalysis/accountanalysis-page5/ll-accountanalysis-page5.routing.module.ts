import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlAccountanalysisPage5Component} from './ll-accountanalysis-page5.component';

const routes: Routes = [
  {path: '', component: LlAccountanalysisPage5Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountanalysisPage5RoutingModule {
}
