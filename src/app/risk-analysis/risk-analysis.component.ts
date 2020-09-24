import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'll-risk-analysis',
  templateUrl: './risk-analysis.component.html',
})
export class LlRiskAnalysisComponent implements OnInit {

  constructor(private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() {
    let routesArray = this.router.url.split('/') || [];
    if (routesArray.indexOf('myprofile') !== -1 || routesArray.indexOf('retirement-savings') !==-1) {
      this.router.navigate(['retirement-savings'], { relativeTo: this.route });
    } else if (routesArray.indexOf('dashboard') !== -1) {
      this.router.navigate(['risk-assessment4'], { relativeTo: this.route });
    } else {
      this.router.navigate(['retirement-savings'], { relativeTo: this.route });
    }
  }
}