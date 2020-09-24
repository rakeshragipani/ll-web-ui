import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationSuccessComponent } from './activation-success.component';

const routes: Routes = [{ path: '', component: ActivationSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivationSuccessRoutingModule {}
