import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { Router, ActivatedRoute } from '@angular/router';


import { LlRiskAssessment1Service } from '@app/modules/components/riskassessment/riskassessment-page1/ll-riskassessment-page1.service';

import { LlRiskAssessment2Service } from './ll-riskassessment-page2.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page2',
  templateUrl: './ll-riskassessment-page2.component.html',
  styleUrls: ['./ll-riskassessment-page2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LlRiskassessmentPage2Component implements OnInit, OnDestroy {
  parentData: any;
  riskassessmentInfo2: any = {};
  // page3Data:any;
    @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  moveToRiskAssessment3 = false;
  Amount: any;
  selected = false;
  option2 = false;
  option1 = false;
  option3 = false;
  riskassessmentInfo1: any;
  riskAnalysisArrStepTwo: any;
  classes: any = {};
  riskForm2: FormGroup;
  amount1: any;
  amount1Val: any;
  amount2: any;
  amount2Val: any;
  amount3: any;
  amount3Val: any;
  submitted = false;
  riskAnalysisStepTwoData: any;
  riskData1: any;
  riskData2: any;
  riskData3: any;
  selctedCardData: any;
  riskAnalysisArrStepThree: any;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService,
     public formBuilder: FormBuilder, private commenService: CommonService, 
     private ref: ChangeDetectorRef,
     private signUpDataService :SignUpDataService,
     private sessionStorageService: SessionStorageService,
     private llRiskAssessment1Service : LlRiskAssessment1Service,
     private router : Router,
     private route : ActivatedRoute,
     private llRiskAssessment2Service: LlRiskAssessment2Service) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.riskassessmentInfo1 = this.llRiskAssessment1Service.getRiskAssessmentInfo1();
    this.riskAnalysisArrStepTwo = this.llRiskAssessment1Service.getRiskAnalysisArrStepTwo();
    // const browserL = this.translateService.getBrowserLang();
    // this.translateService.use(browserL);
  }

  ngOnInit(): void {
    this.getRiskAnalysisData();
    this.parentData = 3.2;
    this.riskForm2 = this.formBuilder.group({
      select: [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2') ? this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').selectedValue : '', [Validators.required]],
    });
    this.riskassessmentInfo2.Amount = this.riskassessmentInfo1.amountsaved;
    this.riskassessmentInfo2.displayAmount = this.riskassessmentInfo1.displayAmount;

    let riskAssessmentInfo2 = this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2');

    if(riskAssessmentInfo2){
      this.selAllColumn(riskAssessmentInfo2.value, riskAssessmentInfo2.selectedValue, riskAssessmentInfo2.selectedObj);
    }
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  get f() {
    return this.riskForm2.controls;
  }

  next = (): void => {
    this.submitted = true;

    if (this.riskForm2.invalid) {
      return;
    }
    let merge = Object.assign(this.riskassessmentInfo2, this.riskassessmentInfo1);
    this.riskassessmentInfo2 = merge;
    this.llRiskAssessment2Service.updateRiskAssessmentInfo2(this.riskassessmentInfo2);
    this.getRiskAssessmentAnalysisStepThree();
    // this.saveSelectedOptionData();
    // this.moveToRiskAssessment2 = false;
    // this.moveToRiskAssessment3 = true;
  };

  selAllColumn(value: Number, selectedValue, selectedCardObj) {
    console.log(selectedCardObj);
    this.selctedCardData = selectedCardObj;
    // this.sessionStorageService.updateSessionValue('riskAssessmentInfo3', {});
    console.log(this.selctedCardData);
    console.log('value is:', value === 1);
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

    let riskassessmentInfo2 = {
      value : value,
      selectedValue : selectedValue,
      selectedObj : selectedCardObj
    };

    this.riskForm2.controls['select'].setValue(selectedValue);

    
    if(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2')){
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo2', riskassessmentInfo2);
      const keyObj1 = Object.keys(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2'));
      const keyObj2 = Object.keys(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2Temp'));
      const valObj1 = Object.values(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2'));
      const valObj2 = Object.values(this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2Temp'));
      console.log('SelctObj -----------------------------------', keyObj1, keyObj2, valObj1, valObj2, keyObj1 !== keyObj2 || valObj1 !== valObj2);
      if(String(keyObj1) !== String(keyObj2) || String(valObj1) !== String(valObj2)){
        this.sessionStorageService.updateSessionValue('riskAssessmentInfo2Temp', riskassessmentInfo2);
        this.sessionStorageService.updateSessionValue('riskAssessmentInfo3', null);
      } 
    } else {
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo2', riskassessmentInfo2);
      this.sessionStorageService.updateSessionValue('riskAssessmentInfo2Temp', riskassessmentInfo2);
    }

    if (selectedCardObj.riskPosition === '') {
      this.selected = false;
    } else {
      this.selected = true;
    }
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

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', message);
    if (this.parentData === message) {
      
      this.moveToRiskAssessment3 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../risk-assessment1'],{relativeTo : this.route.parent});
  };

  getRiskAnalysisData() {
    this.riskAnalysisStepTwoData = this.sessionStorageService.getSingleValueFromSession('riskAnalysisArrStepTwo');
    this.riskData1 = this.riskAnalysisStepTwoData[0];
    this.riskData1.amountX = Number(this.riskData1.amountX.toString().substr(1));
    this.amount1 = this.riskData1.amountX + this.riskData1.amountY;
    this.amount1Val = this.riskData1.amountX;

    this.riskData2 = this.riskAnalysisStepTwoData[1];
    this.riskData2.amountX = Number(this.riskData2.amountX.toString().substr(1));
    this.amount2 = this.riskData2.amountX + this.riskData2.amountY;
    this.amount2Val = this.riskData2.amountX;

    this.riskData3 = this.riskAnalysisStepTwoData[2];
    this.riskData3.amountX = Number(this.riskData3.amountX.toString().substr(1));
    this.amount3 = this.riskData3.amountX + this.riskData3.amountY;
    this.amount3Val = this.riskData3.amountX;
  }
  getRiskAssessmentAnalysisStepThree() {
    this.showLoader = true;
    const riskAnalysisStepThree = {
      amount: this.riskassessmentInfo1.Amount,
      risk_value: this.riskassessmentInfo1.percentageValue,
      step_number: '3',
      selected_option: this.selctedCardData.riskPosition,
    };
    console.log(riskAnalysisStepThree);
    this.subscriptions.push(this.commenService.getRiskAssessmentAnalysisStepThree(riskAnalysisStepThree).subscribe(
      (results) => {
        console.log(results);
        this.riskAnalysisArrStepThree = results;
        this.sessionStorageService.updateSessionValue('riskAnalysisArrStepThree', this.riskAnalysisArrStepThree);
        this.llRiskAssessment2Service.updateRiskAnalysisArrStepThree(this.riskAnalysisArrStepThree);
        this.moveToRiskAssessment3 = true;
        this.router.navigate(['../risk-assessment3'],{relativeTo : this.route.parent});
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
    const selectedData = [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').selectedValue, this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').value, this.selctedCardData.riskPosition]
    this.subscriptions.push(this.commenService.updateRiskOptionsData(JSON.stringify({selectedvalue2: JSON.stringify(selectedData)})).subscribe(
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
    this.riskassessmentInfo2 = {};
    this.height = null;
    this.supportLanguages = ['en', 'fr', 'ta', 'hi'];
    this.moveToRiskAssessment3 = false;
    this.Amount = null;
    this.selected = false;
    this.option2 = false;
    this.option1 = false;
    this.option3 = false;
    this.riskassessmentInfo1 = null;
    this.riskAnalysisArrStepTwo = null;
    this.classes = null;
    this.riskForm2 = null;
    this.amount1 = null;
    this.amount1Val = null;
    this.amount2 = null;
    this.amount2Val = null;
    this.amount3 = null;
    this.amount3Val = null;
    this.submitted = false;
    this.riskAnalysisStepTwoData = null;
    this.riskData1 = null;
    this.riskData2 = null;
    this.riskData3 = null;
    this.selctedCardData = null;
    this.riskAnalysisArrStepThree = null;
    this.showLoader = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
