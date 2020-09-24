import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetirementAccountsComponent } from './retirementaccounts.component';


const routes: Routes = [
    {
        path: '',
        component: RetirementAccountsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlRetirementAccountsRoutingModule {}
