import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, SystemJsNgModuleLoader, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/auth.service';
import { DatePipe } from '@angular/common';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { LlYourInfoService } from './ll-yourinfo-page.service';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

import { LlSideNavService } from '@app/modules/layout/sidenav/ll-sidenav.service';
import { CustomDateParserFormatter } from '@app/shared/calendar-parser.service';
import { User } from '@app/sign-up/user.model';

@Component({
  selector: 'll-yourinfo-page',
  templateUrl: './ll-yourinfo-page.component.html',
  styleUrls: ['./ll-yourinfo-page.component.scss'],
  providers: [SystemJsNgModuleLoader, { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlYourinfoPageComponent implements OnInit {
  yourInfoForm: FormGroup;
  isSubmitted = false;
  userInfo: any = {};
  isLoading = false;
  yourInfoPage = true;
  comparingAges = false;
  parentData: any;
  ageDifference: any;
  @ViewChild('picker') picker;
  @ViewChild('pageHeight') targetElement: any;
  result: string;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  dob: any;
  minDate: any;
  maxDate: any;
  calenderFormatErrMsg = false;
  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private authAws: AuthService, private ref: ChangeDetectorRef, private moduleLoader: SystemJsNgModuleLoader, private signUpDataService: SignUpDataService, private llYourInfoService: LlYourInfoService, private router: Router, private route: ActivatedRoute, private llSideNavService: LlSideNavService, private sessionStorageService: SessionStorageService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    this.minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
    this.llSideNavService.updateSideNavValue('your-info');
  }

  ngOnInit(): void {
    let initialUserInfo: any = this.llYourInfoService.getUserInfo();
    console.log(initialUserInfo);
    this.yourInfoForm = this.formBuilder.group({
      lastname: [initialUserInfo.lastName || '', [Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      firstname: [initialUserInfo.firstName || '', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      dob: [initialUserInfo.dob || ''],
      age: [initialUserInfo.age || '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(21), Validators.max(130)]],
      retirementAge: [initialUserInfo.retirementAge || '67', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(55), Validators.max(100)]],
    });

    if (initialUserInfo.age) this.modifyAge('age');
    // Here you can use the height!
    this.result = this.height;
    this.ref.detectChanges();
    this.onChanges();
  }

  onChanges(): void {
    this.yourInfoForm.get('dob').valueChanges.subscribe((val) => {
      if (val) {
        const padYear = '0000';
        const padMonth = '00';
        this.dob = (padYear + val.year).slice(-padYear.length) + '-' + (padMonth + val.month).slice(-padMonth.length) + '-' + val.day;
        this.calculation(this.dob);
      } else {
        this.dob = '';
      }
    });
  }

  get f() {
    return this.yourInfoForm.controls;
  }

  next = () => {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.yourInfoForm.invalid || this.comparingAges || this.calenderFormatErrMsg) {
      return;
    }
    const datePipe = new DatePipe('en-IN');
    const setDob = datePipe.transform(this.dob, 'MM/dd/yyyy');
    //  console.log(setDob);
    this.userInfo = {
      firstName: this.yourInfoForm.controls['firstname'].value,
      lastName: this.yourInfoForm.controls['lastname'].value,
      age: this.yourInfoForm.controls['age'].value.toString(),
      retirementAge: this.yourInfoForm.controls['retirementAge'].value,
      dob: setDob ? setDob : '',
    };
    // console.log(this.userInfo);
    this.llYourInfoService.updateUserInfo(this.userInfo);
    this.sessionStorageService.updateSessionValue('YourInfoValue', this.userInfo);
    this.router.navigate(['signup', 'create-account']);
  };

  reOpenCalendar() {
    this.picker.open();
  }

  modifyAge(val) {
    if (val === 'age') {
      this.yourInfoForm.patchValue({
        dob: null,
        duration: 5,
      });
      if (this.yourInfoForm.value.retirementAge) {
        this.ageDifference = Number(this.yourInfoForm.value.retirementAge) - Number(this.yourInfoForm.value.age);
      }
      this.calenderFormatErrMsg = false;
    } else if (val === 'rAge' && this.yourInfoForm.value.age) {
      this.ageDifference = Number(this.yourInfoForm.value.retirementAge) - Number(this.yourInfoForm.value.age);
      this.calenderFormatErrMsg = false;
    }

    if (Number(this.yourInfoForm.value.retirementAge) < Number(this.yourInfoForm.value.age)) {
      this.comparingAges = true;
    } else {
      this.comparingAges = false;
    }
  }

  calculation(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (age) {
      this.ageDifference = Number(this.yourInfoForm.value.retirementAge) - Number(age);
    }
    if (isNaN(age)) {
      this.yourInfoForm.patchValue({
        age: '',
        duration: 5,
      });
      this.calenderFormatErrMsg = true;
    } else {
      this.yourInfoForm.patchValue({
        age: age,
        duration: 5,
      });
      this.calenderFormatErrMsg = false;
    }
  }

  getMenu(dat) {
    console.log('dat is in 1', this.parentData, dat);
  }

  getMessage(message: string) {
    // this.receivedChildMessage = message;
    console.log('message-------------yourinfo', message);
  }
}
