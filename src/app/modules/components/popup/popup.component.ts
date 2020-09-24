import { Component, OnInit, ChangeDetectionStrategy, Optional, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthService } from '@app/shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/CommonService';
import messages from 'assets/json/en.json';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { state } from '@angular/animations';

@Component({
  selector: "ll-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
  errMesg: string;
  errorType: string;
  paymentSuccess: string;
  incorrectPassword: string;
  pointThree: string;
  pointTwo: string;
  pointOne: string;
  loginThreeAttempts: string;
  modifyEmailaws: string;
  modifyEmailForm: FormGroup;
  submitted = false;
  userStatus: any;
  emailChanged: string;
  emailVerifyLink: string;
  emailVerifyLinkError: string;
  registerEmailId: any;
  email: any;
  password: any;
  subscription: Subscription;
  cancelSubscription: string;
  cancelSubscriptionConfirmation: string;
  deleteRetirementAccountConfirmation: string;
  subscriptionId: string;
  providerAccountId: any;
  Id:any;
  changeSubscriptionSuccess: string;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public cd: ChangeDetectorRef,
    public commonService: CommonService,
    private activityHistroyService: ActivityHistroyService,
    private sessionStorageService: SessionStorageService
  ) {
    // console.log(data);
    this.errMesg = data.errorValue;
    this.errorType = data.errorType;
    this.paymentSuccess = data.paymentSuccess;
    this.changeSubscriptionSuccess = data.changeSubscriptionSuccess;
    this.incorrectPassword = data.incorrectPassword;
    this.pointOne = data.pointOne;
    this.pointTwo = data.pointTwo;
    this.pointThree = data.pointThree;
    this.loginThreeAttempts = data.loginThreeAttempts;
    this.modifyEmailaws = data.modifyEmailaws;
    this.userStatus = data.userStatus;
    this.cancelSubscription = data.cancelSubscription;
    this.cancelSubscriptionConfirmation = data.cancelSubscriptionConfirmation;
    this.subscriptionId = data.subscriptionId;
    this.providerAccountId = data.providerAccountId;
    this.Id=data.Id;
    this.deleteRetirementAccountConfirmation =
      data.deleteRetirementAccountConfirmation;
  }

  ngOnInit(): void {
    this.modifyEmailForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
    });
  }
  get modifyEmailFormErr() {
    return this.modifyEmailForm.controls;
  }
  closeDialog() {
    if (this.incorrectPassword) {
      this.router.navigate(["/forgot-password"]);
      this.dialogRef.close({ event: "close" });
    } else if (
      this.userStatus &&
      this.userStatus.verificationstatus === "Pending"
    ) {
      this.dialogRef.close({ event: "close" });
      // this.router.navigate(['/dashboard']);
    } else {
      this.dialogRef.close({ event: "close" });
    }
  }
  updateEmail() {
    this.submitted = true;
    if (this.modifyEmailForm.invalid) {
      return;
    }
    // this.auth.updateEmail(this.modifyEmailForm.value.email, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //     if (error.messages === 'An account with the given email already exists.') {
    //       this.registerEmailId = messages.EmailExists;
    //     }
    //     this.cd.detectChanges();
    //   }
    //   if (result) {
    //     this.emailChanged = messages.ChangeEmailId;
    //     console.log(result);
    //     this.activityHistroy(ActivityHistoryEventTypeEnums.modifiyEmail);
    //     setTimeout(() => {
    //       this.dialogRef.close({ event: 'close' });
    //       this.router.navigate(['/login']);
    //     }, 4000);
    //     this.cd.detectChanges();
    //   }
    // });

    this.subscription = this.commonService
      .updateEmail({
        email: this.sessionStorageService.getSingleValueFromSession(
          "YourInfoValue"
        ).email,
        token: this.sessionStorageService.getSingleValueFromSession("token"),
        newEmail: this.modifyEmailForm.value.email,
      })
      .subscribe((payload) => {
        console.log("payload", payload);
        if (payload["error"]) {
          if (
            payload["detail"] ===
            "An account with the given email already exists"
          ) {
            this.registerEmailId = messages.EmailExists;
          } else {
            this.registerEmailId = payload["errorType"].detail;
          }
          this.cd.detectChanges();
        } else {
          this.emailChanged = messages.ChangeEmailId;
          // console.log(result);
          this.activityHistroy(ActivityHistoryEventTypeEnums.modifiyEmail);
          setTimeout(() => {
            this.dialogRef.close({ event: "close" });
            this.router.navigate(["/login"]);
          }, 4000);
          this.cd.detectChanges();
        }
      });
  }

  emailVerify() {
    const emailVerify = {
      notificationType: "email",
      eventType: "EmailVerify",
      emailAddress: this.userStatus.email_address,
      phoneNumber: "",
      notificationData: "",
    };
    if (this.userStatus) {
      this.commonService.emailVerify(emailVerify).subscribe((response: any) => {
        // console.log(response);
        if (response.status === 400) {
          this.emailVerifyLinkError = response.messages;
        } else if (response.status === 200) {
          this.emailVerifyLink = messages.EmailVerificationMesg;
          this.activityHistroy(
            ActivityHistoryEventTypeEnums.emailVerificationLink
          );
        }
        this.cd.detectChanges();
      });
    }
  }

  modifyEmail() {
    this.dialogRef.close({ event: "close" });
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: "500px",
      backdropClass: "custom-dialog-backdrop",
      panelClass: "custom-dialog-panel-class",
      data: { modifyEmailaws: messages.ModifiyEMail },
    });
  }

  activityHistroy(eventType) {
    this.activityHistroyService.activityHistroy(
      ActivityHistoryEnums.login,
      eventType
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  okAction() {
    this.closeDialog();
    if (this.data.state == "signedup")
      this.router.navigate(["dashboard", "retirement-savings"]);
    else this.router.navigate(["dashboard", "addretirementaccount"]);
  }

  deleteSubscription() {
    this.commonService.cancelSubscription(this.subscriptionId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.cancel_at_period_end === true) {
          this.dialogRef.close({ event: "close" });
        }
        this.cd.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRetirementAccount() {
    this.commonService.deleteRegisterRetirementAccount(this.providerAccountId,this.Id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close({ event: "close" });
          this.cd.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      );
    
  }
}
