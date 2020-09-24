import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LlLoginPageComponent } from './ll-login-page.component';

const routes: Routes = [{ path: '', component: LlLoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlLoginPageRoutingModule {}
