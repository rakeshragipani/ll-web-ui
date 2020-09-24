import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LlPageNotFoundPageComponent } from './shared/ll-page-not-found/ll-page-not-found-page.component';
import { LlHomePageComponent } from './home/ll-home-page.component';

export const LlAppRoutes: Routes = [
  { path: '', component: LlHomePageComponent, pathMatch: 'full' },
  { path: 'signup', loadChildren: () => import('@app/sign-up/ll-signup.module').then((m) => m.LlSignUpModule) },
  { path: 'login', loadChildren: () => import('@app/login/ll-login-page.module').then((m) => m.LlLoginPageModule) },
  { path: 'activation-failed', loadChildren: () => import('@app/modules/components/activation-failed/activation-failed.module').then((m) => m.ActivationFailedModule) },
  { path: 'activation-success', loadChildren: () => import('@app/modules/components/activation-success/activation-success.module').then((m) => m.ActivationSuccessModule) },
  {
   path : 'dashboard',
   loadChildren: () => import('@app/dashboard/dashboard.module').then((m) => m.LlDashboardModule)
  },
  { path: 'popup', loadChildren: () => import('@app/modules/components/popup/popup.module').then((m) => m.PopupModule) },
  { path: 'forgot-password', loadChildren: () => import('@app/modules/components/password/password.module').then((m) => m.PasswordModule) },
  { path: 'reset-password', loadChildren: () => import('@app/modules/components/reset-password/reset-password.module').then((m) => m.ResetPasswordModule) },
  { path: '**', component: LlPageNotFoundPageComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(LlAppRoutes)],
})
export class AppRoutingModule {}
