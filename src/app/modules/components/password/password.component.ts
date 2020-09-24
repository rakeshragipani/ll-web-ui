import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/auth.service';
import message from 'assets/json/en.json';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  submitted = false;
  usernotFound: string;
  verificationCode: string;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(public formBuilder: FormBuilder, private router: Router, private auth: AuthService, private cd: ChangeDetectorRef, private activityHistroyService: ActivityHistroyService, private commonService: CommonService, private sessionStorageService: SessionStorageService) {
    //  this.activityHistroy();
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  get passwordFormError() {
    return this.passwordForm.controls;
  }
  resetPassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.showLoader = true;
    // this.auth.resetPassword(
    //   this.passwordForm.value.email,
    //   (error) => {
    //     if (error.message === message.ExccedAttempts) {
    //       this.usernotFound = error.message;
    //     } else if (error) {
    //       this.usernotFound = message.UsernotFound;
    //     }
    //     this.showLoader = false;
    //     this.cd.detectChanges();
    //   },
    //   (success) => {
    //     console.log(success);
    //     this.verificationCode = message.VerificationCode;
    //     this.activityHistroy();
    //     setTimeout(() => {
    //       this.router.navigate(['/reset-password']);
    //     }, 4000);
    //     this.showLoader = false;
    //     this.cd.detectChanges();
    //   }
    // );

    this.subscriptions.push(this.commonService.resetPassword({email: this.passwordForm.value.email}).subscribe(payload => {
      console.log('payload', payload);
      if (payload['error'] === null) {
        this.verificationCode = message.VerificationCode;
        this.sessionStorageService.updateSessionValue('userId', payload['detail']['cognito_username']);
        this.activityHistroy();
        setTimeout(() => {
          this.router.navigate(['/reset-password'], {state: {data: {email: this.passwordForm.value.email} }});
        }, 4000);
        this.showLoader = false;
        this.cd.detectChanges();
      } else{
        if (payload['detail'] === message.ExccedAttempts) {
          this.usernotFound = payload['detail'];
        } else if (payload) {
          this.usernotFound = message.UsernotFound;
        }
        this.showLoader = false;
        this.cd.detectChanges();
      }
    }));
  }

  activityHistroy() {
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.login, ActivityHistoryEventTypeEnums.forgotPasswordVerificationCode);
  }

  ngOnDestroy() {
    this.passwordForm = null;
    this.submitted = false;
    this.usernotFound = null;
    this.verificationCode = null;
    this.showLoader = false;

    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
