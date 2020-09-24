import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [PasswordComponent],
  imports: [CommonModule, PasswordRoutingModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
})
export class PasswordModule {}
