import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyprofileComponent } from './myprofile.component';

const routes: Routes = [
  {
    path: '',
    component : MyprofileComponent,
    children: [
      {
        path : 'risk',
        loadChildren: () => import('../../risk-analysis/risk-analysis.module').then((m) => m.RiskAnalysisModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlMyProfileRoutingModule {}
