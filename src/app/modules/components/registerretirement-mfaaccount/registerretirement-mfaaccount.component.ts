import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';
import { interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import message from 'assets/json/en.json';
enum providerAccountStatus {
  loginProgress = 'LOGIN_IN_PROGRESS',
  userInputRequired = 'USER_INPUT_REQUIRED',
  inProgress = 'IN_PROGRESS',
  partialSuccess = 'PARTIAL_SUCCESS',
  success = 'SUCCESS',
  failed = 'FAILED',
}
@Component({
  selector: 'll-registerretirement-mfaaccount',
  templateUrl: './registerretirement-mfaaccount.component.html',
  styleUrls: ['./registerretirement-mfaaccount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterretirementMFAaccountComponent implements OnInit, AfterViewInit, OnDestroy {
  mfaForm: FormGroup = new FormGroup({});
  mfaKeys: any;
  mfaLabels = [];
  mfaAccountData: any;
  height: any;
  @ViewChild('pageHeight') targetElement: any;
  submitted = false;
  showLoader = false;
  companyInfo: any;
  yodleeErrorHandling: any;
  providerAccountStatus: any;
  checkProviderStatus: any;
  subscription: any;
  statusFailed: string;
  timeInterval: number;
  stipulatedTime: string;
  typeArr = [];
  optionsVal = [];
  loginOption = [];
  loginText = [];
  loginRadio = [];
  optionSelected: any;
  someArr = [];
  selectedRadio: any;
  mfaResponse: any;
  requestStatus: string;
  pollingThreshHold: number = 100;
  currentPollingCount: number = 0;
  displayStatus: string;
  breakPolling: boolean = false;
  formType: string;
  mfaTimeout: string;
  additionFailedStatus: any;
  timeOutError: string;
  yodleeToken: any;
  isapitoken: any;
  isusertoken: any;
  tokentime: any;
  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private commenService: CommonService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.commenService.dataEvent.subscribe((res) => {
      if (!!res) {
        this.companyInfo = res;
      }
    });
    this.commenService.mfaData.subscribe((res) => {
      if (!!res) {
        this.yodleeToken = res.headers.get('token');
        this.isapitoken = res.headers.get('isapitoken');
        this.isusertoken = res.headers.get('isusertoken');
        this.tokentime = res.headers.get('tokentime');
        this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });
        this.mfaAccountData = res.body;
        // console.log(this.mfaAccountData);
        if (this.mfaAccountData) {
          this.mfaAccount();
        }
      }
    });
  }
  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    this.ref.detectChanges();
  }

  mfaAccount() {
    if (this.mfaAccountData[0].providerAccount == undefined) {
      return;
    }
    this.mfaStatusCheck();
    this.ref.detectChanges();
    // for (let index = 0; index < this.mfaAccountData.providerAccount[0].loginForm[0].row.length; index++) {
    // const element = this.mfaAccountData.providerAccount[0].loginForm[0].row[index];
    for (let index = 0; index < this.mfaAccountData[0].providerAccount.length; index++) {
      const element = this.mfaAccountData[0].providerAccount[index];
      this.mfaKeys = element.loginForm[0].row;
      this.formType = element.loginForm[0].formType;
      this.mfaTimeout = element.loginForm[0].mfaTimeout;
    }

    for (let index = 0; index < this.mfaKeys.length; index++) {
      const element = this.mfaKeys[index];
      // console.log(element.field[0].type);
      if (element.field[0].type === 'options') {
        this.loginOption.push({ id: element.field[0].id, data: element.field[0].option, element: element });
        this.optionSelected = element.field[0].option[0].displayText;
        this.someArr.push({ id: element.field[0].id, value: this.optionSelected, element: element });
      } else if (element.field[0].type === 'text') {
        this.loginText.push({ id: element.field[0].id, data: element.field[0].option, element: element });
      } else if (element.field[0].type === 'radio') {
        this.loginRadio.push({ id: element.field[0].id, data: element.field[0].option, element: element });
      }
    }
    this.ref.detectChanges();
  }

  goBack() {
    this.router.navigate(['../register-retirement-login'], { relativeTo: this.route.parent });
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.ref.detectChanges();
    }
  }

  // next() {
  //   console.log(this.optionSelected);
  // }
  selectOption(item, id, element) {
    console.log(element);
    const filter = this.someArr.findIndex((s) => s.id === id);
    if (filter !== -1) {
      this.someArr[filter].value = item.target.value;
      this.someArr[filter].element = element.element;
    } else {
      this.someArr.push({ id: id, value: item.target.value, element: element.element });
    }
    console.log(this.someArr);
  }

  selectedRadioBtn(item, id, element) {
    const filter = this.someArr.findIndex((s) => s.id === id);
    if (filter !== -1) {
      this.someArr[filter].value = item.target.value;
      this.someArr[filter].element = element.element;
    } else {
      this.someArr.push({ id: id, value: item.target.value, element: element.element });
    }
  }

  updateText(item, id, element) {
    const filter = this.someArr.findIndex((s) => s.id === id);
    if (filter !== -1) {
      this.someArr[filter].value = item.target.value;
      this.someArr[filter].element = element.element;
    } else if (item.target.value) {
      this.someArr.push({ id: id, value: item.target.value, element: element.element });
    }
    /*    if (item.target.value) {
      this.someArr.push({ id: id, value: item.target.value, element: element.element });
    } */
    /*
    const filter = this.someArr.findIndex((s) => s.id === id);
    if (filter !== -1) {
      this.someArr[filter].value = item.target.value;
      this.someArr[filter].element = element.element;
    } else {
      this.someArr.push({ id: id, value: item.target.value, element: element.element });
    }
    */
  }

  mfaQuestionAndAnswer() {
    this.yodleeErrorHandling = '';
    this.showLoader = true;
    this.submitted = false;
    const providerArr = [];

    for (let index = 0; index < this.someArr.length; index++) {
      const element = this.someArr[index];

      providerArr.push({
        id: element.element.id,
        fieldRowChoice: element.element.fieldRowChoice,
        form: element.element.form,
        label: element.element.label,
        field: [
          {
            id: element.id,
            name: element.element.field[0].name,
            isOptional: false,
            value: element.value,
            valueEditable: 'true',
            type: element.element.field[0].type,
          },
        ],
      });
    }

    console.log(providerArr);
    const providerObj = {
      loginForm: {
        mfaTimeout: this.mfaTimeout,
        formType: this.formType,
        row: providerArr,
      },
    };
    console.log('providerObj', providerObj);
    this.displayStatus = 'LOGIN IN PROGRESS';
    const providerId = this.companyInfo.id.toString();
    this.commenService.providerAccountPut(this.mfaAccountData[0].providerAccount[0].id, providerObj).subscribe(
      (result: any) => {
        const providerAccountResponse = result.body;
        //  console.log(result);
        if (result.body.errorCode) {
          this.yodleeErrorHandling = result.body.errorMessage;
          this.showLoader = false;
          this.displayStatus = ' ';
          this.ref.detectChanges();
        } else {
          this.yodleeToken = result.headers.get('token');
          this.isapitoken = result.headers.get('isapitoken');
          this.isusertoken = result.headers.get('isusertoken');
          this.tokentime = result.headers.get('tokentime');
          this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });
          this.providerAccountStatus = providerAccountResponse[0].providerAccount[0];
          this.ref.detectChanges();
          this.getProviderStatus();
        }
        this.providerAccountStatus = providerAccountResponse[0].providerAccount[0];
        this.displayStatus = this.providerAccountStatus.status.replace(/[_-]/g, ' ');
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
        if (err) {
          this.timeOutError = message.retirementAccountTimeoutError;
        }
        this.ref.detectChanges();
      }
    );
  }

  getProviderStatus() {
    if (this.providerAccountStatus) {
      const providerStatus = {
        id: this.providerAccountStatus.id.toString(),
        requestId: this.providerAccountStatus.requestId,
      };
      this.commenService.getProviderAccountStatus(providerStatus).subscribe(
        (result: any) => {
          const providerAccountStatusResponse = result.body;
          //  console.log('result--', result, 'status--', result[0].providerAccount[0].status);
          this.yodleeToken = result.headers.get('token');
          this.isapitoken = result.headers.get('isapitoken');
          this.isusertoken = result.headers.get('isusertoken');
          this.tokentime = result.headers.get('tokentime');
          this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });
          this.checkProviderStatus = providerAccountStatusResponse[0].providerAccount[0];
          this.displayStatus = this.checkProviderStatus.status.replace(/[_-]/g, ' ');
          this.ref.detectChanges();
          if (this.checkProviderStatus.status === providerAccountStatus.failed) {
            this.breakPolling = true;
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            this.displayStatus = this.checkProviderStatus.status.replace(/[_-]/g, ' ') + '.' + ' ' + this.checkProviderStatus.dataset[0].additionalStatus.replace(/[_-]/g, ' ');
            this.showLoader = false;
            this.someArr = [];
            this.ref.detectChanges();
          } else if (this.checkProviderStatus.status === providerAccountStatus.userInputRequired) {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            this.displayStatus = '';
            this.showLoader = false;
            this.breakPolling = true;
            this.ref.detectChanges();
            this.mfaStatusCheck();
            this.commenService.mfaLoginForm(result);
          } else if (this.checkProviderStatus.status === providerAccountStatus.success) {
            this.router.navigate(['../register-retirement-account-holdings'], { relativeTo: this.route.parent });
          } else {
            this.ref.detectChanges();
            this.currentPollingCount++;
            if (this.currentPollingCount < this.pollingThreshHold) {
              setTimeout(() => {
                this.getProviderStatus();
              }, 5000);
            } else {
              this.displayStatus = 'TIME OUT';
              this.ref.detectChanges();
            }
          }
        },
        (error) => {
          this.showLoader = false;
          this.subscription.unsubscribe();
          if (error) {
            this.timeOutError = message.retirementAccountTimeoutError;
          }
          this.ref.detectChanges();
        }
      );
    }
  }

  mfaStatusCheck() {
    this.someArr = [];
    this.loginOption = [];
    this.loginText = [];
    this.loginRadio = [];
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.currentPollingCount = 0;
    this.breakPolling = false;
    this.someArr = [];
    this.loginOption = [];
    this.loginText = [];
    this.loginRadio = [];
  }
}
