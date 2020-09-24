import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LlAlertModule, LlLogModule, LlMessageModule } from 'app/ll-common';

import { LlHomePageComponent } from './home/ll-home-page.component';
import { PopupComponent } from '@app/modules/components/popup/popup.component';
import { DataShareService } from '@app/shared/data-share.service';
import { MatDialogModule, MatDialogRef } from '@angular/material';
@NgModule({
  bootstrap: [AppComponent],
  providers: [
    SignUpDataService,
    DataShareService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  declarations: [AppComponent, LlHomePageComponent, PopupComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, LlAlertModule, TranslateModule.forRoot(), LlLogModule, LlMessageModule, AppRoutingModule, SharedModule, MatDialogModule],
  exports: [MatSelectModule, PopupComponent],
})
export class AppModule {}
