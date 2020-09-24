import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlRiskAnalysisRoutingModule } from './risk-analysis-routing.module';

import { LlRiskAnalysisComponent } from './risk-analysis.component';

@NgModule({
  declarations: [LlRiskAnalysisComponent],
  imports: [
    CommonModule,
    LlRiskAnalysisRoutingModule
  ]
})
export class RiskAnalysisModule { }
