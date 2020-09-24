import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRetirementAccountsComponent } from './addretirementaccounts.component';


const routes: Routes = [
    {
        path: '',
        component: AddRetirementAccountsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlRetirementAccountsRoutingModule {}
