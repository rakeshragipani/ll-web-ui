import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '@app/shared/session-storage.service';

@Component({
  selector: 'registerretirementplan',
  templateUrl: './registerretirementplan.component.html',
  styleUrls: ['./registerretirementplan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterRetirementPlanComponent implements OnInit, AfterViewInit, OnDestroy {
  parentData: any;
  retirementSavingForm: FormGroup;
  isSubmitted = false;
  retirementsavingsInfo: any = {};
  moveToRiskAssessment = false;
  moveToAccountanalysis5 = false;
  moveToAccountanalysis1 = false;
  moveToTotalRetirementAccount = false;
  closeResult: string;
  showLoader = false;
  AccountData: any;
  selectedData: any;
  selectedOption = false;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  accountType: any;
  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private signUpDataService: SignUpDataService, private router: Router, private route: ActivatedRoute, private sessionStorageService: SessionStorageService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    // const browserL = this.translateService.getBrowserLang();
    // this.translateService.use(browserL);
    this.accountType = this.sessionStorageService.getSingleValueFromSession('accountType');
  }

  ngOnInit(): void {
    this.parentData = 4.3;
    // this.retirementsavingsInfo.amountsaved = 0;
    this.retirementSavingForm = this.formBuilder.group({
      amountsaved: [0, Validators.required],
    });
  }

  next = (): void => {
    this.router.navigate(['../total-retirement-account'], {relativeTo : this.route.parent});
  };

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  getMenu(dat) {
    console.log('dat is in 3', this.parentData, dat);
  }

  getMessage(message: string) {
    if (this.parentData === message) {
      console.log('message-------------retment', message);

      this.moveToTotalRetirementAccount = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack() {
    this.router.navigate(['../register-retirement-account-holdings'], { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.parentData = null;
    this.retirementSavingForm = null;
    this.isSubmitted = false;
    this.retirementsavingsInfo = null;
    this.moveToRiskAssessment = false;
    this.moveToAccountanalysis5 = false;
    this.moveToAccountanalysis1 = false;
    this.moveToTotalRetirementAccount = false;
    this.closeResult = null;
    this.showLoader = false;
    this.AccountData = null;
    this.selectedData = null;
    this.selectedOption = false;
    this.targetElement = null;
    this.height = 0;
    this.accountType = null;
  }
}
