import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { Router, ActivatedRoute } from '@angular/router';

import { LlCreateAccountService } from '@app/modules/components/createaccount/ll-createaccount-page.service';

import { LlRetirementSavingsService } from './ll-retirementsavings-page.service';

import {LlSideNavService} from '@app/modules/layout/sidenav/ll-sidenav.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'll-retirementsavings-page',
  templateUrl: './ll-retirementsavings-page.component.html',
  styleUrls: ['./ll-retirementsavings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlRetirementsavingsPageComponent implements OnInit, OnDestroy {
  parentData: any;
  retirementSavingForm: FormGroup;
  isSubmitted = false;
  retirementsavingsInfo: any = {};
  moveToRiskAssessment = false;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  createaccountInfo: any;
  riskQuestion: any;
  retirementSavingsAmount ;
  riskPercentage ; //by default
  getRetirementsData: any;
  showLoader = true;
  subscriptions: Subscription[] = []

  constructor(
    private _router: Router,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private commenService: CommonService,
    private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private sessionStorageService: SessionStorageService,
    private llCreateAccountService : LlCreateAccountService,
    private router : Router,
    private route : ActivatedRoute,
    private llRetirementSavingsService : LlRetirementSavingsService,
    private llSideNavService: LlSideNavService
  ) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.createaccountInfo = this.llCreateAccountService.getCreateAccountInfo();
    this.llSideNavService.updateSideNavValue('risk');
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getRetirementSavingsData().subscribe(
      (results: any) => {
        if(!results || results.length == 0){
          this.getRetirementSavings();
        } else {
          results.sort(function(a, b){
            return a['risk_question_id'] - b['risk_question_id'];
        });
        console.log(results);
        if (results[0]['finaloptions']) {
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo1', {value: results[0]['finaloptions']['question1']['value'], selectedValue: results[0]['finaloptions']['question1']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question1']['optionSelected'] }});
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo1Temp', {value: results[0]['finaloptions']['question1']['value'], selectedValue: results[0]['finaloptions']['question1']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question1']['optionSelected'] }});
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo2', {value: results[0]['finaloptions']['question2']['value'], selectedValue: results[0]['finaloptions']['question2']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question2']['optionSelected'] }});
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo2Temp', {value: results[0]['finaloptions']['question2']['value'], selectedValue: results[0]['finaloptions']['question2']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question2']['optionSelected'] }});
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo3', {value: results[0]['finaloptions']['question3']['value'], selectedValue: results[0]['finaloptions']['question3']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question3']['optionSelected'] }});
          this.sessionStorageService.updateSessionValue('riskAssessmentInfo3Temp', {value: results[0]['finaloptions']['question3']['value'], selectedValue: results[0]['finaloptions']['question3']['selectedValue'], selectedObj: { riskPosition: results[0]['finaloptions']['question3']['optionSelected'] }});
        }
        this.getRetirementsData = results.map(result=>{
        return  { 
          id: result['risk_question_id'],
          sequence : result['risk_question_id'],
          text : result['risk_question_text'],
          page : result['risk_question_id'],
          answer : result['risk_answer']
         }
        });
        this.riskQuestion = this.getRetirementsData.find(r => r.page == 1);
        this.llRetirementSavingsService.updateRetirementData(this.getRetirementsData);
        this.llRetirementSavingsService.updateRiskQuestion(this.riskQuestion);
        this.retirementSavingsAmount = this.riskQuestion.answer && (this.riskQuestion.answer.split('$')[1] || '').replace(',', '');
        this.riskPercentage = this.getRetirementsData.find(r => r.page == 2).answer;
      }
        if(this.retirementSavingsAmount){
          this.retirementSavingForm = this.formBuilder.group({
            amountsavedHidden: [this.retirementSavingsAmount || 0, [Validators.required, Validators.min(100), Validators.max(9999999)]],
            amountsaved: ['$' + parseInt(this.retirementSavingsAmount, 10).toLocaleString('en-GB') || 0],
          }); 
        } else {
          this.retirementSavingForm = this.formBuilder.group({
            amountsavedHidden: [this.sessionStorageService.getSingleValueFromSession('retirementSavingValue') || 0, [Validators.required, Validators.min(100), Validators.max(9999999)]],
            amountsaved: ['$' + (this.sessionStorageService.getSingleValueFromSession('retirementSavingValue') ? parseInt(this.sessionStorageService.getSingleValueFromSession('retirementSavingValue'), 10).toLocaleString('en-GB') : 0)],
          }); 
        }
        
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (err) => {
        this.showLoader = false;
        this.ref.detectChanges();
      }
    ));
  }
  get f() {
    return this.retirementSavingForm.controls;
  }
  amountChange(amount) {
    amount = parseFloat(amount.replace(/(?:,|\$)+/gi, ''));
    // console.log(amount);
    if (isNaN(amount) || !amount) {
      this.retirementSavingForm.patchValue({
        amountsaved: '$0',
        amountsavedHidden: 0,
        duration: 5,
      });
    } else {
      // this.retirementsavingsInfo.amountsaved = parseInt(amount, 10);
      this.retirementSavingForm.patchValue({
        amountsaved: '$' + parseInt(amount, 10).toLocaleString('en-GB'),
        amountsavedHidden: amount,
        duration: 5,
      });
    }
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  next = (): void => {
    // console.log('------------------------------------', this.retirementSavingForm.invalid, this.isSubmitted);
    this.isSubmitted = true;
    let amount;
    // stop here if form is invalid
    if (this.retirementSavingForm.invalid) {
      return;
    }

    // console.log(this.retirementSavingForm.controls['amountsaved'].value);
    if (this.retirementSavingForm.controls['amountsaved'].value === 0 || this.retirementSavingForm.controls['amountsaved'].value === '$0') {
      amount = 0;
    } else {
      amount = parseFloat(this.retirementSavingForm.controls['amountsaved'].value.replace(/(?:,|\$)+/gi, ''));
    }

    console.log('this.retirementSavingForm', this.retirementSavingForm.controls['amountsaved'].value);
    this.retirementsavingsInfo = { amountsaved: amount, displayAmount: this.retirementSavingForm.controls['amountsaved'].value, savedPercentage : this.riskPercentage };
    const merge = Object.assign(this.createaccountInfo, this.retirementsavingsInfo);
    this.sessionStorageService.updateSessionValue('retirementSavingValue', amount);
    this.retirementsavingsInfo = merge;
    this.llRetirementSavingsService.updateRetirementSavingsInfo(this.retirementsavingsInfo);
    this.moveToRiskAssessment = true;
    this.router.navigate(['../risk-assessment'], {relativeTo : this.route.parent});
    // this.retirementSavingForm.patchValue({
    //   amountsaved: '$0',
    //   duration: 5,
    // });
    // this.parentData = 3;
    // this._router.navigate(["riskassessment"]);
  };

  getMenu(dat) {
    console.log('dat is in 3', this.parentData, dat);
  }

  getMessage(message: string) {

    if (this.parentData === message) {
      console.log('message-------------retment', message);
      // this.receivedChildMessage = message;
      this.moveToRiskAssessment = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this._router.navigate(['create-account'], {relativeTo : this.route});
  };
  getRetirementSavings() {
    console.log('called');
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getRetirementSavings().subscribe(
      (results) => {
        console.log(results);
        this.getRetirementsData = results;
        this.riskQuestion = results[0];
        this.llRetirementSavingsService.updateRetirementData(this.getRetirementsData);
        this.llRetirementSavingsService.updateRiskQuestion(this.riskQuestion);
        console.log('data', this.riskQuestion);
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (err) => {
        this.showLoader = false;
      }
    ));
  }

  ngOnDestroy() {
    this.parentData = null;
    this.retirementSavingForm = null;
    this.isSubmitted = false;
    this.retirementsavingsInfo = null;
    this.moveToRiskAssessment = false;
    this.height = null;
    this.createaccountInfo = null;
    this.riskQuestion = null;
    this.retirementSavingsAmount = null;
    this.riskPercentage = null;
    this.getRetirementsData = null;
    this.showLoader = true;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
