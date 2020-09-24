import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyRetirementAccount} from '@app/modules/components/companyretirementaccount/companyretirementaccount-page.component';
const routes: Routes = [
  {path: '', component: CompanyRetirementAccount},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRetirementAccountRoutingModule {
}
