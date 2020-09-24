import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlRetirementSavingsRoutingModule } from './retirement-savings-routing.module';

import { DashboardRetirementSavingsComponent } from './retirement-savings.component';

@NgModule({
  declarations: [DashboardRetirementSavingsComponent],
  imports: [
    CommonModule,
    LlRetirementSavingsRoutingModule
  ]
})
export class LlDashboardRetirementSavings { }
