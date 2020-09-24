import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { LlSidenavRoutingModule } from '@app/modules/layout/sidenav/ll-sidenav.routing.module'
import { LlSidenavComponent } from '@app/modules/layout/sidenav/ll-sidenav.component';
// import { LlHeaderComponent } from '@app/modules/header/ll-header.component';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [LlSidenavComponent],
  exports: [LlSidenavComponent],
  imports: [
    LlSidenavRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatSliderModule,
    CommonModule
  ]
})
export class LlSidenavModule { }
