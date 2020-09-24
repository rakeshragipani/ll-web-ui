import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/auth.service';
import message from 'assets/json/en.json';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm: FormGroup;
  public hideNewPassword = true;
  public submitted = false;
  public hideConfirmPassword = true;
  mismatchPassword: string;
  invalidCode: string;
  succesfulPassword: string;
  showLoader = false;
  format = /.*(.)\1\1\1/;
  subscriptions: Subscription[] = []

  constructor(public formBuilder: FormBuilder, public router: Router, private auth: AuthService, private activityHistroyService: ActivityHistroyService, private cd: ChangeDetectorRef, public commonService: CommonService, private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#%^&*\-+=])[A-Za-z\d~!@#%^&*\-+=]{8,80}$/)]],
      ConfirmNewPassword: ['', [Validators.required]],
    });
  }
  get resetPasswordError() {
    return this.resetPasswordForm.controls;
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
  resetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid || this.test(this.resetPasswordForm.value.newPassword)) {
      return;
    } else if (this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.ConfirmNewPassword) {
      return (this.mismatchPassword = 'Password’s do not match.');
    }
    this.showLoader = true;
    // this.auth.confirmPassword(
    //   this.resetPasswordForm.value.verificationCode,
    //   this.resetPasswordForm.value.ConfirmNewPassword,
    //   (error) => {
    //     if (error.message === message.PasswordPolicy) {
    //       this.invalidCode = message.PasswordPolicy;
    //     } else if (error.message === message.ExccedAttempts) {
    //       this.invalidCode = message.ExccedAttempts;
    //     } else {
    //       this.invalidCode = message.InvalidCode;
    //     }
    //     this.showLoader = false;
    //     this.cd.detectChanges();
    //   },
    //   (success) => {
    //     this.succesfulPassword = message.SuccesfulPassword;
    //     this.activityHistroy();
    //     setTimeout(() => {
    //       this.router.navigate(['/login']);
    //     }, 4000);
    //     this.showLoader = false;
    //     this.cd.detectChanges();
    //   }
    // );
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.pKey);
    var encrypted = encrypt.encrypt(this.resetPasswordForm.value.ConfirmNewPassword);
    
    this.subscriptions.push(this.commonService.confirmPassword({email: history.state.data.email, verificationCode: this.resetPasswordForm.value.verificationCode, newPassword: encrypted }).subscribe(payload => {
      console.log('payload', payload);
      if (payload['error'] === null) {
        this.succesfulPassword = message.SuccesfulPassword;
        this.sessionStorageService.updateSessionValue('userId', payload['detail']['cognito_username']);
        this.activityHistroy();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
        this.showLoader = false;
        this.cd.detectChanges();
      } else {
        if (payload['detail'] === message.PasswordPolicy) {
          this.invalidCode = message.PasswordPolicy;
        } else if (payload['detail'] === message.ExccedAttempts) {
          this.invalidCode = message.ExccedAttempts;
        } else {
          this.invalidCode = message.InvalidCode;
        }
        this.showLoader = false;
        this.cd.detectChanges();
      }
    }));
  }
  activityHistroy() {
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.login, ActivityHistoryEventTypeEnums.changePassword);
  }

  ngOnDestroy() {
    this.resetPasswordForm = null;
    this.hideNewPassword = true;
    this.submitted = false;
    this.hideConfirmPassword = true;
    this.mismatchPassword = null;
    this.invalidCode = null;
    this.succesfulPassword = null;
    this.showLoader = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
