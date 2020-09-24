import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@app/shared/CommonService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterRetirementAccountService } from '@app/modules/components/registerretirementaccount/registerretirementaccount.service';
import message from 'assets/json/en.json';
import { CompanyRetirementAccountService } from './companyretirementaccount.service';
import { PopupComponent } from '@app/modules/components/popup/popup.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';

@Component({
  selector: 'companyretirementaccount-page',
  templateUrl: './companyretirementaccount-page.component.html',
  styleUrls: ['./companyretirementaccount-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRetirementAccount implements OnInit, AfterViewInit, OnDestroy {
  provider: any;
  username: string;
  password: string;
  childCompData = 'child';
  searchText;
  parentData: any;
  selectedValue: string;
  public selectedImage = null;
  public selectedFiSubmitted: boolean;
  public msgSelectedFI: string;
  moveToRegisterRetirementLoginAccount = false;
  registerRetirementAccountInfo: any;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  showLoader = false;
  timeOutError: string;
  subscriptions: Subscription[] = [];
  yodleeToken: any;
  isapitoken: any;
  isusertoken: any;
  tokentime: any;

  constructor(public formBuilder: FormBuilder, private translateService: TranslateService, private service: CommonService, private ref: ChangeDetectorRef, private registerRetirementAccountService: RegisterRetirementAccountService, private router: Router, private route: ActivatedRoute, private companyRetirementAccountService: CompanyRetirementAccountService, private commenService: CommonService, private dialog: MatDialog, private activityHistory: ActivityHistroyService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    const browserL = this.translateService.getBrowserLang();
    this.translateService.use(browserL);
    this.registerRetirementAccountInfo = this.registerRetirementAccountService.getRegisterRetirementAccountInfo();
    this.companyRetirementAccountService.updateRegisterRetirementAccountInfo(this.registerRetirementAccountInfo);
  }

  ngOnInit(): void {
    this.parentData = 4.1;
    this.getProviders();
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  getProviders() {
    this.showLoader = true;
    this.subscriptions.push(
      this.commenService.getProviders().subscribe(
        (response: any) => {
          if (response.body.errorCode) {
            this.timeOutError = response.body.errorMessage;
            console.log(response);
            this.showLoader = false;
            this.ref.detectChanges();
          } else {
            this.provider = response.body;
            this.showLoader = false;
            this.yodleeToken = response.headers.get('token');
            this.isapitoken = response.headers.get('isapitoken');
            this.isusertoken = response.headers.get('isusertoken');
            this.tokentime = response.headers.get('tokentime');
            this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });

            // response.headers.keys().map((key) => console.log(key, response.headers.get(key)));
            // this.yodleeToken = response.headers.get('token');
            // this.isapitoken = response.headers.get('isapitoken');
            // this.isusertoken = response.headers.get('isusertoken');
            // this.tokentime = response.headers.get('tokentime');
            this.ref.detectChanges();
          }
        },
        (error) => {
          console.log('err', error);
          this.showLoader = false;
          if (error) {
            this.timeOutError = 'Our services are not responding at the moment. Please try after sometime, Regret for inconvenience caused.';
          }
          this.ref.detectChanges();
        }
      )
    );
  }

  next = (): void => {
    this.selectedFiSubmitted = true;
    if (this.selectedImage) {
      this.router.navigate(['../register-retirement-login'], { relativeTo: this.route.parent });
      this.moveToRegisterRetirementLoginAccount = true;
    } else {
      this.msgSelectedFI = message.ProviderAccount;
    }
  };

  goBack = (): void => {
    this.router.navigate(['../register-retirement-account'], { relativeTo: this.route.parent });
  };

  selectInstitution(item) {
    if (item === this.selectedImage) {
      this.selectedImage = null;
    } else {
      this.selectedImage = item;
    }
    this.service.setData(this.selectedImage);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '800px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: { pointOne: message.YodleePointOne, pointTwo: message.YodleePointTwo, pointThree: message.YodleePointThree },
    });
  }

  ngOnDestroy() {
    this.provider = null;
    this.username = null;
    this.password = null;
    this.childCompData = 'child';
    this.searchText;
    this.parentData = null;
    this.selectedValue = null;
    this.selectedImage = null;
    this.selectedFiSubmitted = null;
    this.msgSelectedFI = null;
    this.moveToRegisterRetirementLoginAccount = false;
    this.registerRetirementAccountInfo = null;
    this.targetElement = null;
    this.height = null;
    this.showLoader = false;
    this.timeOutError = null;

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
