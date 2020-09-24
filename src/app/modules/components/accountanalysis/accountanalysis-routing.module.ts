import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {llAccountAnalysisPage} from './accountanalysis-page.component';

const routes: Routes = [
  {path: '', component: llAccountAnalysisPage},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlAccountAnalysisRoutingModule {
}
