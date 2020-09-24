import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlSignupComponent } from './ll-signup.component';

const routes: Routes = [
  {
    path: '',
    component: LlSignupComponent,
    children: [
      {
        path: 'your-info',
        loadChildren: () => import('@app/modules/components/yourinfo/ll-yourinfo-page.module').then((m) => m.LlYourinfoPageModule),
      },
      {
        path: 'create-account',
        loadChildren: () => import('@app/modules/components/createaccount/ll-createaccount-page.module').then((m) => m.LlCreateaccountPageModule),
      },
      {
        path: 'risk',
        loadChildren: () => import('@app/risk-analysis/risk-analysis.module').then((m) => m.RiskAnalysisModule),
      },
      {
        path: 'register-retirement-account',
        loadChildren: () => import('@app/modules/components/registerretirementaccount/registerretirementaccount-page.module').then((m) => m.RegisterRetirementAccountModule),
      },
      {
        path: 'company-retirement-account',
        loadChildren: () => import('@app/modules/components/companyretirementaccount/companyretirementaccount-page.module').then((m) => m.CompanyRetirementAccountModule),
      },
      {
        path: 'register-retirement-login',
        loadChildren: () => import('@app/modules/components/registerretirementloginaccount/registerretirementloginaccount.module').then((m) => m.RegisterRetirementLoginAccountModule),
      },
      {
        path: 'register-retirement-mfa-login',
        loadChildren: () => import('@app/modules/components/registerretirement-mfaaccount/registerretirement-mfaaccount.module').then((m) => m.RegisterretirementMFAaccountModule),
      },
      {
        path: 'register-retirement-plan',
        loadChildren: () => import('@app/modules/components/registerretirementplan/registerretirementplan.module').then((m) => m.RegisterRetirementPlanModule),
      },
      {
        path: 'register-retirement-account-holdings',
        loadChildren: () => import('@app/modules/components/registerretirementaccountholdings/registerretirementaccountholdings.module').then((m) => m.RegisterretirementaccountholdingsModule),
      },
      {
        path: 'total-retirement-account',
        loadChildren: () => import('@app/modules/components/totalretirementaccount/totalretirementaccount.module').then((m) => m.TotalRetirementAccountModule),
      },
      {
        path: 'account-analysis',
        loadChildren: () => import('@app/modules/components/accountanalysis/ll-accountanalysis-page.module').then((m) => m.LlAccountAnalysisModule),
      },
      {
        path: 'account-analysis1',
        loadChildren: () => import('@app/modules/components/accountanalysis/accountanalysis-page1/ll-accountanalysis-page1.module').then((m) => m.LlAccountanalysisPage1Module),
      },
      {
        path: 'account-analysis2',
        loadChildren: () => import('@app/modules/components/accountanalysis/accountanalysis-page2/ll-accountanalysis-page2.module').then((m) => m.LlAccountanalysisPage2Module),
      },
      {
        path: 'account-analysis3',
        loadChildren: () => import('@app/modules/components/accountanalysis/accountanalysis-page3/ll-accountanalysis-page3.module').then((m) => m.LlAccountanalysisPage3Module),
      },
      {
        path: 'account-analysis4',
        loadChildren: () => import('@app/modules/components/accountanalysis/accountanalysis-page4/ll-accountanalysis-page4.module').then((m) => m.LlAccountanalysisPage4Module),
      },
      {
        path: 'account-analysis5',
        loadChildren: () => import('@app/modules/components/accountanalysis/accountanalysis-page5/ll-accountanalysis-page5.module').then((m) => m.LlAccountanalysisPage5Module),
      },
      {
        path: 'subscription',
        loadChildren: () => import('@app/modules/components/subscription/ll-subscription-page.module').then((m) => m.LlSubscriptionModule),
      },
      {
        path: 'subscription1',
        loadChildren: () => import('@app/modules/components/subscription/subscription-page1/subscription-page1.module').then((m) => m.SubscriptionPage1Module),
      },
      {
        path: 'subscription2',
        loadChildren: () => import('@app/modules/components/subscription/subscription-page2/subscription-page2.module').then((m) => m.SubscriptionPage2Module),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlSignupRoutingModule {}
