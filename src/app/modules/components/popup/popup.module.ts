import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupRoutingModule } from './popup-routing.module';
import { PopupComponent } from './popup.component';
import { LlHeaderPageModule } from '@app/modules/layout/header/ll-header-page.module';
// Material UI Modules
import { MatDialogModule, MatButtonModule } from '@angular/material';
@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, PopupRoutingModule, LlHeaderPageModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  exports: [PopupComponent],
})
export class PopupModule {}
