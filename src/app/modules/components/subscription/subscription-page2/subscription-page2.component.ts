import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "@app/shared/CommonService";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "@app/shared/auth.service";
import { PopupComponent } from "@app/modules/components/popup/popup.component";
import { MatDialog } from "@angular/material";
import { environment } from "@env/environment";
import { SignUpDataService } from "@app/sign-up/ll-signup-service";
import message from "assets/json/en.json";
import { SessionStorageService } from "@app/shared/session-storage.service";
import { LlSubscription1PageService } from "../subscription-page1/subscription-page1.service";
import { ActivityHistroyService } from "@app/shared/activityHistrory.service";
import { UserInfoService } from '@app/shared/user-info.service';
import {
  ActivityHistoryEnums,
  ActivityHistoryEventTypeEnums,
} from "@app/shared/activityhistory.enum";
import { Subscription } from 'rxjs';

@Component({
  selector: "subscription-page2",
  templateUrl: "./subscription-page2.component.html",
  styleUrls: ["./subscription-page2.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPage2Component implements OnInit, OnDestroy, AfterViewInit {
  accountAnalysisAmount: any;
  moveToAccountanalysis3: boolean;
  parentData: any;
  userName: any;
  option1: any;
  selected = false;
  submitted = false;
  SubscriptionPaage2Form: FormGroup;
  supportLanguages = ["en", "fr", "ta", "hi"];
  paymentPlanDetails: any;
  @ViewChild("pageHeight") targetElement: any;
  @ViewChild("cardInfo") cardInfo: ElementRef;
  // cardHandler = this.onChange().bind
  height: any;
  card: any;
  error: any;
  showLoader = false;
  // custom
  cardNumber: any;
  message: string;
  stripe: any;
  elements: any;
  cardExpiry: any;
  cardCvc: any;
  paymentErr: string;
  paymentErrorMesg: string;
  userPrefillInfo: any;
  errorType: string;
  tokenId: any;
  pageSettings: any;
  subscriptions: Subscription[] = []

  constructor(
    private translateService: TranslateService,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private signUpDataService: SignUpDataService,
    private llSubscription1PageService: LlSubscription1PageService,
    private sessionStorageService: SessionStorageService,
    private activityHistroyService: ActivityHistroyService,
    private userInfoService: UserInfoService
  ) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang("en");
    this.userPrefillInfo = this.sessionStorageService.getSingleValueFromSession(
      "YourInfoValue"
    );
    console.log(this.userPrefillInfo);
    // this.userPrefillInfo = this.authService.getUserFirstLastName();
    this.paymentPlanDetails = this.llSubscription1PageService.getPaymentPlanDetails();
  }

  ngAfterViewInit() {
    this.stripe = Stripe(environment.stripeKey);
    this.elements = this.stripe.elements();
    const style = {
      base: {
        iconColor: "#666EE8",
        color: "#2a368e",
        lineHeight: "40px",
        fontFamily: '"Lato", sans-serif',
        fontSize: "15px",
        fontWeight: "normal",
        "::placeholder": {
          color: "#6C757D",
        },
      },
    };
    this.cardNumber = this.elements.create("cardNumber", { style: style });
    this.cardNumber.mount("#card-number");
    this.cardExpiry = this.elements.create("cardExpiry", { style: style });
    this.cardExpiry.mount("#card-expiry");
    this.cardCvc = this.elements.create("cardCvc", { style: style });
    this.cardCvc.mount("#card-cvc");
    this.cardNumber.on("change", function (event) {
      const displayError = document.getElementById("cardErr");
      if (event.error) {
        displayError.textContent = message.InvalidCardNumber
          ? message.InvalidCardNumber
          : event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
    this.cardCvc.on("change", function (event) {
      const displayErrorCvc = document.getElementById("cvcErr");
      if (event.error) {
        displayErrorCvc.textContent = message.InvalidCvc
          ? message.InvalidCvc
          : event.error.message;
      } else {
        displayErrorCvc.textContent = "";
      }
    });
    this.cardExpiry.on("change", function (event) {
      const displayErrorExp = document.getElementById("expiryErr");
      if (event.error) {
        displayErrorExp.textContent = message.CardExpire
          ? message.CardExpire
          : event.error.message;
      } else {
        displayErrorExp.textContent = "";
      }
    });

    this.height =
      this.targetElement &&
        this.targetElement.nativeElement &&
        this.targetElement.nativeElement.offsetHeight > 470
        ? this.targetElement.nativeElement.offsetHeight
        : 470;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.pageSettings = {
      isFromDashBoard: window.location.href && window.location.href.includes('billing'),
    }
    this.parentData = 6.1;
    this.configurePageForm();
  }

  configurePageForm() {
    this.SubscriptionPaage2Form = this.formBuilder.group({
      firstName: ["", [Validators.pattern("[a-zA-Z ]*"), Validators.required]],
      lastName: ["", [Validators.pattern("[a-zA-Z ]*"), Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      address: [""],
      aptOrSuite: [""],
      city: [""],
      stateOrProvince: [""],
      zipOrPostal: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern("[0-9]*"),
        ],
      ],
      fullname: ["", [(Validators.pattern("[a-zA-Z ]*"), Validators.required)]],
      termsConditions: [false, Validators.requiredTrue],
    });
    this.SubscriptionPaage2Form.controls.firstName.setValue(
      this.userPrefillInfo.firstName
    );
    this.SubscriptionPaage2Form.controls.lastName.setValue(
      this.userPrefillInfo.lastName
    );
    this.SubscriptionPaage2Form.controls.email.setValue(
      this.userPrefillInfo.email
    );
    this.SubscriptionPaage2Form.controls.fullname.setValue(
      this.userPrefillInfo.firstName + " " + this.userPrefillInfo.lastName
    );
  }

  get f() {
    return this.SubscriptionPaage2Form.controls;
  }

  selAllColumn(value: Number) {
    if (value === 1) {
      this.option1 = true;
    }
    this.selected = true;
    this.addClass();
  }

  addClass() {
    return {
      accountanalysis2Option1: this.option1,
      accountanalysisThumbsup: true,
    };
  }

  next() {
    this.submitted = true;
    if (this.SubscriptionPaage2Form.invalid) {
      return;
    }

    this.moveToAccountanalysis3 = true;
  }

  getMenu(dat) { }

  getMessage(message: string) {
    if (this.parentData === message) {
      this.moveToAccountanalysis3 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(["../subscription1"], {
      relativeTo: this.route.parent,
    });
  };

  getPaymentId() {
    this.paymentErr = "";
    this.errorType = "";
    this.showLoader = true;
    this.submitted = true;
    if (this.SubscriptionPaage2Form.invalid) {
      this.showLoader = false;
      return;
    }
    const cardHolderName = this.SubscriptionPaage2Form.value.fullname;
    this.stripe
      .createPaymentMethod({
        type: "card",
        card: this.cardNumber,
        billing_details: { name: cardHolderName },
      })
      .then((result) => {
        console.log(result);
        this.showLoader = false;
        if (result.error) {
          console.log(result.error);
          this.paymentErr = message.StripeServiceDown
            ? message.StripeServiceDown
            : result.error.message;
          this.errorType = "Connection Error"
            ? "Connection Error"
            : result.error.type;
          if (
            result.error.type === "api_connection_error" ||
            result.error.type === "api_error"
          ) {
            this.openDialog();
          }
          this.cd.detectChanges();
          return;
        } else {
          const paymentId = result.paymentMethod.id;
          this.getStripeCustomerId(paymentId);
        }
      });
  }

  addCustomerPayment(paymentId) {
    this.showLoader = true;
    const customerDetails = {
      name:
        this.SubscriptionPaage2Form.value.firstName +
        " " +
        this.SubscriptionPaage2Form.value.lastName,
      email: this.SubscriptionPaage2Form.value.email,
      postalCode: this.SubscriptionPaage2Form.value.zipOrPostal,
      line1: this.SubscriptionPaage2Form.value.address,
      line2: this.SubscriptionPaage2Form.value.aptOrSuite,
      city: this.SubscriptionPaage2Form.value.city,
      state: this.SubscriptionPaage2Form.value.stateOrProvince,
      planId: this.paymentPlanDetails.planId,
      couponId: this.paymentPlanDetails.couponId,
      paymentId: paymentId,
    };
    this.subscriptions.push(this.commonService.customerPayment(customerDetails).subscribe(
      (results: any) => {
        if (results.errorCode === "EC001") {
          this.paymentErrorMesg = results.errorMessage
            ? results.errorMessage
            : message.StripeExeptionError;
          // console.log('PaymentResponseerr', results);
          this.SubscriptionPaage2Form.controls["fullname"].reset();
          this.submitted = false;
          this.showLoader = false;
          this.activityHistroy(
            ActivityHistoryEventTypeEnums.subscriptionFailure
          );
          this.cd.detectChanges();
        } else {
          this.submitted = false;
          this.createToken(results.id);
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  getStripeCustomerId(paymentId) {
    this.subscriptions.push(this.commonService.getStripeCustomerId().subscribe(
      (response: any) => {
        console.log(response);
        //Called the add customer payment api if Stripe customerId not found, 
        //it means that an user adding the payment first time.
        if(!response){
          this.addCustomerPayment(paymentId);
        } else if(response && response.id){ // Called the create subscription isntead of calling the add customer payment api if Stripe customerId is found from DB
          this.createToken(response.id);
        } else{ // Handling errors
          this.showLoader = false;
          this.cd.detectChanges();
        }        
      },
      (error) => {
        console.log(error);
      }
    ));
  }

  createToken(customerId) {
    this.stripe.createToken(this.cardNumber).then((result) => {
      const tokenId = result.token.id;
      this.createSubscription(customerId, tokenId);
    });
  }

  createSubscription(customerId, tokenId) {
    let subscriptionDetails = {
      customerId: customerId,
      cardToken: tokenId,
      planId: this.paymentPlanDetails.planId
    }
    this.subscriptions.push(this.commonService.createSubscription(subscriptionDetails).subscribe(
      (response: any) => {
        console.log(response);
        //Add card addess if create susbcription is sucsess
        if (response.subscriptionId) {
          this.addCardAddress(response.cardId, customerId);
        }
        else { // Display payment failure pop if create susbcription is failed 
          this.showLoader = false;
          this.cd.detectChanges();
          this.openPaymentFailureDialog();
        }
      },
      (error) => { //other errors
        this.showLoader = false;
        this.cd.detectChanges();
        console.log(error);
      }
    ));
  }

  addCardAddress(cardId, customerId) {
    let cardObject = {
      id: cardId,
      addressCity: this.SubscriptionPaage2Form.value.city,
      addressLine1: this.SubscriptionPaage2Form.value.address,
      addressLine2: this.SubscriptionPaage2Form.value.aptOrSuite,
      object: 'card',
      addressState: this.SubscriptionPaage2Form.value.stateOrProvince,
      addressZip: this.SubscriptionPaage2Form.value.zipOrPostal,
      name: this.SubscriptionPaage2Form.value.fullname,
    };
    console.log(this.SubscriptionPaage2Form.value);
    console.log(customerId);
    console.log(cardId);

    this.subscriptions.push(this.commonService.updateCustomerCard(customerId, cardObject).subscribe(
      (response: any) => {
        console.log(response);
        //Called send analysis score api if the customer card saved successfully
        if(response && !response.errorType){
          this.sendAnalysisScore()
        } else {
          this.showLoader = false;
          this.cd.detectChanges();
        }
        
      },
      (error) => {
        this.showLoader = false;
        console.log(error);
        this.cd.detectChanges();
      }
    ));
  }

  sendAnalysisScore() {
    this.subscriptions.push(this.commonService.sendAnalysisScore({
      state: "subscription",
      paymentplan: this.paymentPlanDetails.planName,
      username: this.sessionStorageService.getSingleValueFromSession(
        "userId"
      ),
    })
      .subscribe((payload: any) => {
        console.log("payload", payload);
        this.showLoader = false;
        this.cd.detectChanges();
        this.activityHistroy(
          ActivityHistoryEventTypeEnums.subscriptionSuccess
        );
        this.openDialog();
        setTimeout(() => {
          this.closeDialog();
          if (this.pageSettings.isFromDashBoard) {
            //Update state
            const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
            updateData.state = "subscription";
            updateData.paymentPlan=this.paymentPlanDetails.planName
            this.sessionStorageService.updateSessionValue('YourInfoValue', updateData);
            this.router.navigate(['dashboard', 'billing']);
          }
          else this.router.navigate(["/login"]);
        }, 5000);
      },
      (error) => {
        this.showLoader = false;
        console.log(error);
        this.cd.detectChanges();
      }));
  }


  openPaymentFailureDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop",
      panelClass: "custom-dialog-panel-class",
      data: {
        paymentFailure: message.paymentFailureMessage,
      },
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop",
      panelClass: "custom-dialog-panel-class",
      data: {
        errorValue: this.paymentErr,
        errorType: this.errorType,
        paymentSuccess: message.PaymentSuccessMessage,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  activityHistroy(eventType) {
    this.activityHistroyService.activityHistroy(
      ActivityHistoryEnums.subscriptionChanges,
      eventType
    );
  }

  ngOnDestroy() {
    this.accountAnalysisAmount = null;
    this.moveToAccountanalysis3 = undefined;
    this.parentData = null;
    this.userName = null;
    this.option1 = null;
    this.selected = false;
    this.submitted = false;
    this.SubscriptionPaage2Form = null;
    this.paymentPlanDetails = null;
    this.height = undefined;
    this.card = null;
    this.error = null;
    this.showLoader = false;
    // custom
    this.cardNumber = null;
    this.message = null;
    this.stripe = null;
    this.elements = null;
    this.cardExpiry = null;
    this.cardCvc = null;
    this.paymentErr = null;
    this.paymentErrorMesg = null;
    this.userPrefillInfo = null;
    this.errorType = null;
    this.tokenId = null;
    this.pageSettings = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
