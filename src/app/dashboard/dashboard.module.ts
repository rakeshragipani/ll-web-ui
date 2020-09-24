import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlDashboardRoutingModule } from './dashboard-routing.module';

import { LlDashboardMainComponent } from './dashboard.main.component';

import { BillingComponent } from './billing/billing.component';
import { AvtivityhistoryComponent } from './avtivityhistory/avtivityhistory.component';
import { NeedahelpComponent } from './needahelp/needahelp.component';
import { ToolsComponent } from './tools/tools.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsandstatementsComponent } from './reportsandstatements/reportsandstatements.component';

@NgModule({
  declarations: [LlDashboardMainComponent, BillingComponent, AvtivityhistoryComponent, NeedahelpComponent, ToolsComponent, ReportsandstatementsComponent],
  imports: [CommonModule, LlDashboardRoutingModule, NgbModule, MatProgressSpinnerModule, TooltipModule, ReactiveFormsModule],
})
export class LlDashboardModule {}
