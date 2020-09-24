import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LlSidenavComponent } from '@app/modules/layout/sidenav/ll-sidenav.component'
const routes: Routes = [
  {path: '', component: LlSidenavComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LlSidenavRoutingModule {
}
