import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubscriptionPage1Component} from './subscription-page1.component';

const routes: Routes = [
  {path: '', component: SubscriptionPage1Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SubscriptionPage1RoutingModule {
}
