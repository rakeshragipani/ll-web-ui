import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterretirementaccountholdingsComponent } from './registerretirementaccountholdings.component';

const routes: Routes = [{ path: '', component: RegisterretirementaccountholdingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterretirementaccountholdingsRoutingModule {}
