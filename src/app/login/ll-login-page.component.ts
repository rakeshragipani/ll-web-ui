import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import message from 'assets/json/en.json';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { PopupComponent } from '@app/modules/components/popup/popup.component';
import { MatDialog } from '@angular/material';
import { CommonService } from '@app/shared/CommonService';
import { EncrDecrService } from '@app/shared/EncrDecrService';
import { Subscription } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'll-login',
  templateUrl: './ll-login-page.component.html',
  styleUrls: ['./ll-login-page.component.scss'],
})
export class LlLoginPageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  userNameOrPasswordErr: any;
  submitted = false;
  showLoader = false;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  public badge: 'Bottomright' | 'Bottomleft' | 'Inline' = 'Bottomright';
  public siteKey: '6LcdPvwUAAAAAFrC2WAiOkTQqxmwjMwwmYj8x3L2';
  public useGlobalDomain = false;
  captchaToken: string;
  public hidePassword = true;
  statusObj: any;
  checked: any;
  subscription: Subscription;
  verificationFailed: string;

  constructor(public formBuilder: FormBuilder, private auth: AuthService, private cd: ChangeDetectorRef, private router: Router, private reCaptchaV3Service: ReCaptchaV3Service, private sessionStorageService: SessionStorageService, public dialog: MatDialog, public commonService: CommonService, private EncrDecr: EncrDecrService) {}

  ngOnInit(): void {
    this.sessionStorageService.resetSession();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      recaptcha: [''],
    });
    this.loginForm.reset();
    const getremeberMe = localStorage.getItem('userIdentity');
    const remeberMeParser = JSON.parse(getremeberMe);
    if (getremeberMe) {
      this.checked = remeberMeParser.checked;
      this.loginForm.controls.email.setValue(this.EncrDecr.get('', remeberMeParser.userIdentityEmail));
      this.loginForm.controls.password.setValue(this.EncrDecr.get('', remeberMeParser.userIdentityPassword));
    }
  }
  get loginFormErr() {
    return this.loginForm.controls;
  }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.showLoader = true;
    // this.auth.signIn(
    //   this.loginForm.value.email,
    //   this.loginForm.value.password,
    //   (error) => {
    //     this.userNameOrPasswordErr = error.message.replace('PreAuthentication failed with error ', '');
    //     if (this.userNameOrPasswordErr === 'Password attempts has been exceeded. Please try after some time.') {
    //       this.userNameOrPasswordErr = '';
    //       this.showLoader = false;
    //       this.openDialog();
    //       this.cd.detectChanges();
    //       return;
    //     }
    //     this.showLoader = false;
    //     this.cd.detectChanges();
    //   },
    //   (success) => {
    //     const helper = new JwtHelperService();
    //     const decodedToken = helper.decodeToken(success.accessToken.jwtToken);
    //     this.sessionStorageService.updateSessionValue('token', success.accessToken.jwtToken);
    //     this.sessionStorageService.updateSessionValue('userId', success.accessToken.payload.sub);
    //     this.sessionStorageService.updateSessionValue('login_time', new Date().toISOString());
    //     // this.executeCaptcha();
    //     this.cd.detectChanges();
    //     this.getUserStatus();
    //   }
    // );

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.pKey);
    var encrypted = encrypt.encrypt(this.loginForm.value.password);
    // console.log(encrypted);

    this.subscription = this.commonService.signIn({ email: this.loginForm.value.email, password: encrypted }).subscribe((payload) => {
      console.log('payload', payload);
      if (payload['error'] === null) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(payload['detail']['accessToken'].jwtToken);
        this.sessionStorageService.updateSessionValue('token', payload['detail']['accessToken'].jwtToken);
        this.sessionStorageService.updateSessionValue('userId', payload['detail']['accessToken'].payload.sub);
        this.sessionStorageService.updateSessionValue('login_time', new Date().toISOString());
        // this.executeCaptcha();
        this.cd.detectChanges();
        this.getUserStatus();
      } else {
        this.userNameOrPasswordErr = payload['detail'].replace('PreAuthentication failed with error ', '');
        if (this.userNameOrPasswordErr === 'Password attempts has been exceeded. Please try after some time.') {
          this.userNameOrPasswordErr = '';
          this.showLoader = false;
          this.openDialog();
          this.cd.detectChanges();
          return;
        }
        this.showLoader = false;
        this.cd.detectChanges();
      }
    });
  }

  getUserStatus() {
    this.commonService.getUserData().subscribe(
      (response) => {
        this.statusObj = response[0];
        // console.log(this.statusObj);
        this.sessionStorageService.updateSessionValue('status', this.statusObj.status);
        if ((this.statusObj && this.statusObj.status === 'Pending') || this.statusObj.status === 'Failed') {
          this.executeCaptcha();
          this.router.navigate(['/dashboard']);
          this.emailAttemptsDialog(this.statusObj);
          this.showLoader = false;
          this.cd.detectChanges();
        } else {
          this.executeCaptcha();
          this.showLoader = false;
          this.cd.detectChanges();
        }
      },
      (error) => {
        console.log('err', error);
        this.showLoader = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: '500px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: { incorrectPassword: message.IncorrectPasswordAttempts },
    });
  }
  emailAttemptsDialog(profileData) {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: '500px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: { loginThreeAttempts: message.LoginThreeEmailAttempts, userStatus: profileData },
    });
  }
  // handleSuccess(e) {
  //   console.log('ReCaptcha', e);
  // }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cd.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    console.log(this.captchaSuccess, this.captchaIsExpired);
    this.cd.detectChanges();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cd.detectChanges();
  }

  executeCaptcha() {
    this.showLoader = true;
    this.reCaptchaV3Service.execute(
      this.siteKey,
      'homepage',
      (token) => {
        this.captchaToken = token;
        if (this.captchaToken) {
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
          this.submitted = false;
          this.showLoader = false;
        }
      },
      {
        useGlobalDomain: false,
      }
    );
  }
  rememberUser(event) {
    if (event.target.checked && this.loginForm.value.email && this.loginForm.value.password) {
      const rememberMeObj = { userIdentityEmail: this.EncrDecr.set('', this.loginForm.value.email), userIdentityPassword: this.EncrDecr.set('', this.loginForm.value.password), checked: event.target.checked };
      localStorage.setItem('userIdentity', JSON.stringify(rememberMeObj));
    } else {
      localStorage.removeItem('userIdentity');
    }
  }

  ngOnDestroy() {
    this.loginForm = null;
    this.userNameOrPasswordErr = null;
    this.submitted = false;
    this.showLoader = false;
    this.captchaIsLoaded = false;
    this.captchaSuccess = false;
    this.captchaIsExpired = false;
    this.captchaResponse = null;
    this.useGlobalDomain = false;
    this.captchaToken = null;
    this.hidePassword = true;
    this.statusObj = null;
    this.checked = null;
    this.verificationFailed = '';
    // unsubscribe to ensure no memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
