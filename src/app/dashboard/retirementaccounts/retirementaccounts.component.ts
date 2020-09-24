import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "@app/shared/session-storage.service.ts";
import { CommonService } from "@app/shared/CommonService";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Subscription } from 'rxjs';
import { PopupComponent } from "@app/modules/components/popup/popup.component";
import { MatDialog } from "@angular/material";




@Component({
  selector: "ll-retirementaccounts",
  templateUrl: "./retirementaccounts.component.html",
  styleUrls: ["./retirementaccounts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetirementAccountsComponent implements OnInit, OnDestroy {
  userInfo: any;
  retirementAccounts: any;
  displayAnalysis: boolean = false;
  showLine: boolean = true;
  showAddAccountButton = false;
  date: any = new Date();
  subscriptions: Subscription[] = [];
  retirementAccountsSum: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private ref: ChangeDetectorRef,
    private sessionStorageService: SessionStorageService,
    public dialog: MatDialog,
    
  ) {
    this.getRetirementsAccounts();
    this.subscriptions.push(
      dialog.afterAllClosed.subscribe(() => {
        this.getRetirementsAccounts();
      })
    );
  }

  ngOnInit(): void {
    this.userInfo = this.sessionStorageService.getSingleValueFromSession(
      "YourInfoValue"
    );
    this.getRetirementsAccounts();
  }

  getRetirementsAccounts() {
    this.subscriptions.push(
      this.commonService.getRetirementAccounts().subscribe(
        (response) => {
          this.retirementAccounts = response;
          console.log(this.retirementAccounts);
          this.retirementAccountsSum = 0;
          for (var i = 0; i < this.retirementAccounts.length; i++) {
            this.retirementAccountsSum += this.retirementAccounts[i].balance.amount;
          }
          this.addRetirementAccountCondition();
          this.ref.detectChanges();
        },
        (error) => {}
      )
    );
   
  }

  DeleteRetirementAccount(item) {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: "500px",
      backdropClass: "custom-dialog-backdrop",
      panelClass: "custom-dialog-panel-class",
      data: {
        deleteRetirementAccountConfirmation:
          "Are you sure, you want to unregister the retirement account?",
        providerAccountId: item.providerAccountId,
        Id: item.id,
        getRetirementAccounts: this.getRetirementsAccounts()
      },
    });
  }

  addRetirementAccountCondition() {
    if (
      (this.userInfo.paymentPlan == "Basic" ||
        this.userInfo.paymentPlan == null) &&
      this.retirementAccounts.length == 0
    ) {
      this.showAddAccountButton = true;
    } else if (
      this.userInfo.paymentPlan == "Signature" &&
      this.retirementAccounts.length <= 2
    ) {
      this.showAddAccountButton = true;
    } else if (
      this.userInfo.paymentPlan == "Premium" &&
      this.retirementAccounts.length <= 5
    ) {
      this.showAddAccountButton = true;
    }
  }

  collapseConditionCheck() {
    if (this.showLine) {
      this.showLine = false;
    } else {
      this.showLine = true;
    }
  }

  classForCollapse() {
    if (this.showLine) return "showLine";
    else return "hideLine";
  }

  addRetirementAccount() {
    this.sessionStorageService.updateSessionValue(
      "registerRetirementNavigationInfo",
      {
        backNavigation: "../retirement-accounts",
        proceedToNextModule: false,
      }
    );

    this.router.navigate(["../add-retirement-account"], {
      relativeTo: this.route.parent,
    });
  }

  displayAccontDetails() {
    this.displayAnalysis = true;
  }

  hideAnalysis() {
    this.displayAnalysis = false;
  }

  ngOnDestroy() {
    this.resetVariables();
  }

  resetVariables() {
    this.userInfo = null;
    this.retirementAccounts = null;
    this.displayAnalysis = false;
    this.showLine = true;
    this.showAddAccountButton = false;
    this.date = new Date();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
