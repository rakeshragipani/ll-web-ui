import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInfoComponent } from './account-info.component';

import { AccountOptimizationComponent } from './account-optimization/account-optimization.component';

import { AccountDiversificationComponent } from './account-diversification/account-diversification.component';
import { AccountInvestmentComponent } from './account-investment/account-investment.component';
const routes: Routes = [
  {
    path: '',
    component : AccountInfoComponent,
    children: [
      {
        path : 'account-optimization',
        component : AccountOptimizationComponent
      },
      {
          path : 'account-diversification',
          component : AccountDiversificationComponent
      },
      {
          path : 'account-investment',
          component : AccountInvestmentComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlAccountInfoRoutingModule {}
