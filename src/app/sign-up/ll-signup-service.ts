import { Injectable } from '@angular/core';
import { CommonService } from '@app/shared/CommonService';

import { Router, ActivatedRoute } from '@angular/router';

import {User} from './user.model';

import { UserInfoService } from '@app/shared/user-info.service';

@Injectable()
export class SignUpDataService {
    userDetails : any;
  constructor(private commonService: CommonService, private userInfoService : UserInfoService,
    private router : Router, private route :ActivatedRoute) {

   }

   getUserData(){
       return this.commonService.getUserData();
   }

   navigateToLastSavedStep(){
    this.userDetails = this.userInfoService.getUserInfo() || {};
    let userState = this.userDetails && this.userDetails.state ? this.userDetails.state : '';
    switch (userState) {
        case 'signedup':
            return this.router.navigate(['signup','risk']);
        case 'riskanalyzed':
                return this.router.navigate(['signup','register-retirement-account']);
        case 'registeredaccounts':
                return this.router.navigate(['signup','account-analysis']);
        case 'accountanalysis':
                return this.router.navigate(['signup','subscription']);
        case 'subscription':
                return false;  
        default:
                return this.router.navigate(['signup','your-info']);
    }
   }

}