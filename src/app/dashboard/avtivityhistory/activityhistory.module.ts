import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvtivityhistoryComponent } from './avtivityhistory.component';

@NgModule({
  declarations: [AvtivityhistoryComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, NgbModule],
})
export class ActivityHistoryModule {}
