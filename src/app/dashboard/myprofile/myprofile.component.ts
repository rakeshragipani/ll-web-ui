import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, SystemJsNgModuleLoader, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { CommonService } from '@app/shared/CommonService';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataShareService } from '@app/shared/data-share.service';
import { UserInfoService } from '@app/shared/user-info.service';
import { CustomDateParserFormatter } from '@app/shared/calendar-parser.service';
import { User } from '@app/sign-up/user.model';
import { DatePipe } from '@angular/common';
import messages from 'assets/json/en.json';
import { ActivityHistoryEnums, ActivityHistoryEventTypeEnums } from '@app/shared/activityhistory.enum';
import { ActivityHistroyService } from '@app/shared/activityHistrory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  providers: [SystemJsNgModuleLoader, NgbModalConfig, NgbModal, { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyprofileComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  comparingAges = false;
  closeResult: string;
  userErr: any;
  SessionData: any;
  profileInfoForm: FormGroup;
  initialProfileInfoFormValues = null;
  showLine = true;
  updatedUserInfo: any;
  displayRiskModal = false;
  isLoading = false;
  userInfo: User;
  isUpdateInProgress = false;
  success = false;
  error = false;
  projectData: any = {};
  profileimage: any;
  @ViewChild('fileInput') myInputVariable: ElementRef;
  ageDifference: any;
  dob: any;
  minDate: any;
  maxDate: any;
  calenderFormatErrMsg = false;
  errorMsg = false;
  invalidImageDimations = false;
  userResponse: any;
  nextPayementDate: any;
  selectedSegmentIndex = 0;
  /*------- Change Password -------*/
  changePasswordForm: FormGroup;
  public hideConfirmPassword = true;
  public hideNewPassword = true;
  isChagnePasswordSubmitted = false;
  mismatchPassword: string;
  format = /.*(.)\1\1\1/;
  emailVerifyLinkError: any;
  emailVerifyLink: any;
  subscriptions: Subscription[] = [];
  modalLoading:any;

  constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef, private sessionStorageService: SessionStorageService, private signUpDataService: SignUpDataService, private userInfoService: UserInfoService, private commonService: CommonService, private sharedData: DataShareService, private activityHistroyService: ActivityHistroyService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.configChangePasswordForm();
    this.isLoading = true;
    this.maxDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    this.minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
    this.subscriptions.push(
      this.signUpDataService.getUserData().subscribe(
        (users: [User]) => {
          this.isLoading = false;
          this.userResponse = users;
          //  console.log(this.userResponse[0]);
          this.userInfoService.updateUserInfo(users);
          this.userInfo = this.userInfoService.getUserInfo();
          if (this.userInfo.profileImage) {
            const enc = new TextDecoder('utf-8');
            const arr = new Uint8Array(this.userInfo.profileImage['data']);
            this.profileimage = enc.decode(arr);
          }

          const annualIncome = this.additionalInformationValue.call(this, 'employement', 'income');
          const percentageContributionToRetirementPlan = this.additionalInformationValue.call(this, 'contribution', 'own');
          const percentageToEmployerMatch = this.additionalInformationValue.call(this, 'contribution', 'employer');
          const rentAmount = this.additionalInformationValue.call(this, 'home', 'rent');
          const areYouEmployed = this.additionalInformationValue.call(this, 'employement', 'status');
          const rentOrOwn = this.additionalInformationValue.call(this, 'home', 'type');

          this.profileInfoForm = new FormGroup({
            general: new FormGroup({
              firstName: new FormControl(this.userInfo.firstName || {}, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
              lastName: new FormControl(this.userInfo.lastName || {}, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
              emailAddress: new FormControl(this.userInfo.email || '', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
              mobileNumber: new FormControl(this.userInfo.phoneNumber || '', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}$')]),
              streetAddress: new FormControl(this.userInfo.address1 || '', [Validators.required]),
              suitAddress: new FormControl(this.userInfo.address2 || '', [Validators.required]),
              city: new FormControl(this.userInfo.city || '', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
              state: new FormControl(this.userInfo.stateName || '', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
              zipCode: new FormControl(this.userInfo.zipCode || '', [Validators.required, Validators.pattern('[0-9]{5}')]),
              age: new FormControl(this.userInfo.age || '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(21), Validators.max(130)]),
              retirementAge: new FormControl(this.userInfo.retirementAge || '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(55), Validators.max(100)]),
              dateOfBirth: new FormControl(this.userInfo.dateOfBirth || null),
            }),
            communication: new FormGroup({
              accountInfo: new FormControl(this.retrieveCommunicationPreferenceValue.call(this, 'accountInfo')),
              newsLetters: new FormControl(this.retrieveCommunicationPreferenceValue.call(this, 'newsLetters')),
              secureLogin: new FormControl(this.retrieveCommunicationPreferenceValue.call(this, 'secureLogin')),
              newFeatures: new FormControl(this.retrieveCommunicationPreferenceValue.call(this, 'newFeatures')),
              betaPrograms: new FormControl(this.retrieveCommunicationPreferenceValue.call(this, 'betaPrograms')),
            }),
            optional: new FormGroup({
              areYouMarried: new FormControl(this.additionalInformationValue.call(this, 'familyStatus', 'married'), [Validators.required]),
              numberOfKids: new FormControl(this.additionalInformationValue.call(this, 'familyStatus', 'kids'), [Validators.required]),
              areYouEmployed: new FormControl(this.additionalInformationValue.call(this, 'employement', 'status'), [Validators.required]),
              annualIncome: new FormControl(this.currencyUS(annualIncome), areYouEmployed == 'yes' ? [Validators.required, Validators.pattern('[$][0-9]+(.[0-9][0-9]?)?')] : [Validators.pattern('[$][0-9]+(.[0-9][0-9]?)?')]),
              percentageContributionToRetirementPlan: new FormControl(this.appendPercentage(percentageContributionToRetirementPlan), [Validators.required, Validators.pattern('[0-9]+(.?[0-9][0-9]?)?[%]')]),
              PercentageToEmployerMatch: new FormControl(this.appendPercentage(percentageToEmployerMatch), [Validators.required, Validators.pattern('[0-9]+(.?[0-9][0-9]?)?[%]')]),
              livingExpenses: new FormControl(this.additionalInformationValue.call(this, 'savings', 'savedLivingExpenses'), [Validators.required]),
              rentOrOwn: new FormControl(rentOrOwn, [Validators.required]),
              valueOfHouse: new FormControl(this.currencyUS(this.additionalInformationValue.call(this, 'home', 'value')), [Validators.required, Validators.pattern('[$][0-9]+(.?[0-9][0-9]?)?')]),
              rentAmount: new FormControl(this.currencyUS(rentAmount), [Validators.required, Validators.pattern('[$][0-9]+(.[0-9][0-9]?)?')]),
              mortgageDebt: new FormControl(this.currencyUS(this.additionalInformationValue.call(this, 'home', 'mortgageDebt')), [Validators.required, Validators.pattern('[$][0-9]+(.?[0-9][0-9]?)?')]),
              mortgageInterestRate: new FormControl(this.appendPercentage(this.additionalInformationValue.call(this, 'home', 'mortgageInterest')), [Validators.required, Validators.pattern('[0-9]+(.?[0-9][0-9]?)?[%]')]),
              fixedOrAdjustable: new FormControl(this.additionalInformationValue.call(this, 'home', 'mortgageType'), [Validators.required]),
              mortgageTerm: new FormControl(this.additionalInformationValue.call(this, 'home', 'mortgageTerm'), [Validators.required]),
              studentLoanDebt: new FormControl(this.currencyUS(this.additionalInformationValue.call(this, 'debt', 'studentLoanDebt')), [Validators.required, Validators.pattern('[$][0-9]+(.?[0-9][0-9]?)?')]),
              creditCardDebt: new FormControl(this.currencyUS(this.additionalInformationValue.call(this, 'debt', 'creditCardDebt')), [Validators.required, Validators.pattern('[$][0-9]+(.?[0-9][0-9]?)?')]),
              otherDebt: new FormControl(this.currencyUS(this.additionalInformationValue.call(this, 'debt', 'otherDebt')), [Validators.required, Validators.pattern('[$][0-9]+(.?[0-9][0-9]?)?')]),
            }),
          });
          if (this.profileInfoForm.get('general.dateOfBirth').value) {
            const date = this.profileInfoForm.get('general.dateOfBirth').value.split('/');
            this.profileInfoForm.get('general.dateOfBirth').setValue({
              year: Number(date[2]),
              month: Number(date[0]),
              day: Number(date[1]),
            });
          }

          // Use this subscribe to listen to the change in value of the fields when necessary.
          this.profileInfoForm.get('optional.rentOrOwn').valueChanges.subscribe((rentOrOwn) => {
            this.displayRentOrOwnInputFields(rentOrOwn);
          });
          this.profileInfoForm.get('general.dateOfBirth').valueChanges.subscribe((val) => {
            // console.log(val)
            if (val) {
              const padYear = '0000';
              const padMonth = '00';
              const date = (padYear + val.year).slice(-padYear.length) + '-' + (padMonth + val.month).slice(-padMonth.length) + '-' + val.day;
              this.dob = date;
              this.calculation(date);
            } else {
              this.dob = '';
            }
          });

          this.profileInfoForm.get('optional.areYouEmployed').valueChanges.subscribe((areYouEmployed) => {
            if (areYouEmployed === 'yes') {
              this.profileInfoForm.get('optional.annualIncome').setValidators([Validators.required, Validators.pattern('[$][0-9]+(.[0-9][0-9]?)?')]);
            } else {
              this.profileInfoForm.get('optional.annualIncome').setValidators([Validators.pattern('[$][0-9]+(.[0-9][0-9]?)?')]);
            }
            this.profileInfoForm.get('optional.annualIncome').updateValueAndValidity();
          });
          this.initialProfileInfoFormValues = this.profileInfoForm.value;
          this.displayRentOrOwnInputFields(rentOrOwn);
          this.ref.detectChanges();
        },
        (error) => {
          this.router.navigate(['login']);
          this.isLoading = false;
          this.ref.detectChanges();
        }
      )
    );

    this.SessionData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    this.getnextPayementDate();
  }

  getnextPayementDate() {
    this.commonService.getStripeCustomerId().subscribe((result) => {
      if (result) {
        this.commonService.getBillingInvoice(result['subscriptions']['data'][0]['id']).subscribe((billingInfo) => {
          const datePipe = new DatePipe('en-IN');
          const InvoiceDate = new Date(billingInfo['nextInvoiceDate']);
          InvoiceDate.setDate(InvoiceDate.getDate() - 1);
          const invoiceDate = datePipe.transform(InvoiceDate, 'MM/dd/yyyy');
          this.nextPayementDate = invoiceDate;
        })
      }
    })
  }

  openCloseUser(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    )
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

  cancelUser(type) {
    if (this.userErr) delete this.userErr;
    this.modalLoading=true;
    this.commonService.closeUser(type).subscribe((result) => {
      this.modalLoading=false;
      this.modalService.dismissAll()
      this.router.navigate(['login']);
    }, (error) => {
      this.modalLoading=false;
      this.userErr = error;
    })
  }



  configChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#%^&*\-+=])[A-Za-z\d~!@#%^&*\-+=]{8,80}$/)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  displayRentOrOwnInputFields(rentOrOwn) {
    if (rentOrOwn === 'own') {
      this.profileInfoForm.get('optional.rentAmount').disable();

      this.profileInfoForm.get('optional.valueOfHouse').enable();
      this.profileInfoForm.get('optional.mortgageDebt').enable();
      this.profileInfoForm.get('optional.mortgageInterestRate').enable();
      this.profileInfoForm.get('optional.fixedOrAdjustable').enable();
      this.profileInfoForm.get('optional.mortgageTerm').enable();
    } else if (rentOrOwn === 'rent') {
      this.profileInfoForm.get('optional.rentAmount').enable();

      this.profileInfoForm.get('optional.valueOfHouse').disable();
      this.profileInfoForm.get('optional.mortgageDebt').disable();
      this.profileInfoForm.get('optional.mortgageInterestRate').disable();
      this.profileInfoForm.get('optional.fixedOrAdjustable').disable();
      this.profileInfoForm.get('optional.mortgageTerm').disable();
    }
  }
  // TextField event handlers
  annualIncomeChange(annualIncome) {
    let decimalFixed;
    if (annualIncome.indexOf('.') > -1) {
      decimalFixed = annualIncome.substring(0, annualIncome.indexOf('.') + 3);
    } else {
      decimalFixed = annualIncome;
    }
    this.profileInfoForm.get('optional.annualIncome').setValue(this.currencyUS(decimalFixed));
  }

  openDialog() {
    document.getElementById('fileInput').click();
  }

  calculation(dob) {
    console.log(this.profileInfoForm.get('general.retirementAge').value);
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (age) {
      this.ageDifference = Number(this.profileInfoForm.get('general.retirementAge').value) - Number(age);
    }
    if (isNaN(age)) {
      this.profileInfoForm.get('general.age').setValue('');
      this.calenderFormatErrMsg = true;
    } else {
      this.profileInfoForm.get('general.age').setValue(age);
      // this.profileInfoForm.patchValue({
      //   age: age,
      //   duration: 5,
      // });
      this.calenderFormatErrMsg = false;
    }
  }

  segmentChange(index) {
    this.selectedSegmentIndex = index;
  }

  cancelFormEdit() {
    this.profileInfoForm.setValue(this.initialProfileInfoFormValues);
    this.ageDifference = null;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].name.split('.').pop() === 'JPEG' || event.target.files[0].name.split('.').pop() === 'jpeg' || event.target.files[0].name.split('.').pop() === 'png' || event.target.files[0].name.split('.').pop() === 'PNG' || event.target.files[0].name.split('.').pop() === 'JPG' || event.target.files[0].name.split('.').pop() === 'jpg') {
        const reader = new FileReader();
        this.errorMsg = false;
        this.invalidImageDimations = false;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            // Validate image dimantions
            if (img.naturalWidth > 768 || img.naturalHeight > 1024) {
              this.invalidImageDimations = true;
              this.ref.detectChanges();
            } else {
              // called once readAsDataURL is completed
              this.subscriptions.push(
                this.commonService.updateProfileImage({ profileimage: event.target.result }).subscribe(
                  (response) => {
                    this.profileimage = event.target.result;
                    this.activityHistroy(ActivityHistoryEnums.updateProfilePicture, ActivityHistoryEventTypeEnums.updateProfilePicture);
                    this.sharedData.onFirstComponentButtonClick({
                      type: 'image',
                      profileimage: this.profileimage,
                    });
                    this.myInputVariable.nativeElement.value = '';
                    this.ref.detectChanges();
                  },
                  (error) => {
                    console.log(error);
                  }
                )
              );
            }
          };
          img.src = reader.result as string; // The data URL
        };
      } else {
        this.errorMsg = true;
      }
    }
  }

  delete() {
    this.subscriptions.push(
      this.commonService.updateProfileImage({ profileimage: '' }).subscribe(
        (response) => {
          this.profileimage = '';
          this.sharedData.onFirstComponentButtonClick({
            type: 'image',
            profileimage: this.profileimage,
          });
          this.myInputVariable.nativeElement.value = '';
          this.errorMsg = false;
          this.invalidImageDimations = false;
          this.activityHistroy(ActivityHistoryEnums.updateProfilePicture, ActivityHistoryEventTypeEnums.deletedUserProfilePicture);
          this.ref.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  percentageContributionToRetirementPlanChange(amount) {
    const decimalFixed = this.formatDecimalForPercent(amount);

    this.profileInfoForm.get('optional.percentageContributionToRetirementPlan').setValue(this.appendPercentage(decimalFixed));
  }

  percentageToEmployerMatchChange(amount) {
    const decimalFixed = this.formatDecimalForPercent(amount);
    this.profileInfoForm.get('optional.PercentageToEmployerMatch').setValue(this.appendPercentage(decimalFixed));
  }

  rentAmountChange(amount) {
    const decimalFixed = this.formateDecimalForAmount(amount);
    this.profileInfoForm.get('optional.rentAmount').setValue(this.currencyUS(decimalFixed));
  }

  creditCardDebtChange(amount) {
    let decimalFixed;
    if (amount.indexOf('.') > -1) {
      decimalFixed = amount.substring(0, amount.indexOf('.') + 3);
    } else {
      decimalFixed = amount;
    }
    this.profileInfoForm.get('optional.creditCardDebt').setValue(this.currencyUS(decimalFixed));
  }

  studentLoanDebtChange(amount) {
    const decimalFixed = this.formateDecimalForAmount(amount);
    this.profileInfoForm.get('optional.studentLoanDebt').setValue(this.currencyUS(decimalFixed));
  }

  otherDebtChange(amount) {
    const decimalFixed = this.formateDecimalForAmount(amount);
    this.profileInfoForm.get('optional.otherDebt').setValue(this.currencyUS(decimalFixed));
  }

  valueOfHouseChange(amount) {
    const decimalFixed = this.formateDecimalForAmount(amount);
    this.profileInfoForm.get('optional.valueOfHouse').setValue(this.currencyUS(decimalFixed));
  }

  mortgageDebtChange(amount) {
    const decimalFixed = this.formateDecimalForAmount(amount);
    this.profileInfoForm.get('optional.mortgageDebt').setValue(this.currencyUS(decimalFixed));
  }

  mortgageInterestRateChange(value) {
    const decimalFixed = this.formatDecimalForPercent(value);

    this.profileInfoForm.get('optional.mortgageInterestRate').setValue(this.appendPercentage(decimalFixed));
  }

  formatPhone(obj) {
    const numbers = obj.replace(/\D/g, '');
    const char = { 3: '-', 6: '-' };
    obj = '';
    for (let i = 0; i < numbers.length; i++) {
      obj += (char[i] || '') + numbers[i];
    }
    return obj;
  }

  updateProfileInfo() {
    this.isSubmitted = true;
    this.emailVerifyLink = '';
    this.success = false;
    this.error = false;
    this.profileInfoForm.get('general.dateOfBirth').clearValidators();
    this.profileInfoForm.get('general.dateOfBirth').updateValueAndValidity();
    if (this.profileInfoForm.invalid || this.comparingAges || this.calenderFormatErrMsg) {
      return false;
    }

    this.isUpdateInProgress = true;
    const datePipe = new DatePipe('en-IN');
    const setDob = datePipe.transform(this.dob, 'MM/dd/yyyy');

    this.updatedUserInfo = {
      dateOfBirth: setDob ? setDob : '',
      firstName: this.profileInfoForm.get('general.firstName').value,
      lastName: this.profileInfoForm.get('general.lastName').value,
      emailAddress: this.profileInfoForm.get('general.emailAddress').value,
      mobileNumber: this.profileInfoForm.get('general.mobileNumber').value,
      streetAddress: this.profileInfoForm.get('general.streetAddress').value,
      suitAddress: this.profileInfoForm.get('general.suitAddress').value,
      city: this.profileInfoForm.get('general.city').value,
      state: this.profileInfoForm.get('general.state').value,
      zipCode: this.profileInfoForm.get('general.zipCode').value,
      age: this.profileInfoForm.get('general.age').value,
      retirementAge: this.profileInfoForm.get('general.retirementAge').value,
      accountInfo: this.profileInfoForm.get('communication.accountInfo').value,
      newsLetters: this.profileInfoForm.get('communication.newsLetters').value,
      secureLogin: this.profileInfoForm.get('communication.secureLogin').value,
      newFeatures: this.profileInfoForm.get('communication.newFeatures').value,
      betaPrograms: this.profileInfoForm.get('communication.betaPrograms').value,
      areYouMarried: this.profileInfoForm.get('optional.areYouMarried').value,
      numberOfKids: this.profileInfoForm.get('optional.numberOfKids').value,
      areYouEmployed: this.profileInfoForm.get('optional.areYouEmployed').value,
      annualIncome: this.profileInfoForm.get('optional.annualIncome').value.replace(/(?:,|\$)+/gi, ''),
      percentageContributionToRetirementPlan: this.profileInfoForm.get('optional.percentageContributionToRetirementPlan').value.replace(/(?:,|\%)+/gi, ''),
      PercentageToEmployerMatch: this.profileInfoForm.get('optional.PercentageToEmployerMatch').value.replace(/(?:,|\%)+/gi, ''),
      livingExpenses: this.profileInfoForm.get('optional.livingExpenses').value,
      rentOrOwn: this.profileInfoForm.get('optional.rentOrOwn').value,
      valueOfHouse: this.profileInfoForm.get('optional.valueOfHouse').value.replace(/(?:,|\$)+/gi, ''),
      mortgageDebt: this.profileInfoForm.get('optional.mortgageDebt').value.replace(/(?:,|\$)+/gi, ''),
      mortgageInterestRate: this.profileInfoForm.get('optional.mortgageInterestRate').value.replace(/(?:,|\%)+/gi, ''),
      fixedOrAdjustable: this.profileInfoForm.get('optional.fixedOrAdjustable').value,
      mortgageTerm: this.profileInfoForm.get('optional.mortgageTerm').value,
      studentLoanDebt: this.profileInfoForm.get('optional.studentLoanDebt').value.replace(/(?:,|\$)+/gi, ''),
      creditCardDebt: this.profileInfoForm.get('optional.creditCardDebt').value.replace(/(?:,|\$)+/gi, ''),
      otherDebt: this.profileInfoForm.get('optional.otherDebt').value.replace(/(?:,|\$)+/gi, ''),
      rent: this.profileInfoForm.get('optional.rentAmount').value.replace(/(?:,|\$)+/gi, ''),
    };
    this.saveUserData();
    this.ref.detectChanges();
  }

  saveUserData() {
    console.log('this.updatedUserInfo', this.updatedUserInfo);
    this.subscriptions.push(
      this.commonService.updateUserData(this.updatedUserInfo).subscribe(
        (response) => {
          this.isUpdateInProgress = false;
          this.initialProfileInfoFormValues = this.profileInfoForm.getRawValue();
          this.success = true;
          this.error = false;
          this.ref.detectChanges();
          this.activityHstoryUpdate();
          this.sharedData.onFirstComponentButtonClick({
            type: 'age',
            age: this.profileInfoForm.get('general.age').value,
          });
          const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
          updateData.age = this.profileInfoForm.get('general.age').value;
          updateData.retirementAge = this.profileInfoForm.get('general.retirementAge').value;
          this.sessionStorageService.updateSessionValue('YourInfoValue', updateData);
          if (this.profileInfoForm.get('general.retirementAge').dirty || this.profileInfoForm.get('general.age').dirty || this.ageDifference) {
            this.router.navigate(['dashboard', 'retirement-savings']);
          }
          // if (this.userResponse[0].email_address && this.userResponse[0].email_address !== this.profileInfoForm.get('general.emailAddress').value) {
          //   this.emailVerify();
          // }
          this.ref.detectChanges();
        },
        (error) => {
          this.isUpdateInProgress = false;
          this.error = true;
          this.success = false;
          this.ref.detectChanges();
        }
      )
    );
  }

  changePassword() {
    this.isChagnePasswordSubmitted = true;
    this.mismatchPassword = null;
    if (this.changePasswordForm.invalid || this.test(this.changePasswordForm.value.newPassword)) {
      return false;
    } else if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      return (this.mismatchPassword = 'Password’s do not match.');
    }
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

  get changePasswordError() {
    return this.changePasswordForm.controls;
  }

  conditionCheck() {
    if (this.showLine) {
      this.showLine = false;
    } else {
      this.showLine = true;
    }
  }

  modifyAge(val) {
    if (val === 'age') {
      this.profileInfoForm.get('general.dateOfBirth').setValue('');
      if (this.profileInfoForm.get('general.age').value.retirementAge) {
        this.ageDifference = Number(this.profileInfoForm.get('general.retirementAge').value) - Number(this.profileInfoForm.get('general.age').value);
      }
      this.calenderFormatErrMsg = false;
    } else if (val === 'rAge' && this.profileInfoForm.get('general.age').value.age) {
      this.ageDifference = Number(this.profileInfoForm.get('general.retirementAge').value) - Number(this.profileInfoForm.get('general.age').value);
      this.calenderFormatErrMsg = false;
    }

    if (Number(this.profileInfoForm.get('general.retirementAge').value) < Number(this.profileInfoForm.get('general.age').value)) {
      this.comparingAges = true;
    } else {
      this.comparingAges = false;
    }
  }
  // modifyAge(age) {
  //   if (Number(this.profileInfoForm.get('general.retirementAge').value) < Number(this.profileInfoForm.get('general.age').value)) {
  //     this.comparingAges = true;
  //     console.log(this.profileInfoForm.get('general.retirementAge').value);
  //     console.log(this.profileInfoForm.get('general.age').value);
  //   } else {
  //     this.comparingAges = false;
  //   }
  // }
  chekForCondition() {
    if (this.showLine) {
      return 'showLine';
    } else {
      return 'hideLine';
    }
  }

  retrieveCommunicationPreferenceValue(this, key) {
    return this.userInfo.userPreferences && this.userInfo.userPreferences[key] ? true : null;
  }

  additionalInformationValue(this, sectionKey, key) {
    const section = this.userInfo.additionalInformation[sectionKey];
    return section && section[key] ? section[key] : '';
  }

  riskModification() {
    this.sessionStorageService.updateSessionValue('riskNavigationInfo', {
      backNavigation: '../myprofile',
      proceedToNextModule: false,
    });
    this.router.navigate(['risk'], { relativeTo: this.route });
    this.displayRiskModal = true;
  }

  currencyUS(amount = '') {
    amount = amount.replace(/(?:,|\$)+/gi, '');
    if (amount.length > 0) {
      amount = '$' + amount;
    }
    return amount;
  }

  appendPercentage(value = '') {
    value = value.replace(/(?:,|\%)+/gi, '');
    if (value.length > 0) {
      value = value + '%';
    }
    return value;
  }
  formateDecimalForAmount(value) {
    let decimalFixed;
    if (value.indexOf('.') > -1) {
      decimalFixed = value.substring(0, value.indexOf('.') + 3);
    } else {
      decimalFixed = value;
    }
    return decimalFixed;
  }
  formatDecimalForPercent(value) {
    let decimalFixed;
    value = value.replace('%', '');
    if (value.indexOf('.') > -1) {
      decimalFixed = value.substring(0, value.indexOf('.') + 3);
    } else {
      decimalFixed = value;
    }
    return decimalFixed;
  }

  activityHistroy(event, eventType) {
    this.activityHistroyService.activityHistroy(event, eventType);
  }

  activityHstoryUpdate() {
    let updateProfile = true;
    this.getUserData();
    if (this.userResponse[0] && this.userResponse[0].first_name !== this.profileInfoForm.get('general.firstName').value) {
      this.activityHistroy(ActivityHistoryEnums.firstName, ActivityHistoryEventTypeEnums.firstName);
      updateProfile = false;
    }
    if (this.userResponse[0] && this.userResponse[0].last_name !== this.profileInfoForm.get('general.lastName').value) {
      this.activityHistroy(ActivityHistoryEnums.lastName, ActivityHistoryEventTypeEnums.lastName);
      updateProfile = false;
    }
    if (this.userResponse[0].phone !== this.profileInfoForm.get('general.mobileNumber').value) {
      this.activityHistroy(ActivityHistoryEnums.Phone, ActivityHistoryEventTypeEnums.Phone);
      updateProfile = false;
    }
    if (this.userResponse[0].email_address !== this.profileInfoForm.get('general.emailAddress').value) {
      this.activityHistroy(ActivityHistoryEnums.emailId, ActivityHistoryEventTypeEnums.updateEmail);
      this.emailVerify();
      updateProfile = false;
      this.ref.detectChanges();
    }
    if (this.userResponse[0].address1 !== this.profileInfoForm.get('general.streetAddress').value || this.userResponse[0].address2 !== this.profileInfoForm.get('general.suitAddress').value || this.userResponse[0].city !== this.profileInfoForm.get('general.city').value || this.userResponse[0].state_name !== this.profileInfoForm.get('general.state').value || this.userResponse[0].zip_code !== this.profileInfoForm.get('general.zipCode').value) {
      this.activityHistroy(ActivityHistoryEnums.updateProfile, ActivityHistoryEventTypeEnums.address);
      updateProfile = false;
    }
    if (this.userResponse[0].age !== this.profileInfoForm.get('general.age').value || this.userResponse[0].retirement_age !== this.profileInfoForm.get('general.retirementAge').value || this.ageDifference) {
      this.activityHistroy(ActivityHistoryEnums.ageOrRetirementAge, ActivityHistoryEventTypeEnums.updateAgeAndRetirementAge);
      updateProfile = false;
    }
    if (updateProfile) {
      this.activityHistroy(ActivityHistoryEnums.updateProfile, ActivityHistoryEventTypeEnums.updatedUserProfile);
      this.ref.detectChanges();
    }
    this.userResponse = '';
  }

  emailVerify() {
    this.commonService.updateEmail({ email: this.sessionStorageService.getSingleValueFromSession('YourInfoValue').email, token: this.sessionStorageService.getSingleValueFromSession('token'), newEmail: this.profileInfoForm.get('general.emailAddress').value }).subscribe((payload) => {
      console.log('payload', payload);
      if (payload['error']) {
        if (payload['detail'] === 'An account with the given email already exists') {
          this.emailVerifyLinkError = messages.EmailExists;
        } else {
          this.emailVerifyLinkError = payload['errorType'].detail;
        }
        this.isUpdateInProgress = false;
        this.ref.detectChanges();
      } else {
        this.emailVerifyLink = messages.EmailVerificationMesg;
        this.activityHistroy(ActivityHistoryEnums.emailId, ActivityHistoryEventTypeEnums.emailVerificationLink);
        this.userResponse[0].email_address = this.profileInfoForm.get('general.emailAddress').value;
        //  this.saveUserData();
        this.ref.detectChanges();
      }
    });
  }

  getUserData() {
    this.signUpDataService.getUserData().subscribe((users: [User]) => {
      this.isLoading = false;
      this.userResponse = users;
    });
  }

  ngOnDestroy() {
    this.resetVariables();
  }

  resetVariables() {
    this.modalService.dismissAll();
    this.isSubmitted = false;
    this.comparingAges = false;
    this.SessionData = null;
    this.profileInfoForm = null;
    this.initialProfileInfoFormValues = null;
    this.showLine = true;
    this.updatedUserInfo = null;
    this.displayRiskModal = false;
    this.isLoading = false;
    this.userInfo = null;
    this.isUpdateInProgress = false;
    this.success = false;
    this.error = false;
    this.projectData = {};
    this.profileimage = null;
    this.ageDifference = null;
    this.dob = null;
    this.minDate = null;
    this.maxDate = null;
    this.calenderFormatErrMsg = false;
    this.errorMsg = false;
    this.invalidImageDimations = false;
    this.userResponse = null;
    this.selectedSegmentIndex = 0;
    /*------- Change Password -------*/
    this.changePasswordForm = null;
    this.hideConfirmPassword = true;
    this.hideNewPassword = true;
    this.isChagnePasswordSubmitted = false;
    this.mismatchPassword = null;
    this.emailVerifyLinkError = null;
    this.emailVerifyLink = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
