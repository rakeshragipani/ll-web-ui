import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Chart from 'chart.js';
import { CommonService } from '@app/shared/CommonService';

import { SignUpDataService } from '@app/sign-up/ll-signup-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-accountanalysis-page5',
  templateUrl: './ll-accountanalysis-page5.component.html',
  styleUrls: ['./ll-accountanalysis-page5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlAccountanalysisPage5Component implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  actualMonths = [2];
  public chart: Chart;
  parentData: any;
  tab1: boolean;
  tab2: boolean;
  textColor1: boolean;
  textColor2: boolean;
  moveToSubscription1: boolean = false;
  canvas: any;
  ctx: any;
  accountAnalysisData:any;
  chartData:any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];

  @ViewChild('pageHeight') targetElement: any;
  height: any;

  subcriptionProducts: any;
  showLoader = false;
  subscriptions: Subscription[] = []
  // moveToAccountanalysis5:boolean = true;
  constructor(private translateService: TranslateService, 
    private commenService: CommonService,
     private cd: ChangeDetectorRef,
     private signUpDataService :SignUpDataService,
     private router : Router,
     private route : ActivatedRoute) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.getAccountAnalysisData();

    this.tab1 = true;
      this.tab2 = false;
      this.textColor2 = false;
      this.textColor1 = true;
      this.clickTab();
      this.parentData = 5.4;
     // this.getProducts();
    
  }

  getAccountAnalysisData() {
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getAccountAnalysis().subscribe(response=>{
      this.accountAnalysisData = response['analysis'];
      console.log(this.accountAnalysisData);
      this.chartData = this.accountAnalysisData.projections.performance_comparision;
     console.log((this.chartData));
      this.showLoader = false;
     this.cd.detectChanges();
    }, (error)=>{
    }));
  }

  ngAfterViewInit() {
    this.accountAnalysisChart();
    
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;
    console.log('this.height', this.height);
    this.cd.detectChanges();
  }
  ngAfterViewChecked(): void {
    this.accountAnalysisChart();
   
  }

  accountAnalysisChart() {
    this.canvas = document.getElementById('canvas');
    if (this.canvas != null) {
      this.ctx = this.canvas.getContext('2d');
      // let myChart = new Chart(this.ctx, {
      // })
      const myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.chartData.age_axis ? this.chartData.age_axis : '',
          datasets: [
            {
              label: this.chartData.data_sets[0].label,
              data: this.chartData.data_sets[0].data.split(','),
              backgroundColor: 'blue',
              borderColor: 'blue',
              fill: false,
              markerType:'triangle',
            },
            {
              label: this.chartData.data_sets[1].label,
              data: this.chartData.data_sets[1].data.split(','),
              backgroundColor: 'lightblue',
              borderColor: this.tab2?'red':'lightblue',
              fill: false,
              markerType:'triangle',
            },
            {
              label: this.chartData.data_sets[2].label,
              data: this.chartData.data_sets[2].data.split(','),
              backgroundColor: 'green',
              borderColor: 'green',
              fill: false,
              markerType:'triangle',
              pointStyle:'triangle'
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            xAxes: [
              {
                display: true,
                position: 'right',
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  left: 20,
                  labelString: '',
                },
                ticks: {
                  left: 20,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                position: 'right',
                ticks: {
                  // beginAtZero: false,
                  // max: 240,
                  // min: 60,
                  // stepSize: 20,
                  // padding: 10,
                  callback: window.onload = function (value) {
                    // console.log(value);
                    const ranges = [
                      { divider: 1e6, suffix: '.0M' },
                      { divider: 1e3, suffix: '.0k' },
                    ];
                    function formatNumber(n) {
                      for (let i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                    }
                    return '$' + formatNumber(value);
                  },
                },
              },
            ],
          },
        },
      });
    }
  }
  click1(val) {
    console.log(val);
    if (val === true) {
      this.tab1 = true;
      this.tab2 = false;
      this.textColor2 = false;
      this.textColor1 = true;
      this.chartData=this.accountAnalysisData.projections.performance_comparision;
      this.chartData.age_axis = this.chartData.age_axis;
      this.tabTextColor1();
    } else {
      this.tab1 = false;
      this.tab2 = true;
      this.textColor1 = false;
      this.textColor2 = true;
      this.chartData=this.accountAnalysisData.projections.projected_fees;
      this.chartData.age_axis = this.chartData.age_axis;
      this.tabTextColor2();
    }
    this.clickTab();
    this.cd.detectChanges();

  }

  next() {
    if(this.router.url.indexOf('signup')>-1){
      this.router.navigate(['../subscription'], {relativeTo : this.route.parent});
      this.moveToSubscription1 = true;
    }
    else{
      this.router.navigate(['dashboard', 'account-info']);
    }
    //if (this.subcriptionProducts && this.subcriptionProducts.length > 0) {
   // }
  }

  clickTab() {
    return {
      tab1: this.tab1,
      tab2: this.tab2,
    };
  }

  tabTextColor1() {
    return {
      textColor2: this.textColor1,
      textColor1: this.textColor1,
    };
  }

  tabTextColor2() {
    return {
      textColor2: this.textColor2,
      textColor1: this.textColor2,
    };
  }

  getMenu(dat) {
    
  }

  getMessage(message: string) {
    console.log('message-------------retment', this.parentData, message);
    if (this.parentData === message) {
      
      this.moveToSubscription1 = false;
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../account-analysis4'], {relativeTo : this.route.parent});
  };

  getProducts() {
    this.showLoader = true;
    this.subscriptions.push(this.commenService.getProducts().subscribe(
      (productResponse) => {
        this.subcriptionProducts = productResponse;
        console.log(this.subcriptionProducts);
        this.showLoader = false;
        this.cd.detectChanges();
      },
      (error) => {
        console.log('err', error);
        this.showLoader = false;
        this.cd.detectChanges();
      }
    ));
  }

  ngOnDestroy() {
    this.parentData = null;
    this.accountAnalysisData = null;
    this.height = null;
    this.actualMonths = null;
    this.chart = null;
    this.tab1 = undefined;
    this.tab2 = undefined;
    this.textColor1 = undefined;
    this.textColor2 = undefined;
    this.moveToSubscription1 = false;
    this.canvas = null;
    this.ctx = null;
    this.accountAnalysisData = null;
    this.chartData = null;
    this.targetElement = null;
    this.height = null;
    this.subcriptionProducts = null;
    this.showLoader = false;

    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
