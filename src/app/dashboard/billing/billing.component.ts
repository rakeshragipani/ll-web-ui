import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupComponent } from '@app/modules/components/popup/popup.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { DataShareService } from '@app/shared/data-share.service';
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import message from 'assets/json/en.json';
import { Subscription } from 'rxjs';


@Component({
  selector: 'll-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingComponent implements OnInit, AfterViewInit, OnDestroy {
  showLine = true;
  showLine1 = true;
  SessionData: any;
  billingData: any;
  customerCards: any;
  deleted: string;
  customerId: any;
  customerData: any;
  updateBillingForm: FormGroup;
  createBillingForm: FormGroup;
  customer: any;
  isLoading = false;
  invoice: any;
  submitted = false;
  fsubmitted = false;
  retirementAccounts: any;
  stripe: any;
  elements: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  message: string;
  tokenId: any;
  cardAddress: any;
  expError: string;
  subscriptionType = '';
  subscriptions: Subscription[] = []

  constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService, private ref: ChangeDetectorRef, private sessionStorageService: SessionStorageService, public dialog: MatDialog, public formBuilder: FormBuilder, private dataShareService: DataShareService) {
    this.subscriptions.push(dialog.afterAllClosed.subscribe(() => {
      this.getCustomerId();
    }));
  }

  ngOnInit(): void {
    this.SessionData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    this.dataShareService.updateSelectedPlan(null);
    this.dataShareService.updateSubscriptionId('');
    this.getCustomerId();
    this.getRetirementsAccounts();
    this.configureBillingForm();
  }

  ngAfterViewInit() {
    this.stripe = Stripe(environment.stripeKey);
    this.elements = this.stripe.elements();
    const style = {
      base: {
        color: '#2a368e',
        lineHeight: '40px',
        fontFamily: '"Lato", sans-serif',
        fontSize: '15px',
        fontWeight: 'normal',
        '::placeholder': {
          color: '#6C757D',
        },
      },
    };
    this.cardNumber = this.elements.create('cardNumber', { style: style });
    this.cardNumber.mount('#card-number');
    this.cardExpiry = this.elements.create('cardExpiry', { style: style });
    this.cardExpiry.mount('#card-expiry');
    this.cardCvc = this.elements.create('cardCvc', { style: style });
    this.cardCvc.mount('#card-cvc');

    this.cardNumber.on('change', function (event) {
      const displayError = document.getElementById('cardErr');
      if (event.error) {
        displayError.textContent = message.InvalidCardNumber ? message.InvalidCardNumber : event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    this.cardCvc.on('change', function (event) {
      const displayErrorCvc = document.getElementById('cvcErr');
      if (event.error) {
        displayErrorCvc.textContent = message.InvalidCvc ? message.InvalidCvc : event.error.message;
      } else {
        displayErrorCvc.textContent = '';
      }
    });
    this.cardExpiry.on('change', function (event) {
      const displayErrorExp = document.getElementById('expiryErr');
      if (event.error) {
        displayErrorExp.textContent = message.CardExpire ? message.CardExpire : event.error.message;
      } else {
        displayErrorExp.textContent = '';
      }
    });
  }

  configureBillingForm() {
    this.updateBillingForm = this.formBuilder.group({
      firstName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      address: [''],
      addressLine2: [''],
      state: ['', [Validators.pattern('[a-zA-Z ]*')]],
      city: ['', [Validators.pattern('[a-zA-Z ]*')]],
      zipOrPostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      expDate: ['', [Validators.required]],
    });

    this.createBillingForm = this.formBuilder.group({
      firstName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      address: [''],
      addressLine2: [''],
      state: ['', [Validators.pattern('[a-zA-Z ]*')]],
      city: ['', [Validators.pattern('[a-zA-Z ]*')]],
      zipOrPostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      // cardNumber:["",[Validators.required]]
    });
  }

  createToken() {
    this.stripe.createToken(this.cardNumber).then((result) => {
      // console.log(result);
      this.tokenId = result.token.id;
      // console.log(this.tokenId); 
      this.sendToken(this.customer.id);
      // console.log(this.customer.id);
    });
  }

  sendToken(customerId) {
    const tokenId = {
      stripeTokenId: this.tokenId,
    };
    this.subscriptions.push(this.commonService.sendCardToken(customerId, tokenId).subscribe(
      (response: any) => {
        // console.log(response);
        this.addCardAddress(response.id);
        this.getCustomerCards(this.customer.id);
      },
      (error) => {
        console.log(error);
      }
    ));
  }

  addCardAddress(cardId) {
    const cardObject = {
      id: cardId,
      addressCity: this.createBillingForm.value.city,
      addressLine1: this.createBillingForm.value.address,
      addressLine2: this.createBillingForm.value.addressLine2,
      object: 'card',
      addressState: this.createBillingForm.value.state,
      addressZip: this.createBillingForm.value.zipOrPostal,
      name: this.createBillingForm.value.firstName,
    };

    this.subscriptions.push(this.commonService.updateCustomerCard(this.customer.id, cardObject).subscribe(
      (response: any) => {
        //  console.log(response);
        this.deleted = 'Card details Added successfully';
        this.getCustomerCards(this.customer.id);
        document.getElementById('addModalClose').click();
        this.cardNumber.clear();
        this.cardExpiry.clear();
        this.cardCvc.clear();
        this.createBillingForm.reset();
        this.fsubmitted = false;
        this.ref.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    ));

  }

  getRetirementsAccounts() {
    this.subscriptions.push(this.commonService.getRetirementAccounts().subscribe(
      (response) => {
        this.retirementAccounts = response;
        // console.log(this.retirementAccounts.length);
        this.ref.detectChanges();
      },
      (error) => { }
    ));
  }
  collapseConditionCheck() {
    if (this.showLine) {
      this.showLine = false;
    } else {
      this.showLine = true;
    }
  }

  collapseConditionCheck1() {
    if (this.showLine1) {
      this.showLine1 = false;
    } else {
      this.showLine1 = true;
    }
  }

  classForCollapse() {
    if (this.showLine) {
      return 'showLine';
    } else {
      return 'hideLine';
    }
  }

  classForCollapse1() {
    if (this.showLine1) {
      return 'showLine';
    } else {
      return 'hideLine';
    }
  }

  maskCreditCard(mainStr) {
    const vis = mainStr.slice(-4);
    let countNum = '';

    for (let i = 8; i > 0; i--) {
      countNum += '*';
    }

    return countNum + vis;
  }

  getBillingData(customerId) {
    this.isLoading = true;
    this.subscriptions.push(this.commonService.getBillingInfo(customerId).subscribe(
      (response) => {
        this.isLoading = false;
        //  console.log('getBillingInfo res: ', this.billingData);
        if (response && response instanceof Array) {
          this.billingData = this.sortBillingData(response);
          this.billingData.forEach((item) => (item.status = item.status.substring(0, 1).toUpperCase() + item.status.substring(1)));
          this.billingData.forEach((item) => (item.cardType = item.cardType.substring(0, 1).toUpperCase() + item.cardType.substring(1)));
          //   console.log('-------------------------------------------------------', this.billingData);
        }
        this.ref.detectChanges();
      },
      (error) => {
        console.log('getBillingInfo err: ', error);
        this.isLoading = false;
        this.ref.detectChanges();
      }
    ));
  }

  sortBillingData(response): any {
    response.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.paymentDate - a.paymentDate;
    });
    return response;
  }

  subscribeToAddCard(){
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop",
      panelClass: "custom-dialog-panel-class",
      data: {
        subscribeToAddCard: message.subscribeToAddCard,
      },
    });
  }

  getCustomerId() {
    debugger;
    this.isLoading = true;
    this.subscriptions.push(this.commonService.getStripeCustomerId().subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && !response.errorCode) {
          this.customer = response;
          this.getCustomerCards(this.customer.id);
          this.getBillingData(this.customer.id);
          if (this.customer.subscriptions && this.customer.subscriptions.data.length > 0) {
            const subscriptionDetails = this.customer.subscriptions.data[0];
            this.dataShareService.updateSubscriptionId(subscriptionDetails.id);
            this.getBillingInvoice(subscriptionDetails.id);
            if (subscriptionDetails && subscriptionDetails.plan) {
              this.dataShareService.updateSelectedPlan(subscriptionDetails.plan);
              this.getProductsFromServer(subscriptionDetails.plan.product);
            }
          }
        }
        this.ref.detectChanges();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.ref.detectChanges();
      }
    ));
  }

  getProductsFromServer(selectedProductId) {
    this.isLoading = true;
    this.subscriptions.push(this.commonService.getProducts().subscribe(
      (productResponse) => {
        this.isLoading = false;
        if (productResponse && productResponse instanceof Array) {
          const products: any = productResponse;
          const product = products.find((p) => p.id === selectedProductId);
          if (product) {
            this.subscriptionType = product.name;
          }
        }
        this.ref.detectChanges();
      },
      (error) => {
        /*  console.log('err', error); */
        this.isLoading = false;
        this.ref.detectChanges();
      }
    ));
  }

  formatString(event) {
    this.expError = '';
    const inputChar = String.fromCharCode(event.keyCode);
    const code = event.keyCode;
    const allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        '0$1/' // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        '$1/' // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        '0$1/$2' // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        '$1/$2' // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        '0' // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        '' // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        '/' // Prevent entering more than 1 `/`
      );
  }

  getCustomerCards(customerId) {
    this.isLoading = true;
    this.subscriptions.push(this.commonService.getCustomerCards(customerId).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response instanceof Array) {
          this.customerCards = response;
        }
        this.ref.detectChanges();
      },
      (error) => {
        this.isLoading = false;
        this.ref.detectChanges();
        console.log(error);
      }
    ));
  }

  getBillingInvoice(subscriptionId) {
    this.isLoading = true;
    this.subscriptions.push(this.commonService.getBillingInvoice(subscriptionId).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.invoice = response;
        //  console.log(this.invoice);
        this.ref.detectChanges();
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        this.ref.detectChanges();
      }
    ));
  }

  deleteCustomerCard(index, item) {

    if (this.customerCards.length == 1) {
      this.deleted = "In order to delete this card, Kindly add another card."
    }
    else {
      this.subscriptions.push(this.commonService.deleteCustomerCard(item.id, this.customer.id).subscribe(
        (response: any) => {
          this.deleted = 'Card details Deleted successfully';
          this.getCustomerCards(this.customer.id);
          this.ref.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      ));

    }
  }

  editCustomerCard(id) {
    this.expError = '';
    this.customerData = this.customerCards.find(function (item) {
      return item.id == id;
    });
    // let yearString = this.customerData.expYear;
    // let res = yearString.slice(-2);
    // console.log(this.customerData);

    this.updateBillingForm.patchValue({
      firstName: this.customerData.name,
    });
    this.updateBillingForm.patchValue({
      address: this.customerData.addressLine1,
    });
    this.updateBillingForm.patchValue({
      state: this.customerData.addressState,
    });
    this.updateBillingForm.patchValue({
      city: this.customerData.addressCity,
    });
    this.updateBillingForm.patchValue({
      addressLine2: this.customerData.addressLine2,
    });
    this.updateBillingForm.patchValue({
      expDate: this.customerData.expMonth + '/' + String(this.customerData.expYear).slice(-2),
    });
    this.updateBillingForm.patchValue({
      zipOrPostal: this.customerData.addressZip,
    });
  }

  get f() {
    return this.updateBillingForm.controls;
  }

  get g() {
    return this.createBillingForm.controls;
  }

  updateCard() {
    this.submitted = true;
    this.expError = '';
    if (this.updateBillingForm.invalid) {
      return;
    }
    const str = this.updateBillingForm.value.expDate;
    const formatDate = str.split('/');
    const cardObject = {
      id: this.customerData.id,
      addressCity: this.updateBillingForm.value.city,
      addressLine1: this.updateBillingForm.value.address,
      addressLine2: this.updateBillingForm.value.addressLine2,
      object: 'card',
      addressState: this.updateBillingForm.value.state,
      addressZip: this.updateBillingForm.value.zipOrPostal,
      expMonth: formatDate[0],
      expYear: formatDate[1],
      name: this.updateBillingForm.value.firstName,
    };
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    const currentMonth = currentDate.getMonth() + 1;
    /* console.log(formatDate[0]);
    console.log(currentMonth); */
    if (formatDate[1] < currentYear || formatDate[0] > 12 || formatDate[1] > 50 || (formatDate[1] == currentYear && formatDate[0] <= currentMonth)) {
      this.expError = 'Expiry date is invalid';
      return;
    } else {
      this.expError = '';
    }

    // if (formatDate[1]<){

    // }
    this.subscriptions.push(this.commonService.updateCustomerCard(this.customerData.customer, cardObject).subscribe(
      (response: any) => {
        //  console.log(response);
        this.deleted = 'Card details Updated successfully';
        this.submitted = false;
        this.getCustomerCards(this.customer.id);
        this.updateBillingForm.reset();
        this.ref.detectChanges();
        document.getElementById('modalClose').click();
      },
      (error) => {
        console.log(error);
      }
    ));
  }

  saveCard() {
    this.fsubmitted = true;
    if (this.createBillingForm.invalid) {
      return;
    } else {
      this.createToken();
    }
    /* console.log(this.createBillingForm.value); */
  }

  addCard() {
    this.createBillingForm.patchValue({
      firstName: this.customer.name,
    });
    this.createBillingForm.patchValue({
      address: this.customer.address.line1,
    });
    this.createBillingForm.patchValue({
      state: this.customer.address.state,
    });
    this.createBillingForm.patchValue({
      city: this.customer.address.city,
    });
    this.createBillingForm.patchValue({
      addressLine2: this.customer.address.line2,
    });
    this.createBillingForm.patchValue({
      zipOrPostal: this.customer.address.postal_code,
    });
  }

  cancelSubscription() {
    const datePipe = new DatePipe('en-IN');
    const InvoiceDate = new Date(this.invoice.nextInvoiceDate);
    InvoiceDate.setDate(InvoiceDate.getDate() - 1);
    const invoiceDate = datePipe.transform(InvoiceDate, 'MM/dd/yyyy');
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: '500px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: { cancelSubscription: 'Your existing subscription ends on' + ' ' + invoiceDate + ' ' + 'without an active subscription,You will not be able to receive account optimization.', cancelSubscriptionConfirmation: 'Are you sure, you want to Cancel subscription?', subscriptionId: this.customer.subscriptions.data[0].id },
    });
  }

  changeSubscriptionButtonEvent() {
    this.router.navigate(['change-subscription'], { relativeTo: this.route });
  }

  subscribeButtonEvent() {
    const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    if (updateData.state === 'registeredaccounts') {
      this.router.navigate(['subscription1'], { relativeTo: this.route });
    } else {
      this.openSubscribeDialog();
    }
  }

  openSubscribeDialog(): void {
    const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel-class',
      data: {
        state: updateData.state,
      },
    });
  }

  defaultPaymentRenewalCard(card) {
    this.isLoading = true;
    if (card.customer && card.id) {
      const cardDetails = {
        customerId: card.customer,
        defaultSource: card.id,
      };
      this.commonService.defaultPaymentRenewalCard(cardDetails).subscribe(
        (response: any) => {
          this.getCustomerId();
        },
        (err) => {
          this.isLoading = false;
          this.ref.detectChanges();
        }
      );
    }
  }


  ngOnDestroy() {
    this.resetVariables()
  }

  resetVariables() {
    this.showLine = true;
    this.showLine1 = true;
    this.SessionData = null;
    this.billingData = null;
    this.customerCards = null;
    this.deleted = null;
    this.customerId = null;
    this.customerData = null;
    this.updateBillingForm = null;
    this.createBillingForm = null;
    this.customer = null;
    this.isLoading = false;
    this.invoice = null;
    this.submitted = false;
    this.fsubmitted = false;
    this.retirementAccounts = null;
    this.stripe = null;
    this.elements = null;
    this.cardNumber = null;
    this.cardExpiry = null;
    this.cardCvc = null;
    this.message = null;
    this.tokenId = null;
    this.cardAddress = null;
    this.expError = null;
    this.subscriptionType = '';
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
