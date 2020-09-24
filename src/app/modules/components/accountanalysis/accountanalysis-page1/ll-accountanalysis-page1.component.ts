import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, Input, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { Router, ActivatedRoute } from '@angular/router';

import {LlSideNavService} from '@app/modules/layout/sidenav/ll-sidenav.service';
import { CommonService } from '@app/shared/CommonService';
import { SessionStorageService } from '@app/shared/session-storage.service';
import message from "assets/json/en.json";
import { Subscription } from 'rxjs';


@Component({
  selector: 'll-accountanalysis-page1',
  templateUrl: './ll-accountanalysis-page1.component.html',
  styleUrls: ['./ll-accountanalysis-page1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlAccountanalysisPage1Component implements OnInit, OnDestroy {
  moveToAccountanalysis2: boolean;
  parentData:any;
  userName: any;
  accountAnalysisdata:any;
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en','fr', 'ta', 'hi'];
  summaryText: any;
  momo: any;
  allocationLabel: string;
  allocationText: string;
  feesLabel: string;
  feesText: string;
  divLabel: string;
  divText: string;
  showLoader=false;
  subscriptions: Subscription[] = []

  constructor(private translateService: TranslateService, 
    private ref: ChangeDetectorRef,
     private signUpDataService :SignUpDataService,
     private router : Router,
     private route : ActivatedRoute,
     private llSideNavService: LlSideNavService,
     private sessionStorageService: SessionStorageService,
     private commonService: CommonService
    ) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.llSideNavService.updateSideNavValue('account-analysis');
  }

  ngOnInit(): void {
    this.userName = this.sessionStorageService.getSingleValueFromSession('YourInfoValue');
    this.parentData = 5;
    this.getAccountAnalysisData();
  }

  getAccountAnalysisData() {
    this.showLoader=true;
    this.subscriptions.push(this.commonService.getAccountAnalysis().subscribe(
      (response: any) => {
          this.accountAnalysisdata = response['analysis'];
          console.log(this.accountAnalysisdata);
        this.showLoader = false;
         this.ref.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    ));
    this.summaryText = message.summary_text;
     this.allocationLabel=message.allocation_label;
     this.allocationText=message.allocation_text;
    this.feesLabel=message.fees_label;
    this.feesText=message.fees_text;
    this.divLabel=message.div_label;
    this.divText=message.div_text
  }

  ngAfterViewInit() {
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  next() {
    this.router.navigate(['../account-analysis2'], {relativeTo : this.route.parent});
    this.moveToAccountanalysis2 = true;
  }

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if(this.parentData === message) {
      
      this.moveToAccountanalysis2 = false;
    } else {
      this.getMenu(message);
    }
    
  }

  goBack = (): void => {
    this.router.navigate(['../total-retirement-account'], {relativeTo : this.route.parent});
  }

  ngOnDestroy() {
    this.moveToAccountanalysis2 = null;
    this.parentData = null;
    this.userName = null;
    this.accountAnalysisdata = null;
    this.height = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }

}
