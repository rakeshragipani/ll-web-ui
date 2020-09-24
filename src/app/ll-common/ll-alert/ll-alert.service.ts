import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';

import {LlAlertComponent} from './ll-alert.component';
import {LlAlertType} from './ll-alert.enum';

@Injectable({providedIn: 'root'})
export class LlAlertService {
  private config: MatSnackBarConfig;
  private isOpen = false;
  private snackBarRef: MatSnackBarRef<LlAlertComponent>;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 10000; // Stay open 10 seconds
    this.config.verticalPosition = 'top';
    this.config.data = {};
  }

  openAlert(type: string, message: string): MatSnackBarRef<LlAlertComponent> {
    // Ignore any attempt to open while it is already open.
    if (this.isOpen) {
      return null;
    }
    this.config.data.message = message;
    this.config.data.type = type;
    this.setClassByType(type);
    this.snackBarRef = this.snackBar.openFromComponent(LlAlertComponent, this.config);
    this.isOpen = true;
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isOpen = false;
    });
    return this.snackBarRef;
  }

  // The type is used for different style colors and template icons
  private setClassByType(type: string) {
    switch (type) {
      case LlAlertType.ERROR:
        this.config.panelClass = ['ll-alert', 'll-alert-error'];
        break;
      case LlAlertType.INFO:
        this.config.panelClass = ['ll-alert', 'll-alert-info'];
        break;
      case LlAlertType.WARN:
        this.config.panelClass = ['ll-alert', 'll-alert-warn'];
        break;
    }
  }
}
