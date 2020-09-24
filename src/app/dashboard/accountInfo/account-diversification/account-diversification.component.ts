import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'll-account-diversification',
    templateUrl: './account-diversification.component.html',
    styleUrls: ['./account-diversification.component.scss']

})

export class AccountDiversificationComponent implements OnDestroy {
    accountOptimizationData: any;
    yourInfo: any;
    subscriptions: Subscription[] = []

    constructor(private router: Router, private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private sessionStorageService: SessionStorageService,
        private commonService: CommonService) {

    }

    ngOnInit() {
        this.getAccountOptimizationData();
        this.yourInfo = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    }

    hideNextButton() {
        if (this.yourInfo.paymentPlan == 'Signature') {
            return false;
        } else {
            return true;
        }
    }

    accountOptimization() {
        this.router.navigate(['../account-optimization'], { relativeTo: this.route });
    }

    accountOptimizationInvestmentsChart() {
        this.router.navigate(['../account-investment'], { relativeTo: this.route })
    }

    getAccountOptimizationData() {
        this.subscriptions.push(this.commonService.getAccountOptimization().subscribe(response => {
            this.accountOptimizationData = response['accounts'][0]['optimization_details']['optimization_breakdown']['diversification_summary'];
            console.log(this.accountOptimizationData);
            this.ref.detectChanges();
        }, (error) => {
            console.log(error);
        }));
    }

    ngOnDestroy() {
        this.accountOptimizationData = null;
        this.yourInfo = null;
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}