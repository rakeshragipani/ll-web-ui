import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/CommonService';
import { Subscription } from 'rxjs';


@Component({
    selector: 'll-account-investment',
    templateUrl: './account-investment.component.html',
    styleUrls: ['./account-investment.component.scss']

})

export class AccountInvestmentComponent implements OnDestroy {
    accountOptimizationData: any;
    subscriptions: Subscription[] = []


    constructor(private router: Router, private route: ActivatedRoute,
        private ref: ChangeDetectorRef,

        private commonService: CommonService) {

    }

    ngOnInit() {
        this.getAccountOptimizationData();
    }

    accountOptimizationDiversificationChart() {
        this.router.navigate(['../account-diversification'], { relativeTo: this.route })
    }

    getAccountOptimizationData() {
        this.subscriptions.push(this.commonService.getAccountOptimization().subscribe(response => {
            this.accountOptimizationData = response['accounts'][0]['optimization_details']['optimization_breakdown']['rebalance_summary'];
            console.log(this.accountOptimizationData);
            this.ref.detectChanges();
        }, (error) => {
            console.log(error);
        }));
    }

    ngOnDestroy() {
        this.accountOptimizationData = null;
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}