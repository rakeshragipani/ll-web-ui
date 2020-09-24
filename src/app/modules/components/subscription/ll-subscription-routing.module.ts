import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlSubscriptionPage} from './ll-subscription-page.component';

const routes: Routes = [
  {path: '', component: LlSubscriptionPage},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlSubscriptionPageRoutingModule {
}
