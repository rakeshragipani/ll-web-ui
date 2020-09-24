import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'll-alert',
  styleUrls: ['./ll-alert.component.scss'],
  templateUrl: './ll-alert.component.html'
})

export class LlAlertComponent implements OnDestroy {
  alertMessage: string;
  alertType: string;

  constructor(public snackBarRef: MatSnackBarRef<LlAlertComponent>, @Inject(MAT_SNACK_BAR_DATA) public alertData: any) {
    this.alertMessage = this.alertData.message;
    this.alertType = this.alertData.type;
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
  
  ngOnDestroy() {
    this.alertMessage = '';
    this.alertType = '';
  }
}
