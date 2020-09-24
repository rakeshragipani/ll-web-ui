import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterRetirementLoginAccount} from '@app/modules/components/registerretirementloginaccount/registerretirementloginaccount.component';
const routes: Routes = [
  {path: '', component: RegisterRetirementLoginAccount},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRetirementLoginAccountRoutingModule {
}
