import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationFailedComponent } from './activation-failed.component';

const routes: Routes = [{ path: '', component: ActivationFailedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivationFailedRoutingModule {}
