import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { LlYourInfoService } from '@app/modules/components/yourinfo/ll-yourinfo-page.service';
import { UserInfoService } from '@app/shared/user-info.service';
import { User } from '@app/sign-up/user.model';
import { DataShareService } from '@app/shared/data-share.service';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { CommonService } from '@app/shared/CommonService';
import { LlClientGuardService } from '@app/ll-common/ll-client-guard/ll-client-guard.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { routingJSON } from "../../assets/json/routing_dashboard";

@Component({
  selector: 'll-dashboard',
  templateUrl: './dashboard.main.component.html',
  styleUrls: ['./dashboard.main.component.scss'],
})
export class LlDashboardMainComponent implements OnInit, OnDestroy {
  getStatus: any;
  selectedSection = '';
  data: any;
  isLoading = false;
  user: any = {};
  showToggle = false;
  userName: any; // Displays full name of user
  userShortName = ''; // Diplays short name of user(ex: Left Lane => LL)
  profileimage: any;
  message: any;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private signUpDataService: SignUpDataService, private userInfoService: UserInfoService, private tenantService: LlClientGuardService, private sessionStorageService: SessionStorageService, private ref: ChangeDetectorRef, private _sharedService: DataShareService, private commonService: CommonService, private llYourInfoService: LlYourInfoService, public dialog: MatDialog) {
    this.getStatus = this.sessionStorageService.getSingleValueFromSession('status');
    console.log(this.getStatus);
  }

  ngOnInit() {
    this.listenRouterEvents();
    this.activityWatcher();
    this.isLoading = true;
    if (this._sharedService.subsVar === undefined) {
      this.subscriptions.push(
        this._sharedService.invokeFirstComponentFunction.subscribe((name: string) => {
          this.firstFunction(name);
        })
      );
    }
    if (this._sharedService.amountVar === undefined) {
      this.subscriptions.push(
        this._sharedService.invokeAmountChangeFunction.subscribe((name: string) => {
          this.amountChangeFunction(name);
        })
      );
    }
    this.subscriptions.push(
      this.signUpDataService.getUserData().subscribe(
        (users: [User]) => {
          this.userInfoService.updateUserInfo(users);
          this.data = JSON.parse(this.tenantService.getTenant());
          this.user = this.userInfoService.getUserInfo();
          this.sessionStorageService.updateSessionValue('YourInfoValue', this.user);
          this.signUpDataService.navigateToLastSavedStep();
          this.isLoading = false;
          if (this.user.state === 'riskanalyzed') {
            this.router.navigate(['dashboard', 'addretirementaccount']);
            this.selectedSection = 'addretirementAccount';
          } else if (this.user.state === 'registeredaccounts' || this.user.state === 'subscription') {
            this.router.navigate(['dashboard', 'retirement-accounts']);
            this.selectedSection = 'retirementAccounts';
          } else if (this.user.state === 'signedup') {
            this.router.navigate(['dashboard', 'retirement-savings']);
            this.selectedSection = 'retirementSavings';
          }
          const fullName = this.user.firstName + ' ' + this.user.lastName;
          this.userName = fullName[0].toUpperCase() + fullName.slice(1);
          if (this.userName) {
            const matches = this.userName.match(/\b(\w)/g);
            this.userShortName = matches.join('');
          }
          if (this.user.profileImage) {
            const enc = new TextDecoder('utf-8');
            const arr = new Uint8Array(this.user.profileImage['data']);
            this.profileimage = enc.decode(arr);
          }
          console.log(this.user);
          this.ref.detectChanges();
        },
        (error) => {
          this.router.navigate(['login']);
          this.isLoading = false;
        }
      )
    );
  }

  listenRouterEvents() {
    this.subscriptions.push(
      this.router.events.subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          const href = window.location.href;
          if (href.includes('addretirementaccount') || href.includes('retirement-accounts')) {
            this.selectedSection = 'retirementAccounts';
          } else if (href.includes('retirement-savings')) {
            this.selectedSection = 'retirementSavings';
          } else if (href.includes('risk-analysis')) {
            this.selectedSection = 'riskAnalysis';
          } else if (href.includes('account-info')) {
            this.selectedSection = 'accountInfo';
          } else if (href.includes('reports')) {
            this.selectedSection = 'reports';
          } else {
            this.selectedSection = '';
          }
        }
      })
    );
  }

  firstFunction(data) {
    this.profileimage = data;
    this.ref.detectChanges();
  }

  amountChangeFunction(data) {
    this.user.age = data;
    this.ref.detectChanges();
  }

  signout() {
    this.subscriptions.push(
      this.commonService.logOut({ login_time: this.sessionStorageService.getSingleValueFromSession('login_time') }).subscribe(
        (response) => {
          this.llYourInfoService.updateUserInfo({});
          this.sessionStorageService.resetSession(); // clearing session on logout
          this.router.navigate(['login'], { replaceUrl: true }); // Navigate to login page
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  activityWatcher() {
    // The number of seconds that have passed
    // since the user was active.
    let secondsSinceLastActivity = 0;

    // Five minutes. 60 x 5 = 300 seconds.
    const maxInactivity = 300;

    // Setup the setInterval method to run
    // every second. 1000 milliseconds = 1 second.
    const a = setInterval(() => {
      const that = this;
      secondsSinceLastActivity++;

      if (secondsSinceLastActivity > maxInactivity) {
        // console.log('User has been inactive for more than ' + maxInactivity + ' seconds');
        this.dialog.closeAll();
        this.signout();
        that.router.navigate(['/login']);
        clearInterval(a);
      }
    }, 1000);

    // The function that will be called whenever a user is active
    function activity() {
      // reset the secondsSinceLastActivity variable
      // back to 0
      secondsSinceLastActivity = 0;
    }

    // An array of DOM events that should be interpreted as
    // user activity.
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // add these events to the document.
    // register the activity function as the listener parameter.
    activityEvents.forEach(function (eventName) {
      document.addEventListener(eventName, activity, true);
    });
  }

  myProfile() {
    this.selectedSection = 'myprofile';
    this.router.navigate(['dashboard', 'myprofile']);
    console.log(this.user);
  }

  billing() {
    this.selectedSection = 'billing';
    this.router.navigate(['dashboard', 'billing']);
  }

  activityHistory() {
    this.selectedSection = 'activityhistory';
    this.router.navigate(['dashboard', 'activityhistory']);
  }

  needHelp() {
    this.selectedSection = 'needahelp';
    this.router.navigate(['dashboard', 'needahelp']);
  }

  tools() {
    this.selectedSection = 'tools';
    this.router.navigate(['dashboard', 'tools']);
  }

  redirectToRetirementAccounts() {
    const updatedData = this.sessionStorageService.getSingleValueFromSession(
      "YourInfoValue"
    );
      this.selectedSection = 'retirementAccounts';
      this.router.navigate(["dashboard", routingJSON[updatedData.state]]);
     
  }

  redirectToRetirementSavings() {
    if (this.selectedSection != 'retirementSavings') {
      this.selectedSection = 'retirementSavings';
      this.router.navigate(['dashboard', 'retirement-savings']);
    }
  }

  redirectToRiskAnalysis() {
    if (this.selectedSection != 'riskAnalysis') {
      this.selectedSection = 'riskAnalysis';
      this.router.navigate(['dashboard', 'risk-analysis']);
    }
  }

  redirectToAccountInfo() {
    if (this.selectedSection != 'accountInfo') {
      this.selectedSection = 'accountInfo';
      this.router.navigate(['dashboard', 'account-info']);
    }
  }
  reportsAndStatements() {
    if (this.selectedSection != 'reports') {
      this.selectedSection = 'reports';
      this.router.navigate(['dashboard', 'reports']);
    }
  }
  Togglebar() {
    this.showToggle = !this.showToggle;
  }

  ngOnDestroy() {
    this.resetVariables();
  }

  resetVariables() {
    this.getStatus = null;
    this.selectedSection = '';
    this.data = null;
    this.isLoading = false;
    this.user = {};
    this.showToggle = false;
    this.userName = null;
    this.userShortName = '';
    this.profileimage = null;
    this.message = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
