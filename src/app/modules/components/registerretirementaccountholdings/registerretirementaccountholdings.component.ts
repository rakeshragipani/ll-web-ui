import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonService } from '@app/shared/CommonService';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '@app/shared/session-storage.service';
import message from 'assets/json/en.json';
import { Subscription } from 'rxjs';
import { UserInfoService } from '@app/shared/user-info.service';


@Component({
  selector: 'll-registerretirementaccountholdings',
  templateUrl: './registerretirementaccountholdings.component.html',
  styleUrls: ['./registerretirementaccountholdings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterretirementaccountholdingsComponent implements OnInit, AfterViewInit, OnDestroy {
  public showLoader = false;
  public accountData: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  @ViewChild('pageHeight') targetElement: any;
  height: any;
  selectedData: any;
  radioSelected: any;
  sessionProviderDetails: any;
  selectAccount: string;
  showTable = false;
  friendlyNames: any;
  noAccountsMessage: string;
  userInfo: any;
  subscriptions: Subscription[] = []

  constructor(private commenService: CommonService,
    private userInfoService: UserInfoService,
    private ref: ChangeDetectorRef, private translateService: TranslateService, public router: Router, private route: ActivatedRoute, private sessionStorageService: SessionStorageService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.sessionProviderDetails = this.sessionStorageService.getSingleValueFromSession('providerAccountDetails');
  }

  ngOnInit(): void {
    this.getAccounts();
    this.getFriendlyAccounts();
  }
  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    this.ref.detectChanges();
  }
  getAccounts() {
    this.showLoader = true;
    const providerStatus = {
      requestId: 'nsckUhpFQ+z8vk7d1/qhJy6IEdc=',
      status: 'Active',
      providerAccountId: this.sessionProviderDetails.providerDetails.id,
    };
    this.subscriptions.push(this.commenService.getProviderAccount(providerStatus).subscribe(
      (res) => {
        this.accountData = res;
        console.log(this.accountData);
        if (this.accountData === null || this.accountData.length === 0) {
          this.noAccountsMessage = message.noAccountsMessage;
        }
        if (this.sessionStorageService.getSingleValueFromSession('YourInfoValue').state == "riskanalyzed") {
          this.userStateChange();
        }
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (error) => {
        this.showLoader = false;
        this.ref.detectChanges();
      }
    ));
  }

  userStateChange() {
    this.subscriptions.push(this.commenService
      .sendAnalysisScore({
        username: this.sessionStorageService.getSingleValueFromSession(
          "userId"
        ),
      })
      .subscribe((payload: any) => {
        const updateData = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
        updateData.state = "registeredaccounts";
        this.sessionStorageService.updateSessionValue('YourInfoValue', updateData);
        this.userInfo = this.userInfoService.getUserInfo();
        // this.userInfo.state = "registeredaccounts";
      }));
  }



  getFriendlyAccounts() {
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getFriendlyAccounts().subscribe(
      (res) => {
        this.friendlyNames = res;
        console.log(this.friendlyNames);
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (error) => {
        this.showLoader = false;
        this.ref.detectChanges();
      }
    ));
  }

  onItemChange(item) {
    this.selectedData = item;
  }

  next = (): void => {
    this.sessionStorageService.updateSessionValue('registerRetirementPlan', {
      selectedAccount: this.selectedData,
    });
    if (this.selectedData) {
      this.router.navigate(['../register-retirement-plan'], { relativeTo: this.route.parent });
    } else {
      this.selectAccount = 'Please select an account.';
    }
  };

  goBack() {
    this.router.navigate(['../company-retirement-account'], { relativeTo: this.route.parent });
  }

  showFriendlyTable() {
    this.showTable = true;
  }

  ngOnDestroy() {
    this.showLoader = false;
    this.accountData = null;
    this.targetElement = null;
    this.height = 0;
    this.selectedData = null;
    this.radioSelected = null;
    this.sessionProviderDetails = null;
    this.selectAccount = null;
    this.showTable = false;
    this.friendlyNames = null;
    this.noAccountsMessage = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
