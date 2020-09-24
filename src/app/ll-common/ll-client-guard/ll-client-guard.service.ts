import { Injectable, OnInit } from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LlClientGuardService implements OnInit {

  constructor() {}

  getTenantForHostname(hostname: string): Tenant {
    return this.getTenantForHost(hostname);    
  }

  getTenantForString(s: string) {
    for (const e in Tenant) {
    // console.log('hosthosthosthosthost', e, s.length);
    //   if (e.toLowerCase() === s.toLowerCase()) {
    //     return Tenant[e] as Tenant;
    //   }
      // let tempPort1= e===''?80:e;
      let tempPort2= s.length === 0 ? '80' : s;
      // console.log('tempPort2', tempPort2)
      let Temp = e.split(':');
      // console.log(Temp, Temp.length)
      if (Temp[2].toLowerCase() === tempPort2) {
        // else if (Temp[2].toLowerCase() === s.toLowerCase()) {
        return Tenant[e] as Tenant;
      }
    }
    return null;
  }

  getTenantForHost(host: string): Tenant {
    return this.getTenantForString(host);
  }

  getTenant(): any {
    // console.log(location)
    // return this.getTenantForHostname(location.port);
    let port = location.port;
    return this.getTenantForHostname(port);
  }

  ngOnInit(){
    
  } 
  
}

export enum Tenant { 
  "http://localhost:4200" = `{ "url": "http://localhost:4200","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
  
  "http://localhost:80" = `{ "url": "http://localhost:80","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
  
  // "" = `{ "url": "http://localhost:80","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
  
  "http://localhost:4100" = `{ "url": "http://localhost:4100","logo1": "assets/images/motivity-labs_owler_20160226_173048_original.png","logo2": "assets/images/Untitled-removebg-preview.png","homeh2": "FINANCIAL SECURITY OF<br> FUTURE RETIREES","homep": "Connect your company-sponsored<br> retirement account and see how<br> you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`

  // "http://ec2-3-87-133-246.compute-1.amazonaws.com:4200" = `{ "url": "http://localhost:4200","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
  
  // "http://ec2-3-87-133-246.compute-1.amazonaws.com:4200" = `{ "url": "http://localhost:4200","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
  
  // "http://3.87.133.246:4200" = `{ "url": "http://localhost:4200","logo":"assets/images/imageedit_7_9384928624.png","logo1": "assets/images/left_lane_logo.png","logo2": "assets/images/landingimage.png","homeh2": "FINANCIAL SECURITY OF FUTURE RETIREES","homep": "Connect your company-sponsored retirement account and see how you’re doing in minutes!","footerdiv1": "One of the best online tools for retirement planning and very secure management.","footerdiv2": "Making the complex world of 401ks more trustworthy and really bring more retirement options to invest money securely.","footerdiv3": "One of the World's Top 10 Most Innovative Companies of 2015 in Personal Finance and Retirement plans."}`,
 
}