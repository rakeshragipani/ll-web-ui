import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'll-account-optimization',
    templateUrl: './account-optimization.component.html'
})

export class AccountOptimizationComponent implements OnDestroy {
    accountOptimizationData: any;
    popupMessage: any;
    yourInfo: any;
    hideNext = false;
    subscriptions: Subscription[] = []

    constructor(private router: Router,
        private commonService: CommonService,
        private ref: ChangeDetectorRef,
        private sessionStorageService: SessionStorageService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.getAccountOptimizationData();
        this.yourInfo = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
        this.hideNextButton();
    }

    hideNextButton() {
        if ((this.yourInfo.paymentPlan == 'Basic') || (this.yourInfo.paymentPlan == null))
            return false;
        else return true;
    }

    navigateToAccountDiversification() {
        this.router.navigate(['../account-diversification'], { relativeTo: this.route });
    }

    getAccountOptimizationData() {
        this.subscriptions.push(this.commonService.getAccountOptimization().subscribe(response => {
            this.accountOptimizationData = response['accounts'][0]['optimization_details']['optimization_breakdown']['allocation_summary'];
            this.popupMessage = response['accounts'][0]['optimization_details']['summary']['text']
            console.log(this.accountOptimizationData);
            this.ref.detectChanges();
        }, (error) => {
            console.log(error);
        }));
    }
    
    ngOnDestroy() {
        this.accountOptimizationData = null;
        this.popupMessage = null;
        this.yourInfo = null;
        this.hideNext = false;
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}