import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationSuccessRoutingModule } from './activation-success-routing.module';
import { ActivationSuccessComponent } from './activation-success.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ActivationSuccessComponent],
  exports: [ActivationSuccessComponent],
  imports: [CommonModule, ActivationSuccessRoutingModule, MatButtonModule],
})
export class ActivationSuccessModule {}
