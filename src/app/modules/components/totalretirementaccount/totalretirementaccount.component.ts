import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { EncrDecrService } from "@app/shared/EncrDecrService";
import { TranslateService } from "@ngx-translate/core";

import { SignUpDataService } from "@app/sign-up/ll-signup-service";

import { SessionStorageService } from "@app/shared/session-storage.service.ts";
import { CommonService } from "@app/shared/CommonService";

@Component({
  selector: "totalretirementaccount",
  templateUrl: "./totalretirementaccount.component.html",
  styleUrls: ["./totalretirementaccount.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalRetirementAccount implements OnInit, AfterViewInit {
  date: any = new Date();
  parentData: any;
  totalAmount: any;
  hideAddAccount = false;
  totalRetirementAccountInfo: any = {};
  moveToAccountanalysis5 = false;
  moveToAccountanalysis1 = false;
  accountData: any;
  accountAnalysisData: any;
  registerRetirementAccountNavigationObject: {} = {
    proceedToNextModule: true,
  };
  @ViewChild("pageHeight") targetElement: any;
  height: any;
  supportLanguages = ["en", "fr", "ta", "hi"];
  sessionProviderDetails: any;
  showLoader = false;
  sessionProviderAccountId: any;
  accountType: any;
  holdingsData: any;
  providerId: any;
  holdings: any;
  lastUpdatedTime: any;
  showHoldingsLoader: boolean;
  noHoldings:boolean;
  constructor(
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private EncrDecr: EncrDecrService,
    private translateService: TranslateService,
    private ref: ChangeDetectorRef,
    private signUpDataService: SignUpDataService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private commonService: CommonService,
  ) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang("en");
    const browserL = this.translateService.getBrowserLang();
    this.translateService.use(browserL);
    const navObj = this.sessionStorageService.getSingleValueFromSession(
      "registerRetirementNavigationInfo"
    );
    if (navObj) {
      this.registerRetirementAccountNavigationObject = navObj;
    }
    this.sessionProviderAccountId = this.sessionStorageService.getSingleValueFromSession(
      "registerRetirementPlan"
    ).selectedAccount.id;
    this.providerId = this.sessionStorageService.getSingleValueFromSession(
      "registerRetirementPlan"
    ).selectedAccount.providerAccountId;
    this.accountType = this.sessionStorageService.getSingleValueFromSession(
      "accountType"
    );
    this.sessionProviderDetails = this.sessionStorageService.getSingleValueFromSession('providerAccountDetails');
  }

  ngOnInit(): void {
    // let today: string;
    this.parentData = 4.4;
    // this.totalAmount = $71,058;
    this.getProviderAccountById();
    this.getAccountAnalysisData();
    if (this.router.url.indexOf("signup") > -1) {
      this.hideAddAccount = true;
    }
  }

  getAccountAnalysisData() {
    this.showLoader = true;
    this.commonService.getAccountAnalysis().subscribe(
      (response) => {
        this.accountAnalysisData = response;
        console.log(this.accountAnalysisData);
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (error) => {}
    );
  }

  navigateToParentSection() {
    this.router.navigate(
      [
        "../" +
          this.registerRetirementAccountNavigationObject["backNavigation"],
      ],
      { relativeTo: this.route.parent }
    );
  }

  goBack() {
    this.router.navigate(["../register-retirement-plan"], {
      relativeTo: this.route.parent,
    });
  }
  next() {
    this.router.navigate(["../account-analysis"], {
      relativeTo: this.route.parent,
    });
  }

  ngAfterViewInit() {
    this.height =
      this.targetElement &&
      this.targetElement.nativeElement &&
      this.targetElement.nativeElement.offsetHeight > 470
        ? this.targetElement.nativeElement.offsetHeight
        : 470;
    this.ref.detectChanges();
  }

  getProviderAccountById() {
    this.showLoader = true;
    this.commonService
      .getProviderAccountById(this.sessionProviderAccountId)
      .subscribe(
        (res) => {
          const accountDataRes: any = res;
          this.accountData = accountDataRes[0];
          this.showLoader = false;
          this.ref.detectChanges();
        },
        (error) => {
          this.showLoader = false;
          this.ref.detectChanges();
        }
      );
  }

  getMenu(dat) {}

  getMessage(message: string) {
    console.log(message, this.parentData);
    if (this.parentData === message) {
      this.moveToAccountanalysis5 = false;
      this.moveToAccountanalysis1 = false;
    } else {
      this.getMenu(message);
    }
  }

  goToViewAnaylsisPage() {
    this.moveToAccountanalysis5 = true;
  }
  getHoldingsData() {
    this.showHoldingsLoader = true;
    console.log(this.sessionProviderDetails);
    this.commonService.getHoldingsData(this.providerId, this.sessionProviderAccountId).subscribe(
      (response) => {
        this.holdingsData = response;
        this.holdings=this.holdingsData;
        this.lastUpdatedTime = this.holdings[0].lastUpdated;
        this.showHoldingsLoader = false;
        if (this.holdings.length==0){
          this.noHoldings=true;
        }
        this.ref.detectChanges();
      },
      (error) => { }
    );
  }
}
