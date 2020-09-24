import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationFailedRoutingModule } from './activation-failed-routing.module';
import { ActivationFailedComponent } from './activation-failed.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ActivationFailedComponent],
  exports: [ActivationFailedComponent],
  imports: [CommonModule, ActivationFailedRoutingModule, MatButtonModule],
})
export class ActivationFailedModule {}
