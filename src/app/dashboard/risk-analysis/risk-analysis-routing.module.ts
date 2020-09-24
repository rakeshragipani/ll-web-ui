import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardRiskAnalysisComponent } from './risk-analysis.component';

const routes: Routes = [
  {
    path: '',
    component : DashboardRiskAnalysisComponent,
    children: [{
      path : 'risk',
      loadChildren: () => import('@app/risk-analysis/risk-analysis.module').then((m) => m.RiskAnalysisModule),
    }]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlRiskAnalysisRoutingModule {}
