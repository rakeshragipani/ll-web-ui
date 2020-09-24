import { NgModule } from '@angular/core';
import { CompanyRetirementAccountRoutingModule } from '@app/modules/components/companyretirementaccount/companyretirementaccount-page.routing.module';
import { CompanyRetirementAccount } from './companyretirementaccount-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CompanyRetirementAccount],
  entryComponents: [CompanyRetirementAccount],
  bootstrap: [CompanyRetirementAccount],
  exports: [CompanyRetirementAccount],
  imports: [
    FormsModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    Ng2SearchPipeModule,
    RouterModule,
    CompanyRetirementAccountRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    NgbModule,
    MatSlideToggleModule,
    MatDialogModule,
    TooltipModule,
    // RegisterRetirementLoginAccountModule,
    ReactiveFormsModule,
    // NgbModule,
    CommonModule,
    MatProgressSpinnerModule,
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
})
export class CompanyRetirementAccountModule {}
