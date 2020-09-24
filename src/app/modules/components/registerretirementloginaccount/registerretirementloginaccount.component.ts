import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EncrDecrService } from '@app/shared/EncrDecrService';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@app/shared/CommonService';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { interval, timer, Subscription } from 'rxjs';
import { SessionStorageService } from '@app/shared/session-storage.service';
import message from 'assets/json/en.json';

declare function compute(mode: string, publicKey: string, input: string): any;
import { environment } from '@env/environment';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
enum providerAccountStatus {
  loginProgress = 'LOGIN_IN_PROGRESS',
  userInputRequired = 'USER_INPUT_REQUIRED',
  inProgress = 'IN_PROGRESS',
  partialSuccess = 'PARTIAL_SUCCESS',
  success = 'SUCCESS',
  failed = 'FAILED',
}
@Component({
  selector: 'registerretirementloginaccount',
  templateUrl: './registerretirementloginaccount.component.html',
  styleUrls: ['./registerretirementloginaccount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterRetirementLoginAccount implements OnInit, AfterViewInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  private publicKey = '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhs/AtOUOKWkQROxWMCtPOsPyei4oO2vejJZKT0I8+9A7WNnR9GuyamiP53odO5ek15zSWHrzxk6FlJkoYOyybrIsyv89jF9/chXcJe/xPybdw78irPV5OvEzT9J2L4BQaYIo7cXCBK7cqZ3MrmS4zHcVYrbi0fzBfzlg51Lzmksk1JI4Pv9QlIoAmdpTqNEwF83ON0EQ5+fDGhLW/ZPfKCuzM+UT4pTQB8s8D8qAjBZ+KLWdvI1xMGiLO/gHfVPFu7cDdV5mhFrgA1tTHomvhe+AqixM+sXku0hjGEG7SxQgny4CWCajJ/nFnQAdmAFHJTF5MTeECmHkFZBehRgI/wIDAQAB\r\n-----END PUBLIC KEY-----';
  parentData: any;
  private keyAlias = '10182019_1:';
  submitted = false;
  public companyInfo: any;
  moveToRegisterRetirementPlan = false;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  provider: any;
  providerKeys: any;
  keysArr = [];
  providerLabels = [];
  showLoader = false;
  breakPolling = false;
  providerAccountStatus: any;
  subscription: any;
  checkProviderStatus: any;
  statusFailed: string;
  yodleeErrorHandling: any;
  timeInterval: number;
  stipulatedTime: string;
  yodleeServerError: string;
  checkBox: string;
  timeOutError: string;
  pollingThreshHold = 100;
  currentPollingCount = 0;
  displayStatus: string;
  subscriptions: Subscription[] = [];
  yodleeToken: any;
  isapitoken: any;
  isusertoken: any;
  tokentime: any;

  constructor(private commenService: CommonService, public formBuilder: FormBuilder, private EncrDecr: EncrDecrService, private translateService: TranslateService, private service: CommonService, private ref: ChangeDetectorRef, private signUpDataService: SignUpDataService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private sessionStorageService: SessionStorageService, private activityHistory: ActivityHistroyService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    const browserL = this.translateService.getBrowserLang();
    this.translateService.use(browserL);
    this.subscriptions.push(
      this.service.dataEvent.subscribe((res) => {
        if (res) {
          this.companyInfo = res;
        }
      })
    );
  }
  ngOnInit(): void {
    this.parentData = 4.2;
    this.getProviderId();
  }
  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    this.ref.detectChanges();
  }
  get formError() {
    return this.loginForm.controls;
  }

  getProviderId() {
    this.showLoader = true;
    let providerId;
    if (this.companyInfo) {
      providerId = this.companyInfo.id.toString();
    }
    let loginDetails: any;
    if (localStorage.getItem(this.companyInfo.name)) {
      loginDetails = JSON.parse(localStorage.getItem(this.companyInfo.name));
      this.checkBox = loginDetails['checked'];
    }
    this.subscriptions.push(
      this.commenService.getProviderId(providerId).subscribe(
        (response: any) => {
          this.provider = response.body;
          this.yodleeToken = response.headers.get('token');
          this.isapitoken = response.headers.get('isapitoken');
          this.isusertoken = response.headers.get('isusertoken');
          this.tokentime = response.headers.get('tokentime');
          this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });
          for (let index = 0; index < this.provider.provider.length; index++) {
            const element = this.provider.provider[index];
            this.providerKeys = element.loginForm[0].row;
          }
          for (let index = 0; index < this.providerKeys.length; index++) {
            const element = this.providerKeys[index];
            this.keysArr.push(element.field[0].id);
            this.providerLabels.push(element.label);
          }
          const controls = {};
          for (const key of this.keysArr) {
            controls[key] = new FormControl(loginDetails ? loginDetails[key] : '', Validators.required);
          }
          this.loginForm = this.fb.group(controls);
          this.showLoader = false;
          this.ref.detectChanges();
        },
        (error) => {
          if (error) {
            this.timeOutError = message.retirementAccountTimeoutError;
            this.showLoader = false;
            this.ref.detectChanges();
          }
        }
      )
    );
  }

  next() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.showLoader = true;
    this.ref.detectChanges();
    this.submitted = false;
    const providerArr = [];
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.pKey);
    for (let index = 0; index < this.providerKeys.length; index++) {
      const element = this.providerKeys[index];
      providerArr.push({
        field: [
          {
            id: element.field[0].id,
            value: encrypt.encrypt(this.loginForm.value[element.field[0].id]),
          },
        ],
      });
    }

    const providerLoginObj = {
      loginForm: {
        row: providerArr,
      },
    };
    //  console.log(providerLoginObj);
    const providerObj = {
      loginForm: providerLoginObj,
    };
    const providerId = this.companyInfo.id.toString();
    this.showLoader = true;
    this.ref.detectChanges();
    this.displayStatus = 'LOGIN IN PROGRESS';
    this.subscriptions.push(
      this.commenService.providerAccount(providerId, providerLoginObj).subscribe(
        (result: any) => {
          const providerAccountResponse = result.body;
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
            this.displayStatus = this.providerAccountStatus.status.replace(/[_-]/g, ' ');
            this.ref.detectChanges();
            this.sessionStorageService.updateSessionValue('providerAccountDetails', {
              providerDetails: this.providerAccountStatus,
            });
            this.getProviderStatus();
          }
        },
        (err) => {
          console.log(err);
          this.showLoader = false;
          if (err) {
            this.timeOutError = message.retirementAccountTimeoutError;
          }
          this.ref.detectChanges();
        }
      )
    );
  }

  getProviderStatus() {
    if (this.providerAccountStatus) {
      const providerStatus = {
        id: this.providerAccountStatus.id.toString(),
        requestId: this.providerAccountStatus.requestId,
      };
      this.displayStatus = 'LOGIN IN PROGRESS';
      this.subscriptions.push(
        this.commenService.getProviderAccountStatus(providerStatus).subscribe(
          (result: any) => {
            this.commenService.mfaLoginForm(result);
            const providerAccountStatusResponse = result.body;
            this.yodleeToken = result.headers.get('token');
            this.isapitoken = result.headers.get('isapitoken');
            this.isusertoken = result.headers.get('isusertoken');
            this.tokentime = result.headers.get('tokentime');
            this.commenService.yodleeKeys({ token: this.yodleeToken, isapitoken: this.isapitoken, isusertoken: this.isusertoken, tokentime: this.tokentime });
            this.checkProviderStatus = providerAccountStatusResponse[0].providerAccount[0];
            this.displayStatus = this.checkProviderStatus.status.replace(/[_-]/g, ' ');
            this.ref.detectChanges();
            if (this.checkProviderStatus.status === providerAccountStatus.failed) {
              if (this.subscription) {
                this.subscription.unsubscribe();
              }
              this.showLoader = false;
              this.displayStatus = this.checkProviderStatus.status.replace(/[_-]/g, ' ') + '.' + ' ' + this.checkProviderStatus.dataset[0].additionalStatus.replace(/[_-]/g, ' ');
              this.ref.detectChanges();
            } else if (this.checkProviderStatus.status === providerAccountStatus.userInputRequired) {
              this.showLoader = false;
              this.router.navigate(['../register-retirement-mfa-login'], { relativeTo: this.route.parent });
            } else if (this.checkProviderStatus.status === providerAccountStatus.success) {
              this.router.navigate(['../register-retirement-account-holdings'], { relativeTo: this.route.parent });
              this.showLoader = false;
              this.moveToRegisterRetirementPlan = true;
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
            this.yodleeServerError = message.YodleeError;
            this.ref.detectChanges();
          }
        )
      );
    }
  }

  goBack() {
    this.router.navigate(['../company-retirement-account'], { relativeTo: this.route.parent });
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  rememberUser(event) {
    if (event.target.checked) {
      const loginDetails = { ...this.loginForm.value, checked: event.target.checked };
      localStorage.setItem(this.companyInfo.name, JSON.stringify(loginDetails));
    } else {
      localStorage.removeItem(this.companyInfo.name);
    }
  }

  ngOnDestroy() {
    this.loginForm = null;
    this.publicKey = null;
    this.parentData = null;
    this.keyAlias = null;
    this.submitted = false;
    this.companyInfo = null;
    this.moveToRegisterRetirementPlan = false;
    this.targetElement = null;
    this.height = 0;
    this.provider = null;
    this.providerKeys = null;
    this.keysArr = [];
    this.providerLabels = null;
    this.showLoader = false;
    this.breakPolling = false;
    this.providerAccountStatus = null;
    this.subscription = null;
    this.checkProviderStatus = null;
    this.statusFailed = null;
    this.timeInterval = null;
    this.stipulatedTime = null;
    this.yodleeServerError = null;
    this.checkBox = null;
    this.timeOutError = null;
    this.pollingThreshHold = 100;
    this.currentPollingCount = 0;
    this.displayStatus = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
