import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LlYourinfoPageComponent} from './ll-yourinfo-page.component';

const routes: Routes = [
  {path: '', component: LlYourinfoPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlYourinfoPageRoutingModule {
}
