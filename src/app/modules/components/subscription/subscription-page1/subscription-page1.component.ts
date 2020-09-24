import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, Input, EventEmitter, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';

import { LlSubscription1PageService } from './subscription-page1.service';

import { LlSideNavService } from '@app/modules/layout/sidenav/ll-sidenav.service';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { DataShareService } from '@app/shared/data-share.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '@app/modules/components/popup/popup.component';
import message from 'assets/json/en.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-subscription-page1',
  templateUrl: './subscription-page1.component.html',
  styleUrls: ['./subscription-page1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPage1Component implements OnInit, OnDestroy, AfterViewInit {
  parentData: any;
  option2 = false;
  option1 = false;
  option3 = false;
  showLoader = false;
  subcriptionProducts: any;
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  options: string[] = ['Annually', 'Monthly'];
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  subcriptionProductsList: any;
  selectedSubcriptionPlan: any;
  productPlans: any;
  coupon: string;
  productTwo: any;
  productOne: any;
  productThree: any;
  plansArr: any;
  selectedPlanObj: any;
  planAmount: any;
  couponOff: any;
  totalPlanAmount: number;
  totalAmountOff: number;
  yearly: any;
  couponId: any;
  paymentPlanDetails: any;
  selectedPremium: any;
  planId: any;
  inValidCoupon: string;
  plan1: any;
  plan2: any;
  plan3: any;
  selectedValue: Number;
  pageSettings: any;
  //Change Subscription
  isChangeSubscriptionInprogress = false;
  csError: any;
  changeSubscriptionPaymentSuccessMessage: string;
  subscriptions: Subscription[] = [];
  appliedCoupon: any;

  constructor(private translateService: TranslateService, public dialog: MatDialog, private commenService: CommonService, private cd: ChangeDetectorRef, private signUpDataService: SignUpDataService, private router: Router, private route: ActivatedRoute, private llSubscription1PageService: LlSubscription1PageService, private llSideNavService: LlSideNavService, private activityHistroyService: ActivityHistroyService, private dataShareService: DataShareService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.llSideNavService.updateSideNavValue('subscription');
  }

  ngOnInit(): void {
    this.configurePageSettings();
    this.parentData = 6;
    this.getProductsFromServer();
  }

  configurePageSettings() {
    this.pageSettings = {
      isFromDashBoard: window.location.href && window.location.href.includes('billing'),
      displayChangeSubscription: window.location.href && window.location.href.includes('billing/change-subscription'),
      displayUserSubscription: window.location.href && window.location.href.includes('billing/subscription1'),
    };
  }

  getProductsFromServer() {
    this.showLoader = true;
    this.subscriptions.push(
      this.commenService.getProducts().subscribe(
        (productResponse) => {
          this.subcriptionProducts = productResponse;
          this.getProducts();
          this.showLoader = false;
          this.cd.detectChanges();
        },
        (error) => {
          console.log('err', error);
          this.showLoader = false;
          this.cd.detectChanges();
        }
      )
    );
  }

  selAllColumn(value: Number, selectedPlan, selectedBillingPlan) {
    this.selectedSubcriptionPlan = selectedPlan;
    this.plansArr = this.selectedSubcriptionPlan.plans;
    // this.selectedPremium = this.plansArr[0];
    this.selectedValue = value;
    if (value === 1) {
      this.option1 = true;
      this.option2 = false;
      this.option3 = false;
    } else if (value === 2) {
      this.option2 = true;
      this.option1 = false;
      this.option3 = false;
    } else if (value === 3) {
      this.option2 = false;
      this.option1 = false;
      this.option3 = true;
    }
    const plan = selectedBillingPlan && this.plansArr.find((p) => p.id == selectedBillingPlan.id);
    this.selectedPlan(plan ? plan : this.plansArr[0]);
    // this.selected = true;
    this.addClass();
    // this.getProductPlans(this.selectedSubcriptionPlan);
  }

  addClass() {
    return {
      'subscribe-select1': this.option1,
      'subscribe-select2': this.option2,
      'subscribe-select3': this.option3,
      thumbsup: true,
    };
  }

  next() {
    this.paymentDetails();
    this.router.navigate(['../subscription2'], { relativeTo: this.route.parent });
  }

  getMenu(dat) {}

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if (this.parentData === message) {
      // this.moveToAccountanalysis2 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../account-analysis5'], { relativeTo: this.route.parent });
  };

  getProducts() {
    this.subcriptionProductsList = this.subcriptionProducts;
    this.productOne = this.subcriptionProductsList[0];
    this.productTwo = this.subcriptionProductsList[1];
    this.productThree = this.subcriptionProductsList[2];

    if (this.subcriptionProductsList) {
      const selectedBillingPlan = this.dataShareService.getSelectedPlan();
      const productID = selectedBillingPlan ? selectedBillingPlan.product : '';
      if (this.productOne.id == productID) {
        this.selAllColumn(1, this.productOne, selectedBillingPlan);
      } else if (this.productThree.id == productID) {
        this.selAllColumn(3, this.productThree, selectedBillingPlan);
      } else {
        this.selAllColumn(2, this.productTwo, selectedBillingPlan);
      }
      this.cd.detectChanges();
    }
    this.paymentDetails();
  }

  couponCode() {
    this.subscriptions.push(
      this.commenService.couponCode(this.coupon).subscribe(
        (couponRes: any) => {
          this.couponId = couponRes.id;
          this.couponOff = couponRes.percent_off;
          this.appliedCoupon = couponRes.success_message;
          this.inValidCoupon = '';
          if (couponRes.errorCode) {
            this.inValidCoupon = couponRes.errorMessage;
            this.cd.detectChanges();
            return;
          }
          if (this.coupon === this.couponId) {
            this.totalAmountOff = (this.totalPlanAmount * this.couponOff) / 100;
            this.totalPlanAmount = this.totalPlanAmount - this.totalAmountOff;
            this.activityHistroy();
            this.cd.detectChanges();
          }
          this.paymentDetails();
        },
        (err) => {
          console.log(err);
          this.couponId = '';
          // this.totalPlanAmount = this.totalPlanAmount + this.totalAmountOff;
        }
      )
    );
  }

  selectedPlan(obj) {
    this.selectedPremium = obj;
    if (this.selectedValue === 1 && this.selectedPremium.interval === 'year') {
      this.plan1 = obj;
      this.plan2 = this.productTwo.plans[0];
      this.plan3 = this.productThree.plans[0];
    } else if (this.selectedValue === 1 && this.selectedPremium.interval === 'month') {
      this.plan1 = this.productOne.plans[1];
      this.plan2 = this.productTwo.plans[1];
      this.plan3 = this.productThree.plans[1];
    }
    if (this.selectedValue === 2 && this.selectedPremium.interval === 'year') {
      this.plan2 = obj;
      this.plan1 = this.productOne.plans[0];
      this.plan3 = this.productThree.plans[0];
    } else if (this.selectedValue === 2 && this.selectedPremium.interval === 'month') {
      this.plan1 = this.productOne.plans[1];
      this.plan3 = this.productThree.plans[1];
      this.plan2 = this.productTwo.plans[1];
    }
    if (this.selectedValue === 3 && this.selectedPremium.interval === 'year') {
      this.plan3 = obj;
      this.plan1 = this.productOne.plans[0];
      this.plan2 = this.productTwo.plans[0];
    } else if (this.selectedValue === 3 && this.selectedPremium.interval === 'month') {
      this.plan1 = this.productOne.plans[1];
      this.plan2 = this.productTwo.plans[1];
      this.plan3 = this.productThree.plans[1];
    }
    this.planId = obj.id;
    this.totalAmountOff = (obj.amount * this.couponOff) / 100;
    this.totalPlanAmount = this.totalAmountOff ? obj.amount - this.totalAmountOff : obj.amount;
    this.cd.detectChanges();
    this.paymentDetails();
    // console.log(this.paymentPlanDetails);
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.cd.detectChanges();
  }

  couponCheck() {
    this.appliedCoupon = '';
    this.inValidCoupon = '';
    if (this.coupon !== this.couponId) {
      this.totalPlanAmount = this.selectedPremium.amount;
      this.totalAmountOff = 0;
      this.couponOff = 0;
      this.couponId = '';
    }
  }

  paymentDetails() {
    this.paymentPlanDetails = {
      totalPlanAmount: this.totalPlanAmount / 100,
      couponAmountOff: this.totalAmountOff / 100 ? this.totalAmountOff / 100 : '',
      couponId: this.couponId ? this.couponId : '',
      planId: this.planId,
      planName: this.selectedSubcriptionPlan.name,
      interval: this.selectedPremium.interval,
      couponOff: this.couponOff,
      amount: this.selectedPremium.amount / 100,
    };
    this.llSubscription1PageService.updatePaymentPlanDetails(this.paymentPlanDetails);
  }

  activityHistroy() {
    this.activityHistroyService.activityHistroy(ActivityHistoryEnums.subscriptionChanges, ActivityHistoryEventTypeEnums.couponCode);
  }

  changeSubscription() {
    // Reset dependent variables with default value before action
    this.isChangeSubscriptionInprogress = true;
    this.changeSubscriptionPaymentSuccessMessage = '';
    this.csError = null;

    const subscriptionId = this.dataShareService.getSubscriptionId();
    const subscriptionDetails = {
      planId: this.planId || '',
      subscriptionId: subscriptionId,
      couponId: this.couponId || '',
    };
    this.subscriptions.push(
      this.commenService.changeSubscription(subscriptionDetails).subscribe(
        (response) => {
          console.log(response);
          this.isChangeSubscriptionInprogress = false;
          this.cd.detectChanges();
          this.changeSubscriptionPaymentSuccessMessage = message.changeSubscriptionPaymentSuccessMessage;
          this.openDialog();
          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['dashboard', 'billing']);
          }, 5000);
        },
        (error) => {
          console.log('err', error);
          this.csError = error;
          this.isChangeSubscriptionInprogress = false;
          this.cd.detectChanges();
        }
      )
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: {
        changeSubscriptionSuccess: this.changeSubscriptionPaymentSuccessMessage,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.parentData = null;
    this.option2 = false;
    this.option1 = false;
    this.option3 = false;
    this.showLoader = false;
    this.subcriptionProducts = null;
    this.height = undefined;
    this.subcriptionProductsList = null;
    this.selectedSubcriptionPlan = null;
    this.productPlans = null;
    this.coupon = '';
    this.productTwo = null;
    this.productOne = null;
    this.productThree = null;
    this.plansArr = null;
    this.selectedPlanObj = null;
    this.planAmount = null;
    this.couponOff = null;
    this.totalPlanAmount = null;
    this.totalAmountOff = null;
    this.yearly = null;
    this.couponId = null;
    this.paymentPlanDetails = null;
    this.selectedPremium = null;
    this.planId = null;
    this.inValidCoupon = null;
    this.plan1 = null;
    this.plan2 = null;
    this.plan3 = null;
    this.selectedValue = null;
    this.pageSettings = null;
    //Change Subscription
    this.isChangeSubscriptionInprogress = false;
    this.csError = null;
    this.changeSubscriptionPaymentSuccessMessage = '';
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
