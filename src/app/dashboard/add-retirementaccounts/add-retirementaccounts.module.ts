import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlAddRetirmentAccountRoutingModule } from './add-retirementaccounts-routing.module';

import { AddRetirementAccountsComponent } from './add-retirementaccounts.component';

@NgModule({
  declarations: [AddRetirementAccountsComponent],
  imports: [
    CommonModule,
    LlAddRetirmentAccountRoutingModule
  ]
})
export class LlAddRetirementAccountsModule { }
