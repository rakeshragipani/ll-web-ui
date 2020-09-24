import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SessionStorageService } from '@app/shared/session-storage.service';

@Component({
    selector: 'll-dashboard-retirement-savings',
    templateUrl: './retirement-savings.component.html',
})
export class DashboardRetirementSavingsComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private sessionStorageService: SessionStorageService) {

    }

    ngOnInit() {
        this.sessionStorageService.updateSessionValue('riskNavigationInfo', {
            'backNavigation': '../risk-analysis',
            'proceedToNextModule': false
        });
        this.router.navigate(['risk'], { relativeTo: this.route });
    }

}