import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlCreateaccountPageComponent} from './ll-createaccount-page.component';

const routes: Routes = [
  {path: '', component: LlCreateaccountPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlCreateaccountPageRoutingModule {
}
