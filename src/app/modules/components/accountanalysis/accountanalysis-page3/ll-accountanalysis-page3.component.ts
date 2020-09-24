import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/CommonService';
import message from "assets/json/en.json";
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-accountanalysis-page3',
  templateUrl: './ll-accountanalysis-page3.component.html',
  styleUrls: ['./ll-accountanalysis-page3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlAccountanalysisPage3Component implements OnInit, OnDestroy {
  // moveToAccountanalysis3: boolean;
  moveToAccountanalysis4: boolean;
  parentData: any;
  option1: any;
  accountAnalysisData:any;
  selected: boolean = false;
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en','fr', 'ta', 'hi'];
  allocationImprovementMessage: any;
  allocationHeaderMessage: string;
  subscriptions: Subscription[] = [];
  showLoader=false;

  constructor(private translateService: TranslateService, private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private router : Router,
    private commonService: CommonService,
    private route : ActivatedRoute) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.parentData = 5.2;
    // this.moveToAccountanalysis3 = true;
    this.moveToAccountanalysis4 = false;
    this.getAccountAnalysisData();
   // this.selAllColumn(1);
  }

  selAllColumn(value: Number) {
    console.log('value is:', value === 1);
    if(value === 1){
      this.option1= true;
    }
    this.selected = true;
    this.addClass();
  }

  getAccountAnalysisData() {
    this.showLoader=true;
    this.subscriptions.push(this.commonService.getAccountAnalysis().subscribe(response=>{
      this.accountAnalysisData = response['analysis']['improvements'][1]['improvement_detail_page'];
    //  this.accountAnalysisData.current = JSON.parse(this.accountAnalysisData.current);
    //  this.accountAnalysisData.recommended = JSON.parse(this.accountAnalysisData.recommended);
    //  console.log(this.accountAnalysisData);
      this.allocationImprovementMessage=message.allocation_improvement_message;
      this.allocationHeaderMessage=message.allocation_detail_header_msg;
      this.showLoader=false;
     this.ref.detectChanges();
    }, (error)=>{
    }));
  }

  ngAfterViewInit() {
    this.height =this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  addClass(){
    return {
      accountanalysis3Option1: this.option1,
      accountanalysisThumbsup: true
    }
  }
  getkey(item){
    return Object.keys(item)[0];
  }

  next() {
    console.log('-------------------------------------------------------');
    this.moveToAccountanalysis4 = true;
    this.router.navigate(['../account-analysis4'], {relativeTo : this.route.parent});
 
  }

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if(this.parentData === message) {
     
      this.moveToAccountanalysis4 = false;
    } else {
      this.getMenu(message);
    }
    
  }

  goBack = (): void => {
    this.router.navigate(['../account-analysis2'], {relativeTo : this.route.parent});
  }

  ngOnDestroy() {
    this.moveToAccountanalysis4 = null;
    this.parentData = null;
    this.accountAnalysisData = null;
    this.height = null;
    this.option1 = null;
    this.selected  = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
