import { Component, OnDestroy , OnInit} from '@angular/core';
import { Router } from '@angular/router';
// import { LlClientGuardService } from '@app/ll-common/ll-client-guard/ll-client-guard.service';

import {LlSideNavService} from './ll-sidenav.service';

@Component({
  selector: 'll-sidenav',
  templateUrl: './ll-sidenav.component.html',
  styleUrls: ['./ll-sidenav.component.scss']
})
export class LlSidenavComponent implements OnDestroy {
  child:Number = 0;
  subjectObservable : any;
  

  constructor(private _router: Router, private llSideNavService: LlSideNavService) {
    this.subjectObservable = this.llSideNavService.getSideNavSubscribableSubject().subscribe(value=>{
      this.updateSideNavChildValue(value);
    });
   }

   click(value){
     this.redirectToPage(value);
   };

  ngOnDestroy(){
    this.subjectObservable.unsubscribe();
  }

  updateSideNavChildValue(value){
    switch (value) {
      case 'your-info':
        return this.child = 0;
      case 'create-account':
        return this.child = 1;
      case 'risk':
        return this.child = 2;
      case 'risk-assessment' :
        return this.child = 3;  
      case 'register-retirement-account':
        return this.child = 4;
      case 'account-analysis':
        return this.child = 5;
      case 'subscription':
        return this.child = 6;
      default:
        return this.child = 0;
    } 
  }

  redirectToPage(value){
    switch (value) {
      case 0:
        return this._router.navigate(['signup', 'your-info']);
      case 1:
        return this._router.navigate(['signup', 'create-account']);
      case 2:
        return this._router.navigate(['signup', 'risk', 'retirement-savings']);
      case 3 :
        return this._router.navigate(['signup', 'risk', 'risk-assessment']);
      case 4:
        return this._router.navigate(['signup', 'register-retirement-account']);
      case 5:
        return this._router.navigate(['signup', 'account-analysis']);
      case 6:
        return this._router.navigate(['signup', 'subscription']);
      default:
        return this._router.navigate(['signup', 'your-info']);
    }
  }

}
