import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterretirementMFAaccountComponent } from './registerretirement-mfaaccount.component';

const routes: Routes = [{ path: '', component: RegisterretirementMFAaccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterretirementMFAaccountRoutingModule {}
