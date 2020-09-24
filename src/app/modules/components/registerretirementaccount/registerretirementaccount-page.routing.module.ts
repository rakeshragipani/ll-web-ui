import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterRetirementAccountComponent} from './registerretirementaccount-page.component';

const routes: Routes = [
  {path: '', component: RegisterRetirementAccountComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRetirementAccountRoutingModule {
}
