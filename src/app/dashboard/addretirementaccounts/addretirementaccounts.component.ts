import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { User } from '@app/sign-up/user.model';
import { UserInfoService } from '@app/shared/user-info.service';
import { LlClientGuardService } from '@app/ll-common/ll-client-guard/ll-client-guard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-addretirementaccounts',
  templateUrl: './addretirementaccounts.component.html',
  styleUrls: ['./addretirementaccounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddRetirementAccountsComponent implements OnInit, OnDestroy {
  userInfo: any = {};
  data: any;
  isLoading: boolean = false;
  subscriptions: Subscription[] = []

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router, private route: ActivatedRoute,
    private signUpDataService: SignUpDataService,
    private userInfoService: UserInfoService,
    private tenantService: LlClientGuardService,
    private ref: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions.push(this.signUpDataService.getUserData().subscribe((users: [User]) => {
      this.userInfoService.updateUserInfo(users);
      this.data = JSON.parse(this.tenantService.getTenant());
      this.userInfo = this.userInfoService.getUserInfo();
      this.isLoading = false;
      console.log("userInfo", this.userInfo);
      this.ref.detectChanges();
    },
      (error) => {
        this.router.navigate(['login']);
        this.isLoading = false;
      }
    ));
    //this.userInfo = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');

  }

  addRetirementAccount() {
    console.log('usrinfo1 -----------------------', this.userInfo);
    this.sessionStorageService.updateSessionValue('registerRetirementNavigationInfo', {
      'backNavigation': '../addretirementaccount',
      'proceedToNextModule': false
    });

    this.router.navigate(['../add-retirement-account'], { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.resetVariables()
  }

  resetVariables() {
    this.userInfo = {};
    this.data = null;
    this.isLoading = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
