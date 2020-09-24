import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetirementAccountsComponent } from './retirementaccounts.component';

import { LlRetirementAccountsRoutingModule } from './retirementaccounts-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [RetirementAccountsComponent],
  imports: [
    CommonModule,
    NgbModule,
    TooltipModule,
    LlRetirementAccountsRoutingModule
  ]
})
export class LlRetirementAccountsModule { }
