import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubscriptionPage2Component} from './subscription-page2.component';

const routes: Routes = [
  {path: '', component: SubscriptionPage2Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SubscriptionPage2RoutingModule {
}
