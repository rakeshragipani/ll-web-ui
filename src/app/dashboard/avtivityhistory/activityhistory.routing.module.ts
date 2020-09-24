import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvtivityhistoryComponent } from './avtivityhistory.component';

const routes: Routes = [{ path: '', component: AvtivityhistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityHistoryRoutingModule {}
