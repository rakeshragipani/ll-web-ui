import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TotalRetirementAccount} from '@app/modules/components/totalretirementaccount/totalretirementaccount.component';
const routes: Routes = [
  {path: '', component: TotalRetirementAccount},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TotalRetirementAccountRoutingModule {
}
