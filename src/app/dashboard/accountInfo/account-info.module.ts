import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LlAccountInfoRoutingModule } from './account-info-routing.module';

import { AccountInfoComponent } from './account-info.component';

import { AccountOptimizationComponent } from './account-optimization/account-optimization.component';

import {AccountDiversificationComponent} from './account-diversification/account-diversification.component';

import { AccountInvestmentComponent } from './account-investment/account-investment.component';

@NgModule({
  declarations: [AccountInfoComponent, AccountOptimizationComponent, AccountInvestmentComponent, AccountDiversificationComponent],
  imports: [
    CommonModule,
    LlAccountInfoRoutingModule
  ]
})
export class LlAccountInfoModule { }
