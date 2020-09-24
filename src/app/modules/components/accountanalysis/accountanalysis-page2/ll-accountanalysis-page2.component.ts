import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import message from "assets/json/en.json";
import { Subscription } from 'rxjs';



@Component({
  selector: 'll-accountanalysis-page2',
  templateUrl: './ll-accountanalysis-page2.component.html',
  styleUrls: ['./ll-accountanalysis-page2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlAccountanalysisPage2Component implements OnInit, OnDestroy {
  moveToAccountanalysis3: boolean;
  parentData: any;
  userName: any;
  option1: any;
  selected: boolean = false;
  accountAnalysisData:any;
  Curreny:any;
  showLoader=false;
  supportLanguages = ['en','fr', 'ta', 'hi'];
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  feeDetailsImprovementMessage: any;
  subscriptions: Subscription[] = []
  constructor(private translateService: TranslateService, private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private router : Router,
    private commonService: CommonService,
    private sessionStorageService: SessionStorageService,
    private route : ActivatedRoute) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

  }

  ngOnInit(): void {
    this.userName = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    this.parentData = 5.1;
    // this.moveToAccountanalysis2 =  true;
    this.moveToAccountanalysis3 = false;
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

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  addClass(){
    return {
      accountanalysis2Option1: this.option1,
      accountanalysisThumbsup: true
    }
  }

  getAccountAnalysisData() {
    this.showLoader=true;
    this.subscriptions.push(this.commonService.getAccountAnalysis().subscribe(
      (response: any) => {
        this.accountAnalysisData = response['analysis']['improvements'][0]['ImprovementDetailPage'];
        console.log(this.accountAnalysisData);
        this.showLoader = false;
        this.ref.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    ));
    this.feeDetailsImprovementMessage=message.fees_improvement_message;
  }
 

  getCurreny(){
    this.subscriptions.push(this.commonService.getAccountAnalysis().subscribe(response=>{
      this.Curreny = response['accounts'][0]['currency'];
      console.log(this.accountAnalysisData);
      this.ref.detectChanges();
     }, (error)=>{
     }));
  }

  next() {
    console.log('-----------------------------------------------------------------------');
    
    this.router.navigate(['../account-analysis3'], {relativeTo: this.route.parent});
  }

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if(this.parentData === message) {
      
      this.moveToAccountanalysis3 = false;
    } else {
      this.getMenu(message);
    }
    
  }

  goBack = (): void => {
    this.router.navigate(['../account-analysis1'], {relativeTo : this.route.parent});
  }

  ngOnDestroy() {
    this.moveToAccountanalysis3 = null;
    this.parentData = null;
    this.userName = null;
    this.accountAnalysisData = null;
    this.height = null;
    this.option1 = null;
    this.selected  = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
