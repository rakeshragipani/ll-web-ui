import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';

import { LlRiskAssessment5Service } from '@app/modules/components/riskassessment/riskassessment-page5/ll-riskassessment-page5.service';

import { LlRiskAssessment4Service } from './ll-riskassessment-page4.service';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { CommonService } from '@app/shared/CommonService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page4',
  templateUrl: './ll-riskassessment-page4.component.html',
  styleUrls: ['./ll-riskassessment-page4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlRiskassessmentPage4Component implements OnInit, OnDestroy {

  parentData: any;
  // page3Data:any;
  riskassessmentInfo4: any = {};
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  temp: any;
  temp1: any;
  temp2: any;
  temp3: any;
  temp4: any;
  moveToRiskAssessment5: boolean = false;
  categoryColor: any;
  showLoader: boolean = false;
  riskassessmentInfo3: any;
  riskNavigationInfo: {} = {
    proceedToNextModule: true
  };
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService,
    private ref: ChangeDetectorRef,
    private signUpDataService: SignUpDataService,
    private llRiskAssessment5Service: LlRiskAssessment5Service,
    private router: Router,
    private route: ActivatedRoute,
    private llRiskAssessment4Service: LlRiskAssessment4Service,
    private sessionStorageService: SessionStorageService,
    private commonService: CommonService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.riskassessmentInfo3 = this.llRiskAssessment5Service.getRiskAssessmentInfo4();
    this.llRiskAssessment4Service.updateRiskAssessmentInfo5(this.riskassessmentInfo4);
    let navObj = this.sessionStorageService.getSingleValueFromSession('riskNavigationInfo');
    if (navObj) {
      this.riskNavigationInfo = navObj;
    }
  }

  ngOnInit(): void {
    this.parentData = 3.4;
    this.temp = this.riskassessmentInfo3.temp;
    if (!this.temp) {
      this.showLoader = true;
      this.subscriptions.push(this.commonService.getRiskScore().subscribe((result) => {
        this.temp = this.getValueFixed(Number(result[0].curr_riskscore), 1)
        this.showLoader = false;
        this.ref.detectChanges();
      }));
    }
    this.temp1 = 'RISK LEVEL 1 - LOWEST RISK';
    this.temp2 = 'RISK LEVEL 10 - HIGHEST RISK';
    this.temp3 = '(Cash or US Treasuries)';
    this.temp4 = '(Single or all Stocks)';
  }

  getValueFixed(v, d) {
    const indexValue = v.toString().indexOf('.');
    if (indexValue !== -1) {
      return v;
    }
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470; console.log('this.height', this.height);
    this.ref.detectChanges();
  };

  next = (): void => {
    this.router.navigate(['../../register-retirement-account'], { relativeTo: this.route.parent });
  }

  getMenu(dat) {
  }

  getMessage(message: string) {
    console.log('message-------------retment', message);
    if (this.parentData === message) {
      this.moveToRiskAssessment5 = false;
    } else {
      this.getMenu(message);
    }

  }

  goBack = (): void => {
    this.router.navigate(['../risk-assessment5'], { relativeTo: this.route.parent });
  }

  goBackToRetirementSavingsPage() {
    this.router.navigate(['../retirement-savings'], { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.parentData = null;
    this.riskassessmentInfo4 = {};
    this.temp = null;
    this.temp1 = null;
    this.temp2 = null;
    this.temp3 = null;
    this.temp4 = null;;
    this.moveToRiskAssessment5 = false;
    this.categoryColor = null;
    this.showLoader = false;
    this.riskassessmentInfo3 = null;
    this.riskNavigationInfo = null;
    this.height = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
