import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRetirementAccountsComponent } from './addretirementaccounts.component';

import { LlRetirementAccountsRoutingModule } from './addretirementaccounts-routing.module';


@NgModule({
  declarations: [AddRetirementAccountsComponent],
  imports: [
    CommonModule,
    LlRetirementAccountsRoutingModule
  ]
})
export class LlRetirementAccountsModule { }
