import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LlRetirementsavingsPageComponent } from './ll-retirementsavings-page.component';

const routes: Routes = [
  {path: '', component: LlRetirementsavingsPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlRetirementsavingsPageRoutingModule {
}
