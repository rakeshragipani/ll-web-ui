import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { LlRiskAssessment2Service } from '@app/modules/components/riskassessment/riskassessment-page2/ll-riskassessment-page2.service';

import { LlRiskAssessment3Service } from './ll-riskassessment-page3.service';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page3',
  templateUrl: './ll-riskassessment-page3.component.html',
  styleUrls: ['./ll-riskassessment-page3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LlRiskassessmentPage3Component implements OnInit, OnDestroy {
  parentData: any;
  riskassessmentInfo3: any = {};
  // page3Data:any;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  moveToRiskAssessment5 = false;
  Amount: any;
  selected = false;
  option2 = false;
  option1 = false;
  riskassessmentInfo2: any;
  riskAnalysisArrStepThree: any;
  riskForm3: FormGroup;
  amount1: any;
  amount1Val: any;
  amount2: any;
  amount2Val: any;
  submitted = false;
  riskAnalysisStepThreeData: any;
  riskData1: any;
  riskData2: any;
  selctedCardData: any;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService, public formBuilder: FormBuilder, private commenService: CommonService, private ref: ChangeDetectorRef, private signUpDataService: SignUpDataService, private sessionStorageService: SessionStorageService, private llRiskAssessment2Service: LlRiskAssessment2Service, private router: Router, private route: ActivatedRoute, private llRiskAssessment3Service: LlRiskAssessment3Service, private activityHistroyService: ActivityHistroyService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.riskassessmentInfo2 = this.llRiskAssessment2Service.getRiskAssessmentInfo2();
    this.riskAnalysisArrStepThree = this.llRiskAssessment2Service.getRiskAnalysisArrStepThree();
    // const browserL = this.translateService.getBrowserLang();
    // this.translateService.use(browserL);
  }

  ngOnInit(): void {
    this.getRiskAnalysisData();
    this.parentData = 3.3;
    this.riskForm3 = this.formBuilder.group({
      select: [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3') ? this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').selectedValue : '', [Validators.required]],
    });
    console.log('riskassessmentInfo2', this.riskassessmentInfo2);
    this.riskassessmentInfo3.Amount = this.riskassessmentInfo2.amountsaved;
    this.riskassessmentInfo3.displayAmount = this.riskassessmentInfo2.displayAmount;

    let riskAssessmentInfo3 = this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3');

    if (riskAssessmentInfo3) {
      this.selAllColumn(riskAssessmentInfo3.value, riskAssessmentInfo3.selectedValue, riskAssessmentInfo3.selectedObj);
    }
  }

  get f() {
    return this.riskForm3.controls;
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  next = (): void => {
    this.submitted = true;

    if (this.riskForm3.invalid) {
      return;
    }
    let merge = Object.assign(this.riskassessmentInfo2, this.riskassessmentInfo3);
    this.riskassessmentInfo3 = merge;
    this.llRiskAssessment3Service.updateRiskAssessmentInfo3(this.riskassessmentInfo3);
    this.sendAnalysisScore();
    // this.saveSelectedOptionData();
    // this.moveToRiskAssessment3 = false;
    // this.moveToRiskAssessment5 = true;
  };

  selAllColumn(value: Number, selectedValue, selctedCardObj) {
    this.selctedCardData = selctedCardObj;
    console.log(selctedCardObj);
    console.log('value is:', value === 1);
    if (value === 1) {
      this.option1 = true;
      this.option2 = false;
    } else if (value === 2) {
      this.option2 = true;
      this.option1 = false;
    }

    let riskassessmentInfo3 = {
      value: value,
      selectedValue: selectedValue,
      selectedObj: selctedCardObj,
    };

    this.sessionStorageService.updateSessionValue('riskAssessmentInfo3', riskassessmentInfo3);

    this.riskForm3.controls['select'].setValue(selectedValue);
    this.selected = true;
    this.addClass();
  }

  addClass() {
    console.log(this.option1, this.option2);
    return {
      'last-page-option1': this.option1,
      'last-page-option2': this.option2,
      thumbsup: true,
    };
  }

  getMenu(dat) { }

  getMessage(message: string) {
    console.log('message-------------retment', message);
    if (this.parentData === message) {
      this.moveToRiskAssessment5 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../risk-assessment2'], { relativeTo: this.route.parent });
  };

  getRiskAnalysisData() {
    this.riskAnalysisStepThreeData = this.sessionStorageService.getSingleValueFromSession('riskAnalysisArrStepThree');
    this.riskData1 = this.riskAnalysisStepThreeData[0];
    this.riskData1.amountX = Number(this.riskData1.amountX.toString().substr(1));
    this.amount1 = this.riskData1.amountX + this.riskData1.amountY;
    this.amount1Val = this.riskData1.amountX;

    this.riskData2 = this.riskAnalysisStepThreeData[1];
    this.riskData2.amountX = Number(this.riskData2.amountX.toString().substr(1));
    this.amount2 = this.riskData2.amountX + this.riskData2.amountY;
    this.amount2Val = this.riskData2.amountX;
  }
  
  sendAnalysisScore() {
    this.showLoader = true;
    const sendAnalysisScore = {
      selected_option: this.selctedCardData.riskPosition,
      risk_value: this.riskassessmentInfo2.percentageValue,
      amount: this.riskassessmentInfo2.Amount,
      retirement_age: this.sessionStorageService.getSingleValueFromSession('YourInfoValue') ? this.sessionStorageService.getSingleValueFromSession('YourInfoValue').retirementAge : '',
      age: this.sessionStorageService.getSingleValueFromSession('YourInfoValue') ? this.sessionStorageService.getSingleValueFromSession('YourInfoValue').age : '',
      finaloptions: JSON.stringify({
        question1: { selectedValue: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').selectedValue, value: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').value, stepNumber: 1, optionSelected: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo1').selectedObj.riskPosition },
        question2: { selectedValue: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').selectedValue, value: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').value, stepNumber: 2, optionSelected: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo2').selectedObj.riskPosition },
        question3: { selectedValue: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').selectedValue, value: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').value, stepNumber: 3, optionSelected: this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').selectedObj.riskPosition },
      }),
    };

    this.subscriptions.push(this.commenService.sendAnalysisScore(sendAnalysisScore).subscribe(
      (results) => {
        console.log(results);
        this.activityHistroy();
        this.moveToRiskAssessment5 = true;
        // this.router.navigate(['../risk-assessment5'], {relativeTo : this.route.parent});
        this.saveRiskAnswer();
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
      }
    ));
  }

  saveRiskAnswer() {
    this.showLoader = true;
    this.subscriptions.push(this.commenService.saveRiskassessment(this.sessionStorageService.getSingleValueFromSession('retirementSaving')).subscribe(
      (results) => {
        this.showLoader = false;
        const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
        updateData.state = "riskanalyzed";
        this.sessionStorageService.updateSessionValue('YourInfoValue', updateData);
        this.router.navigate(['../risk-assessment5'], { relativeTo: this.route.parent });
      },
      (err) => {
        this.showLoader = false;
      }
    ));
  }

  saveSelectedOptionData() {
    this.showLoader = true;
    const selectedData = [this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').selectedValue, this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo3').value, this.selctedCardData.riskPosition];
    this.subscriptions.push(this.commenService.updateRiskOptionsData(JSON.stringify({ selectedvalue3: JSON.stringify(selectedData) })).subscribe(
      (results) => {
        console.log(results);
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
      }
    ));
  }

  activityHistroy() {
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.riskAnalysis, ActivityHistoryEventTypeEnums.updatedRiskLevelScore);
  }

  ngOnDestroy() {
    this.parentData = null;
    this.moveToRiskAssessment5 = false;
    this.showLoader = false;
    this.riskassessmentInfo3 = null;
    this.height = null;
    // page3Data:any;
    this.moveToRiskAssessment5 = false;
    this.Amount = null;
    this.selected = false;
    this.option2 = false;
    this.option1 = false;
    this.riskassessmentInfo2 = null;
    this.riskAnalysisArrStepThree = null;
    this.riskForm3 = null;
    this.amount1 = null;
    this.amount1Val = null;
    this.amount2 = null;
    this.amount2Val = null;
    this.submitted = false;
    this.riskAnalysisStepThreeData = null;
    this.riskData1 = null;
    this.riskData2 = null;
    this.selctedCardData = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
