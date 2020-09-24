import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LlAlertComponent} from './ll-alert.component';

@NgModule({
  declarations: [LlAlertComponent],
  entryComponents: [LlAlertComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})

export class LlAlertModule {
}
