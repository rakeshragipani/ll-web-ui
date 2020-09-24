import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardRetirementSavingsComponent } from './retirement-savings.component';

const routes: Routes = [
  {
    path: '',
    component : DashboardRetirementSavingsComponent,
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
export class LlRetirementSavingsRoutingModule {}
