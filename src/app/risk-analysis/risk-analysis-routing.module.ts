import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlRiskAnalysisComponent } from './risk-analysis.component';

const routes: Routes = [
  {
    path: '',
    component : LlRiskAnalysisComponent,
    children : [
    {
      path : 'retirement-savings',
      loadChildren: () => import('@app/modules/components/retirementsavings/ll-retirementsavings-page.module').then((m) => m.LlRetirementsavingsPageModule),
    },
    {
      path : 'risk-assessment',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page/ll-riskassessment-page.module').then((m) => m.LlRiskassessmentPageModule),
    },
    {
      path : 'risk-assessment1',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page1/ll-riskassessment-page1.module').then((m) => m.LlRiskassessmentPage1Module),
    },
    {
      path : 'risk-assessment2',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page2/ll-riskassessment-page2.module').then((m) => m.LlRiskassessmentPage2Module),
    },
    {
      path : 'risk-assessment3',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page3/ll-riskassessment-page3.module').then((m) => m.LlRiskassessmentPage3Module),
    },
    {
      path : 'risk-assessment4',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page4/ll-riskassessment-page4.module').then((m) => m.LlRiskassessmentPage4Module),
    },
    {
      path : 'risk-assessment5',
      loadChildren: () => import('@app/modules/components/riskassessment/riskassessment-page5/ll-riskassessment-page5.module').then((m) => m.LlRiskassessmentPage5Module),
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlRiskAnalysisRoutingModule {}
