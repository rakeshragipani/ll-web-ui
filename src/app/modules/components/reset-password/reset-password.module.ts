import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordComponent } from './reset-password.component';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, ResetPasswordRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class ResetPasswordModule {}
