import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {SessionStorageService} from '@app/shared/session-storage.service';

@Component({
  selector: 'll-myprofile',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class DashboardRiskAnalysisComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private sessionStorageService: SessionStorageService){

  }

  ngOnInit(){
    this.sessionStorageService.updateSessionValue('riskNavigationInfo', {
      'backNavigation' : '../risk-analysis',
      'proceedToNextModule' : false
    });
    this.router.navigate(['risk'],{relativeTo:this.route});
  }

}
