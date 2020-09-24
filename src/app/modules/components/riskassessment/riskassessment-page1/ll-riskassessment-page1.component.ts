import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { LlRiskAssessmentService } from '@app/modules/components/riskassessment/riskassessment-page/ll-riskassessment-page.service';

import { LlRiskAssessment1Service } from './ll-riskassessment-page1.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page1',
  templateUrl: './ll-riskassessment-page1.component.html',
  styleUrls: ['./ll-riskassessment-page1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LlRiskassessmentPage1Component implements OnInit, OnDestroy {
  parentData: any;
  riskassessmentInfo1: any = {};
  moveToRiskAssessment2 = false;
  Amount: any;
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  selected = false;
  riskassessmentInfo: any;
  riskAnalysisArr: any;
  classes: any = {};
  amount1: number;
  amount1Val: number;
  amount2: number;
  amount2Val: number;
  amount3: number;
  amount3Val: number;
  option2 = false;
  option1 = false;
  option3 = false;
  riskForm1: FormGroup;
  submitted = false;
  riskAnaysisData: any;
  riskData1: any;
  riskData2: any;
  riskData3: any;
  selectedRiskObj: any;
  riskAnalysisArrStepTwo: any;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService,
     public formBuilder: FormBuilder,
      private commenService: CommonService, 
      private ref: ChangeDetectorRef,
      private signUpDataService :SignUpDataService,
      private sessionStorageService : SessionStorageService,
      private llRiskAssessmentService : LlRiskAssessmentService,
      private router :Router,
      private route : ActivatedRoute,
      private llRiskAssessment1Service : LlRiskAssessment1Service) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.riskassessmentInfo = this.llRiskAssessmentService.getRiskAssessmentInfo();
    this.riskAnalysisArr = this.llRiskAssessmentService.getRiskAnalysisArr();
  }

  ngOnInit(): void {
    this.parentData = 3.1;
    this.riskForm1 = this.formBuilder.group({
      select: [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1') ? this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').selectedValue : '', [Validators.required]],
    });
    console.log('risk', this.riskassessmentInfo1);
    this.riskassessmentInfo1.Amount = this.riskassessmentInfo.amountsaved;
    this.riskassessmentInfo1.displayAmount = this.riskassessmentInfo.displayAmount;
    this.getRiskAnalysisData();

    let riskAssessmentInfo1 = this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1');

    if(riskAssessmentInfo1){
      this.selAllColumn(riskAssessmentInfo1.value, riskAssessmentInfo1.selectedValue, riskAssessmentInfo1.selectedObj);
    }
  }

  get f() {
    return this.riskForm1.controls;
  }

  selAllColumn(value: Number, selectedValue, selectedObj) {
    this.selectedRiskObj = selectedObj;
    if (value === 1) {
      this.option1 = true;
      this.option2 = false;
      this.option3 = false;
    } else if (value === 2) {
      this.option2 = true;
      this.option1 = false;
      this.option3 = false;
    } else if (value === 3) {
      this.option2 = false;
      this.option1 = false;
      this.option3 = true;
    }
    this.riskForm1.controls['select'].setValue(selectedValue);
    let riskassessmentInfo1 = {
      value : value,
      selectedValue : selectedValue,
      selectedObj : selectedObj
    };

    if(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1')){
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo1', riskassessmentInfo1);
      const keyObj1 = Object.keys(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1'));
      const keyObj2 = Object.keys(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1Temp'));
      const valObj1 = Object.values(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1'));
      const valObj2 = Object.values(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1Temp'));
      console.log('SelctObj -----------------------------------', keyObj1, keyObj2, valObj1, valObj2, keyObj1 !== keyObj2 || valObj1 !== valObj2);
      if(String(keyObj1) !== String(keyObj2) || String(valObj1) !== String(valObj2)){
        this.sessionStorageService.updateSessionValue('riskAssessmentInfo1Temp', riskassessmentInfo1);
        this.sessionStorageService.updateSessionValue('riskAssessmentInfo3', null);
        this.sessionStorageService.updateSessionValue('riskAssessmentInfo2', null);
      }
    } else{
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo1', riskassessmentInfo1);
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo1Temp', riskassessmentInfo1);
    }
    this.selected = true;
    this.addClass();
  }

  addClass() {
    console.log(this.option1, this.option2);
    return {
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      thumbsup: true,
    };
  }

  next = (): void => {
    this.submitted = true;
    
    if (this.riskForm1.invalid) {
      return;
    }
    const merge = Object.assign(this.riskassessmentInfo, this.riskassessmentInfo1);
    this.riskassessmentInfo1 = merge;
    this.llRiskAssessment1Service.updateRiskAssessmentInfo1(this.riskassessmentInfo1);
    this.getRiskAssessmentAnalysisStepTwo();
    // this.saveSelectedOptionData();
    //  this.moveToRiskAssessment1 = false;
    //  this.moveToRiskAssessment2 = true;
  };

  getMenu(dat) {

  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if (this.parentData === message) {
      this.moveToRiskAssessment2 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../risk-assessment'], {relativeTo : this.route.parent});
  };

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  getRiskAnalysisData() {
    this.showLoader = true;
    console.log('this.riskAnaysisData', this.sessionStorageService.getSingleValueFromSession('riskCalculaionData'), this.riskAnalysisArr);
    this.riskAnaysisData = this.sessionStorageService.getSingleValueFromSession('riskAnalysisArr');
    this.riskData1 = this.riskAnaysisData[0];
    this.riskData1.amountX = Number(this.riskData1.amountX.toString().substr(1));
    this.amount1 = this.riskData1.amountX + this.riskData1.amountY;
    this.amount1Val = this.riskData1.amountX;

    this.riskData2 = this.riskAnaysisData[1];
    this.riskData2.amountX = Number(this.riskData2.amountX.toString().substr(1));
    this.amount2 = this.riskData2.amountX + this.riskData2.amountY;
    this.amount2Val = this.riskData2.amountX;

    this.riskData3 = this.riskAnaysisData[2];
    this.riskData3.amountX = Number(this.riskData3.amountX.toString().substr(1));
    this.amount3 = this.riskData3.amountX + this.riskData3.amountY;
    this.amount3Val = this.riskData3.amountX;
    this.showLoader = false;
  }
  getRiskAssessmentAnalysisStepTwo() {
    this.showLoader = true;
    const riskAnalysisStepTwo = {
      amount: this.riskassessmentInfo1.Amount,
      risk_value: this.riskassessmentInfo1.percentageValue,
      step_number: '2',
      selected_option: this.selectedRiskObj.riskPosition,
    };
    this.subscriptions.push(this.commenService.getRiskAssessmentAnalysisStepTwo(riskAnalysisStepTwo).subscribe(
      (results) => {
        console.log(results);
        this.riskAnalysisArrStepTwo = results;
        this.sessionStorageService.updateSessionValue('riskAnalysisArrStepTwo', this.riskAnalysisArrStepTwo);
        this.llRiskAssessment1Service.updateRiskAnalysisArrStepTwo(this.riskAnalysisArrStepTwo);
        this.moveToRiskAssessment2 = true;
        this.router.navigate(['../risk-assessment2'], {relativeTo : this.route.parent});
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
      }
    ));
  }

  saveSelectedOptionData() {
    this.showLoader = true;
    const selectedData = [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').selectedValue, this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').value, this.selectedRiskObj.riskPosition]
    this.subscriptions.push(this.commenService.updateRiskOptionsData({ selectedvalue1: JSON.stringify(selectedData) }).subscribe(
      (results) => {
        console.log(results);
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
      }
    ));
  }

  ngOnDestroy() {
    this.parentData = null;
    this.riskassessmentInfo1 = null;
    this.moveToRiskAssessment2 = false;
    this.Amount = null;
    this.height = null;
    this.selected = false;
    this.riskassessmentInfo = null;
    this.riskAnalysisArr = null;
    this.classes = null; 
    this.amount1 = null; 
    this.amount1Val = null; 
    this.amount2 = null; 
    this.amount2Val = null; 
    this.amount3 = null; 
    this.amount3Val = null; 
    this.option2 = false;
    this.option1 = false;
    this.option3 = false;
    this.riskForm1 = null;
    this.submitted = false;
    this.riskAnaysisData = null;
    this.riskData1 = null;
    this.riskData2 = null;
    this.riskData3 = null;
    this.selectedRiskObj = null;
    this.riskAnalysisArrStepTwo = null;
    this.showLoader = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
