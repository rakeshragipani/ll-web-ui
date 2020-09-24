import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import { SessionStorageService } from '@app/shared/session-storage.service.ts';

@Component({
  selector: 'll-add-retirementaccounts',
  templateUrl: './add-retirementaccounts.component.html',
  styleUrls: ['./add-retirementaccounts.component.scss']
})
export class AddRetirementAccountsComponent implements OnInit {

  constructor(private router :Router, private route : ActivatedRoute, private sessionStorageService : SessionStorageService) { }

  ngOnInit(): void {

    // this.sessionStorageService.updateSessionValue('registerRetirementNavigationInfo', {
    //   'backNavigation' : '../retirement-accounts',
    //   'proceedToNextModule' : false
    // });

    this.router.navigate(['register-retirement-account'], {relativeTo :this.route});
  }

}
