import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlDashboardMainComponent } from './dashboard.main.component';

import { BillingComponent } from './billing/billing.component';
import { AvtivityhistoryComponent } from './avtivityhistory/avtivityhistory.component';
import { NeedahelpComponent } from './needahelp/needahelp.component';
import { ToolsComponent } from './tools/tools.component';
import { SubscriptionPage1Component } from '../modules/components/subscription/subscription-page1/subscription-page1.component';
import { ReportsandstatementsComponent } from './reportsandstatements/reportsandstatements.component';

const routes: Routes = [
  {
    path: '',
    component: LlDashboardMainComponent,
    children: [
      {
        path: 'myprofile',
        loadChildren: () => import('./myprofile/myprofile.main.module').then((m) => m.LlMyProfileModule),
      },
      {
        path: 'retirement-accounts',
        loadChildren: () => import('@app/dashboard/retirementaccounts/retirementaccounts.module').then((m) => m.LlRetirementAccountsModule),
      },
      {
        path: 'add-retirement-account',
        loadChildren: () => import('@app/dashboard/add-retirementaccounts/add-retirementaccounts.module').then((m) => m.LlAddRetirementAccountsModule),
      },
      {
        path: 'addretirementaccount',
        loadChildren: () => import('@app/dashboard/addretirementaccounts/addretirementaccounts.module').then((m) => m.LlRetirementAccountsModule),
      },
      {
        path: 'risk-analysis',
        loadChildren: () => import('./risk-analysis/risk-analysis.module').then((m) => m.LlDashBoardRiskAnalysis),
      },
      {
        path: 'retirement-savings',
        loadChildren: () => import('./retirement-savings/retirement-savings.module').then((m) => m.LlDashboardRetirementSavings),
      },
      {
        path: 'billing/change-subscription',
        loadChildren: () => import('@app/modules/components/subscription/subscription-page1/subscription-page1.module').then((m) => m.SubscriptionPage1Module),
      },
      {
        path: 'billing/subscription1',
        loadChildren: () => import('@app/modules/components/subscription/subscription-page1/subscription-page1.module').then((m) => m.SubscriptionPage1Module),
      },
      {
        path: 'billing/subscription2',
        loadChildren: () => import('@app/modules/components/subscription/subscription-page2/subscription-page2.module').then((m) => m.SubscriptionPage2Module),
      },
      { path: 'activityhistory', component: AvtivityhistoryComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'needahelp', component: NeedahelpComponent },
      { path: 'tools', component: ToolsComponent },
      { path: 'reports', component: ReportsandstatementsComponent },
      { path: 'account-info', loadChildren: () => import('./accountInfo/account-info.module').then((m) => m.LlAccountInfoModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlDashboardRoutingModule {}
