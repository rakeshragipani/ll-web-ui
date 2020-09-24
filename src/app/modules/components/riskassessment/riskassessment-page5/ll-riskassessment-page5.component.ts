import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@app/shared/CommonService';
import { Router, ActivatedRoute } from '@angular/router';


import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { LlRiskAssessment3Service } from '@app/modules/components/riskassessment/riskassessment-page3/ll-riskassessment-page3.service';

import { LlRiskAssessment5Service } from './ll-riskassessment-page5.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page5',
  templateUrl: './ll-riskassessment-page5.component.html',
  styleUrls: ['./ll-riskassessment-page5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlRiskassessmentPage5Component implements OnInit, OnDestroy {
  parentData: any;
  riskassessmentInfo5: any = {};
    @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  public temp: any;
  // temp1: any;
  // temp2: any;
  // temp3: any;
  // temp4: any;
  // temp5: any;
  maxValue: any;
  totalvalue: any;
  moveToRegisterRetirementAccount: boolean = false;
  categoryColor: any;
  categoryColor1: any;
  riskassessmentInfo4: any;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService, 
    private commenService: CommonService, 
    private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private llRiskAssessment3Service : LlRiskAssessment3Service,
    private router : Router,
    private route : ActivatedRoute,
    private llRiskAssessment5Service : LlRiskAssessment5Service) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.riskassessmentInfo4 = this.llRiskAssessment3Service.getRiskAssessmentInfo3();
    // const browserL = this.translateService.getBrowserLang();
    // this.translateService.use(browserL);
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.parentData = 3.5;
    // this.temp = 6;
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getRiskScore().subscribe((result) => {
      console.log('result', result[0]);

      this.riskassessmentInfo5.temp1 = result[0].percentagex + ' %';
      this.riskassessmentInfo5.temp2 = '+' + result[0].percentagey + '%';
      this.riskassessmentInfo5.temp3 = this.riskassessmentInfo4.displayAmount;
      this.riskassessmentInfo5.temp4 = '-$' + Number(result[0].amountx.substr(1)).toLocaleString('en-GB');
      this.riskassessmentInfo5.temp5 = '+$' + Number(result[0].amounty).toLocaleString('en-GB');
      this.riskassessmentInfo5.maxValue = Number(result[0].amountx.substr(1)) + Number(result[0].amounty);
      this.riskassessmentInfo5.totalvalue = result[0].amountx.substr(1);
      this.riskassessmentInfo4.temp = this.riskassessmentInfo5.temp = this.getValueFixed(Number(result[0].curr_riskscore), 1);
      this.llRiskAssessment5Service.updateRiskAssessmentInfo4(this.riskassessmentInfo4);
      this.showLoader = false;
      this.ref.detectChanges();
      // this.getRetirementsData = results; s1.substr(1);
      // this.riskQuestion = results[0];
      // console.log('data', this.riskQuestion);
      // this.ref.detectChanges();
    }));

    // this.temp1 = '-17 %';
    // this.temp2 = '+26 %';
    // this.temp3 = '$500,000';
    // this.temp4 = '-$86,658';
    // this.temp5 = '+$129,658';
    // this.maxValue = '216316';
    // this.totalvalue = '86658';
    this.categoryColor1 = '17%';
    
  }

  getValueFixed(v, d) {
    const indexValue = v.toString().indexOf('.');
      if (indexValue !== -1) {
      return v;
    }
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  getMenu(dat) {
  }

  getMessage(message: string) {
    if (this.parentData === message) {
      this.moveToRegisterRetirementAccount = false;
    } else {
      this.getMenu(message);
    }
  }

  next = (): void => {
    this.router.navigate(['../risk-assessment4'], {relativeTo : this.route.parent});
  };

  goBack = (): void => {
    this.router.navigate(['../risk-assessment3'],{relativeTo : this.route.parent});
  };

  goBackToRetirementSavingsPage() {
    this.router.navigate(['../retirement-savings'], {relativeTo : this.route.parent});
  }
  
  ngOnDestroy() {
    this.parentData = null;
    this.riskassessmentInfo5 = {};
    this.height = null;
    this.temp = null;
    this.maxValue = null;
    this.totalvalue = null;
    this.moveToRegisterRetirementAccount = false;
    this.categoryColor = null;
    this.categoryColor1 = null;
    this.riskassessmentInfo4 = null;
    this.showLoader = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
