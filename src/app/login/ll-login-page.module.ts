import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlLoginPageRoutingModule } from './ll-login-page.routing.module';
import { LlLoginPageComponent } from './ll-login-page.component';
import { LlHeaderPageModule } from '@app/modules/layout/header/ll-header-page.module';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LlSidenavModule } from '@app/modules/layout/sidenav/ll-sidenav.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
// import { PopupComponent } from '@app/modules/components/popup/popup.component';

@NgModule({
  declarations: [
    LlLoginPageComponent,
    // PopupComponent,
    // ,LlSidenavComponent
  ],
  exports: [
    LlLoginPageComponent,
    // PopupComponent,
    // ,LlSidenavComponent
  ],
  imports: [
    ReactiveFormsModule,
    LlLoginPageRoutingModule,
    LlHeaderPageModule,
    // LlCreateaccountPageModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    LlSidenavModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    NgxCaptchaModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, 'assets/json/', '.json');
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class LlLoginPageModule {}
