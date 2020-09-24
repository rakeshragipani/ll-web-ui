import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/CommonService';
import message from "assets/json/en.json";
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-accountanalysis-page4',
  templateUrl: './ll-accountanalysis-page4.component.html',
  styleUrls: ['./ll-accountanalysis-page4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlAccountanalysisPage4Component implements OnInit, OnDestroy {

  // moveToAccountanalysis4: boolean;
  accountAnalysisData:any;
  moveToAccountanalysis5: boolean;
  parentData: any;
  supportLanguages = ['en','fr', 'ta', 'hi'];
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  currentDivMessage: string;
  recommendedDivMessage: string;
  subscriptions: Subscription[] = [];
  showLoader=false;

  constructor(private translateService: TranslateService, 
    private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private commonService: CommonService,
    private router : Router,
    private route : ActivatedRoute) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.parentData = 5.3;
    this.moveToAccountanalysis5 = false;
    this.getAccountAnalysisData();
  }

  next() {
   
    this.moveToAccountanalysis5 = true;
    this.router.navigate(['../account-analysis5'], {relativeTo : this.route.parent});
  }

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if(this.parentData === message) {
      
      this.moveToAccountanalysis5 = false;
    } else {
      this.getMenu(message);
    }
    
  }
  getAccountAnalysisData() {
    this.showLoader=true;
    this.subscriptions.push(this.commonService.getAccountAnalysis().subscribe(response=>{
     this.accountAnalysisData = response['analysis']['improvements'][2]['improvement_detail_page'];
    //  console.log(this.accountAnalysisData);
    //  this.accountAnalysisData.current = JSON.parse(this.accountAnalysisData.current);
     this.currentDivMessage = message.div_details_current_div_mesg;
      this.recommendedDivMessage=message.div_details_recommended_div_mesg;
    //  this.accountAnalysisData.recommended = JSON.parse(this.accountAnalysisData.recommended);
     this.accountAnalysisData.recommended.blur = true;
      this.showLoader = false;

    //  console.log(this.accountAnalysisData);
     this.ref.detectChanges();
    }, (error)=>{
    }));
  }

  getkey(item){
    return Object.keys(item)[0];
  }

  goBack = (): void => {
    this.router.navigate(['../account-analysis3'], {relativeTo : this.route.parent});
  }

  ngOnDestroy() {
    this.moveToAccountanalysis5 = null;
    this.parentData = null;
    this.accountAnalysisData = null;
    this.height = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
