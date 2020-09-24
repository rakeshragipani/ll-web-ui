import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { SessionStorageService } from '@app/shared/session-storage.service';
import messages from 'assets/json/en.json';

import { Router, ActivatedRoute } from '@angular/router';

import { LlYourInfoService } from '@app/modules/components/yourinfo/ll-yourinfo-page.service';
import { CommonService } from '@app/shared/CommonService';
import { LlCreateAccountService } from './ll-createaccount-page.service';
import { Subscription } from 'rxjs';
import { LlSideNavService } from '@app/modules/layout/sidenav/ll-sidenav.service';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { environment } from '@env/environment';
declare var $: any;

@Component({
  selector: 'll-createaccount-page',
  templateUrl: './ll-createaccount-page.component.html',
  styleUrls: ['./ll-createaccount-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal],
})
export class LlCreateaccountPageComponent implements OnInit, OnDestroy {
  parentData: any;
  loginForm: FormGroup;
  closeResult: string;
  createaccountInfo: any = {};
  checked = false;
  pValue: any = 'password';
  cValue: any = 'password';
  myOptions: any = {};
  userInfo: {};
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  submitted = false;
  passwordType = 'password';
  errMsg: any;
  userNameOrPasswordErr: any;
  regErrMsg: string;
  format = /.*(.)\1\1\1/;
  showLoader = false;
  subscription: Subscription;
  constructor(config: NgbModalConfig, private modalService: NgbModal, public formBuilder: FormBuilder, private translateService: TranslateService, private auth: AuthService, private ref: ChangeDetectorRef, private signUpDataService: SignUpDataService, private sessionStorageService: SessionStorageService, private llYourInfoService: LlYourInfoService, private router: Router, private route: ActivatedRoute, private llCreateAccountService: LlCreateAccountService, private llSideNavService: LlSideNavService, private activityHistroyService: ActivityHistroyService, private commonService: CommonService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.userInfo = this.llYourInfoService.getUserInfo();
    console.log(this.userInfo);
    const browserL = this.translateService.getBrowserLang();
    this.translateService.use(browserL);
    config.backdrop = 'static';
    config.keyboard = false;
    this.llSideNavService.updateSideNavValue('create-account');
  }

  ngOnInit(): void {
    this.parentData = 1;
    this.createaccountInfo = this.userInfo;
    $('[data-toggle="tooltip"]').tooltip();
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#%^&*\-+=])[A-Za-z\d~!@#%^&*\-+=]{8,80}$/)]],
        confirmpassword: ['', Validators.required],
      },
      {
        validator: this.validatePasswordMatching('password', 'confirmpassword'),
      }
    );
  }

  validatePasswordMatching(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get formError() {
    return this.loginForm.controls;
  }

  toggleShow() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  test(val) {
    const integer = ['0123', '1234', '2345', '3456', '4567', '5678', '6789', '3210', '4321', '5432', '6543', '7654', '8765', '9876'];
    const characters = ['ABCD', 'BCDE', 'CDEF', 'DEFG', 'EFGH', 'FGHI', 'GHIJ', 'HIJK', 'IJKL', 'JKLM', 'KLMN', 'LMNO', 'MNOP', 'NOPQ', 'OPQR', 'PQRS', 'QRST', 'RSTU', 'STUV', 'TUVW', 'UVWX', 'VWXY', 'WXYZ', 'abcd', 'bcde', 'cdef', 'defg', 'efgh', 'fghi', 'ghij', 'hijk', 'ijkl', 'jklm', 'klmn', 'lmno', 'mnop', 'nopq', 'opqr', 'pqrs', 'qrst', 'rstu', 'stuv', 'tuvw', 'uvwx', 'vwxy', 'wxyz'];

    for (const valI of integer) {
      if (val.includes(valI) !== false) {
        return true;
      }

      for (const valC of characters) {
        if (val.includes(valC) !== false) {
          return true;
        }
      }
    }

    if (this.format.test(val)) {
      return true;
    }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.router.navigate(['signup', 'risk']);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  next(popupContent) {
    this.submitted = true;
    if (this.loginForm.invalid || this.test(this.loginForm.value.password)) {
      return;
    }
    const userInfoObj = Object.assign(this.createaccountInfo, { email: this.loginForm.controls['email'].value, state: 'signedup' });
    this.sessionStorageService.updateSessionValue('YourInfoValue', userInfoObj);

    this.auth.getUserName(userInfoObj);
    this.llCreateAccountService.updateCreateAccountInfo(userInfoObj);
    this.signUp(popupContent); // AWS SignUp Method
  }

  signUp(popupContent) {
    this.showLoader = true;

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.pKey);
    var encrypted = encrypt.encrypt(this.loginForm.value.confirmpassword);
    // console.log(encrypted);

    const postData = {
      name: this.userInfo['firstName'] + ' ' + this.userInfo['lastName'],
      email: this.loginForm.value.email,
      password: encrypted,
      given_name: this.userInfo['firstName'],
      family_name: this.userInfo['lastName'],
      date_of_birth: this.userInfo['dob'],
      age: this.userInfo['age'].toString(),
      retirement_age: this.userInfo['retirementAge'],
    };
    this.subscription = this.commonService.signUp(postData).subscribe((payload) => {
      console.log('payload', payload);
      if (payload['errorType']) {
        if (payload['errorMessage'] === 'An account with the given email already exists.') {
          this.regErrMsg = messages.EmailExists;
        } else {
          this.errMsg = payload['errorMessage'];
        }
        this.showLoader = false;
        this.ref.detectChanges();
      } else {
        this.sessionStorageService.updateSessionValue('userId', payload);
        this.open(popupContent);
        this.activityHistroy();
        this.showLoader = false;
        this.ref.detectChanges();
      }
    });
    // this.auth.signUp(this.createaccountInfo.name, this.loginForm.value.email, this.loginForm.value.confirmpassword, (err, result) => {
    //   if (err) {
    //     if (err.message === 'An account with the given email already exists.') {
    //       this.regErrMsg = messages.EmailExists;
    //     } else {
    //       this.errMsg = err.message;
    //     }
    //     this.showLoader = false;
    //     this.ref.detectChanges();
    //   } else {
    //     this.sessionStorageService.updateSessionValue('userId', result.userSub);
    //     this.open(popupContent);
    //     this.activityHistroy();
    //     this.showLoader = false;
    //     this.ref.detectChanges();
    //   }
    // });
  }

  getMenu(dat) {}

  getMessage(message: string) {}

  goBack = (): void => {
    this.router.navigate(['signup', 'your-info']);
  };

  activityHistroy() {
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.signUp, ActivityHistoryEventTypeEnums.signup);
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.emailId, ActivityHistoryEventTypeEnums.emailVerificationLink);
  }

  ngOnDestroy() {
    this.parentData = null;
    this.loginForm = null;
    this.closeResult = null;
    this.createaccountInfo = null;
    this.checked = false;
    this.pValue = null;
    this.cValue = null;
    this.myOptions = null;
    this.userInfo = null;
    this.targetElement = null;
    this.height = null;
    this.submitted = false;
    this.passwordType = null;
    this.errMsg = null;
    this.userNameOrPasswordErr = null;
    this.regErrMsg = null;
    this.showLoader = false;

    // unsubscribe to ensure no memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
