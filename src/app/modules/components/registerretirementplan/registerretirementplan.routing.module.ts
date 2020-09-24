import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { RegisterRetirementPlanComponent } from './registerretirementplan.component';

const routes: Routes = [
  {path: '', component: RegisterRetirementPlanComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRetirementPlanRoutingModule {
}
