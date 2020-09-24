import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlRiskAnalysisRoutingModule } from './risk-analysis-routing.module';

import { DashboardRiskAnalysisComponent } from './risk-analysis.component';

@NgModule({
  declarations: [DashboardRiskAnalysisComponent],
  imports: [
    CommonModule,
    LlRiskAnalysisRoutingModule
  ]
})
export class LlDashBoardRiskAnalysis { }
