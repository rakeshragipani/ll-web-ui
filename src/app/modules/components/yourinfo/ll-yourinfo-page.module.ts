import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LlYourinfoPageRoutingModule } from './ll-yourinfo-page.routing.module';
import { LlYourinfoPageComponent } from './ll-yourinfo-page.component';

import { CommonModule } from '@angular/common';
// import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import { FlexLayoutModule } from "@angular/flex-layout";
import { LlSidenavModule } from '@app/modules/layout/sidenav/ll-sidenav.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatNativeDateModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
// import { PopupComponent } from '../popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LlYourinfoPageComponent,
    // PopupComponent,
  ],
  exports: [
    LlYourinfoPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    LlYourinfoPageRoutingModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    NgbModule,
    // LlCreateaccountPageModule,
    // MatGridListModule,
    MatFormFieldModule,
    // MatInputModule,
    MatToolbarModule,
    LlSidenavModule,
    MatDatepickerModule,
    // MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
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
  entryComponents: [],
})
export class LlYourinfoPageModule {
  constructor() {
    console.log('------------------------------------------------------1111111111111');
  }
}
