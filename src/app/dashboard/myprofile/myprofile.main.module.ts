import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LlMyProfileRoutingModule } from './myprofile-routing.module';

import { MyprofileComponent } from './myprofile.component';

@NgModule({
  declarations: [MyprofileComponent],
  imports: [
    CommonModule,
    LlMyProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgbModule
  ]
})
export class LlMyProfileModule { }
