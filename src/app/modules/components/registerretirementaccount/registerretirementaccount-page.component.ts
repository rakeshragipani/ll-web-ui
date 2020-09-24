import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EncrDecrService } from '@app/shared/EncrDecrService';
import { TranslateService } from '@ngx-translate/core';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';

import { LlRiskAssessment4Service } from '@app/modules/components/riskassessment/riskassessment-page4/ll-riskassessment-page4.service';

import { RegisterRetirementAccountService } from './registerretirementaccount.service';

import { LlSideNavService } from '@app/modules/layout/sidenav/ll-sidenav.service';

import { SessionStorageService } from '@app/shared/session-storage.service.ts';

@Component({
  selector: 'registerretirementaccount-page',
  templateUrl: './registerretirementaccount-page.component.html',
  styleUrls: ['./registerretirementaccount-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterRetirementAccountComponent implements OnInit, AfterViewInit {
  accountType = '401k';
  parentData: any;
  registerRetirementAccountInfo: any = {};
  // registerRetirementAccountInfo: boolean = false;
  // registerRetirementAccount: any = {};
  moveToCompanyRetirementAccount = false;
  // riskassessmentInfo5:any = {};
  riskassessmentInfo5: any;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  constructor(private http: HttpClient, public formBuilder: FormBuilder, private EncrDecr: EncrDecrService, private translateService: TranslateService, private ref: ChangeDetectorRef, private signUpDataService: SignUpDataService, private llRiskAssessment4Service: LlRiskAssessment4Service, private router: Router, private route: ActivatedRoute, private registerRetirementAccountService: RegisterRetirementAccountService, private llSideNavService: LlSideNavService, private sessionStorageService: SessionStorageService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    const browserL = this.translateService.getBrowserLang();
    this.translateService.use(browserL);
    this.llSideNavService.updateSideNavValue('register-retirement-account');
    this.riskassessmentInfo5 = this.llRiskAssessment4Service.getRiskAssessmentInfo5();
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.parentData = 4;
    this.setAccountType(this.accountType);
  }

  next() {
    this.moveToCompanyRetirementAccount = true;
    this.router.navigate(['../company-retirement-account'], { relativeTo: this.route.parent });
    this.registerRetirementAccountService.updateRegisterRetirementAccountInfo(this.registerRetirementAccountInfo);
    this.registerRetirementAccountInfo = false;
    //     // // // this._router.navigate(["retirementsavings"]);
  }
  //   tooltip() {
  //     // console.log(event);
  //     // console.log(this.checked)

  //   }

  getMenu(dat) {}

  getMessage(message: string) {
    if (this.parentData === message) {
      this.registerRetirementAccountInfo = true;
      this.moveToCompanyRetirementAccount = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    const navigationObj = this.sessionStorageService.getSingleValueFromSession('registerRetirementNavigationInfo');
    if (navigationObj) {
      this.router.navigate(['../' + navigationObj.backNavigation], { relativeTo: this.route.parent });
    } else {
      this.router.navigate(['../risk/risk-assessment4'], { relativeTo: this.route.parent });
    }
  };
  setAccountType(value) {
    this.sessionStorageService.updateSessionValue('accountType', {
      accountType: value,
    });
  }
}
