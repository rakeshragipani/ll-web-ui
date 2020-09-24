import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { LlSignupComponent } from './ll-signup.component';
import { LlSignupRoutingModule } from './ll-signup-routing.module';
import { LlSidenavModule } from '@app/modules/layout/sidenav/ll-sidenav.module';
import { LlHeaderPageModule } from '@app/modules/layout/header/ll-header-page.module';



@NgModule({
  declarations: [LlSignupComponent],
  imports: [LlSignupRoutingModule, RouterModule, SharedModule, LlSidenavModule, LlHeaderPageModule]
})
export class LlSignUpModule {}
