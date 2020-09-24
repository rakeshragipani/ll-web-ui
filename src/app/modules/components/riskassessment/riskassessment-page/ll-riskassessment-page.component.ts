import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@app/shared/CommonService';
import * as d3 from "d3";

import { SignUpDataService } from '@app/sign-up/ll-signup-service';

import { SessionStorageService } from '@app/shared/session-storage.service';

import { LlRetirementSavingsService } from '@app/modules/components/retirementsavings/ll-retirementsavings-page.service';

import {LlRiskAssessmentService} from './ll-riskassessment-page.service';

import {LlSideNavService} from '@app/modules/layout/sidenav/ll-sidenav.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'll-riskassessment-page',
  templateUrl: './ll-riskassessment-page.component.html',
  styleUrls: ['./ll-riskassessment-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlRiskassessmentPageComponent implements OnInit, OnDestroy {
  gaugemap: any = {};
  parentData: any;
  moveToRiskAssessment1 = false;
  losspercent: any;
  profitpercent: any;
  lossamount: any;
  profitamount: any;
  categoryColor: any;
  plusColor: any = '#2a368e';
  riskassessmentInfo: any = {};
  @ViewChild('pageHeight') targetElement: any;    
  height: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  // moveToRiskAssessment: boolean = true;
  retirementsavingsInfo: any;
  // page3Data: any = {amountsaved: 0};
  getRetirementsData: any;
  riskQuestion: any;

  public canvasWidth = 275;
  public needleValue = 0;
  public centralLabel = '';
  // public name = 'Gauge chart'

  public bottomLabel:string;
  public bottomLabelVal;

  public options = {
    hasNeedle: true,
    needleColor: '#2a368e',
    needleUpdateSpeed: 1000,
    arcColors: ['#C5E29F', '#8DC73F', '#3AB54A', '#32a852', '#019444', '#006738'],
    arcDelimiters: [16, 32, 50, 66, 82],
    rangeLabel: ['4%', '20%'],
    needleStartValue: 0,
  };
  riskQuestions: any;
  riskAnalysisArr: any;
  userId: string;
  showLoader = false;
  subscriptions: Subscription[] = []

  constructor(private _router: Router, private translateService: TranslateService, 
    private commenService: CommonService, 
    private ref: ChangeDetectorRef,
    private signUpDataService :SignUpDataService,
    private sessionStorageService: SessionStorageService,
    private llRetirementSavingsService : LlRetirementSavingsService,
    private router : Router,
    private route : ActivatedRoute,
    private llRiskAssessmentService : LlRiskAssessmentService,
    private llSideNavService : LlSideNavService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    this.retirementsavingsInfo = this.llRetirementSavingsService.getRetirementSavingsInfo();
    this.getRetirementsData = this.llRetirementSavingsService.getRetirementData();
    this.riskQuestion = this.llRetirementSavingsService.getRiskQuestion();
    this.llSideNavService.updateSideNavValue('risk-assessment');
  }

  ngOnInit(): void {
    console.log(this.retirementsavingsInfo);
    console.log('getRetirementsData', this.getRetirementsData);
    if (this.getRetirementsData) {
      console.log('CalledRetire');
      this.getRetirementSavings();
    }

    //loading data from session storage
    this.riskassessmentInfo = this.sessionStorageService.getSingleValueFromSession('riskAssessmentInfo') || {};

    if(this.riskassessmentInfo.percentageValue || this.retirementsavingsInfo.savedPercentage){
      this.bottomLabel= (this.retirementsavingsInfo.savedPercentage || this.riskassessmentInfo.percentageValue) + '%';
      this.bottomLabelVal = + (this.retirementsavingsInfo.savedPercentage || this.riskassessmentInfo.percentageValue);
      this.riskassessmentInfo.displayAmount = this.retirementsavingsInfo.displayAmount;
      this.onSliderChange('' + this.bottomLabelVal);
    } else {
      this.bottomLabel = '4%';
      this.bottomLabelVal = 4;
      this.riskassessmentInfo.displayAmount = this.retirementsavingsInfo.displayAmount;
      this.riskassessmentInfo.losspercent = '-4 %';
      this.riskassessmentInfo.profitpercent = '+4 %';
      this.riskassessmentInfo.lossamount = '-$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 4) / 100).toLocaleString('en-GB');
      this.riskassessmentInfo.profitamount = '+$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 4) / 100).toLocaleString('en-GB');
    }
    
    // this.retirementsavingsInfo['amountsaved']=0;
    this.parentData = 3;
   
    // -16 % -$80,500
    // console.log("MAIN");
    // this.parentData = 4;
    // this.draw();
  }

  ngAfterViewInit() {
    this.draw(4);
    this.height = this.targetElement && this.targetElement.nativeElement && this.targetElement.nativeElement.offsetHeight > 470 ? this.targetElement.nativeElement.offsetHeight : 470;console.log('this.height', this.height);
    this.ref.detectChanges();
  }

  ngAfterViewChecked(){
    this.draw(this.bottomLabelVal);
  }


  onSliderChange(event: string) {
    console.log('event is: ', Number(event));
    this.draw(Number(event));
    this.riskassessmentInfo.losspercent = '-' + Number(event) + ' %';
    this.riskassessmentInfo.profitpercent = '+' + Number(event) + ' %';
    this.bottomLabel = Number(event) + '%';
    this.bottomLabelVal = Number(event);
    const data = [
      { val: '4', per: '0' },
      { val: '5', per: '8' },
      { val: '6', per: '14' },
      { val: '7', per: '20' },
      { val: '8', per: '26' },
      { val: '9', per: '32' },
      { val: '10', per: '38' },
      { val: '11', per: '44' },
      { val: '12', per: '50' },
      { val: '13', per: '56' },
      { val: '14', per: '62' },
      { val: '15', per: '68' },
      { val: '16', per: '74' },
      { val: '17', per: '80' },
      { val: '18', per: '86' },
      { val: '19', per: '91' },
      { val: '20', per: '100' },
    ];
    const result = data.filter((element) => {
      return element.val === String(Number(event));
    });
    console.log('result', result[0].per);
    this.categoryColor = 'linear-gradient(to right,#419AD5, #3D6796 '+result[0].per+'%, #f1f3f2 '+result[0].per+'%)';
    this.plusColor = '#fff';
    if (Number(event) === 4) {
      this.needleValue = 0;
      this.riskassessmentInfo.lossamount = '-$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 4) / 100).toLocaleString('en-GB');
      this.riskassessmentInfo.profitamount = '+$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 4) / 100).toLocaleString('en-GB');
      this.plusColor = '#2a368e';
    } else if (Number(event) === 20) {
      this.riskassessmentInfo.lossamount = '-$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 20) / 100).toLocaleString('en-GB');
      this.riskassessmentInfo.profitamount = '+$' + Math.trunc((this.retirementsavingsInfo.amountsaved * 20) / 100).toLocaleString('en-GB');
      this.needleValue = 100;
      // this.plusColor = 1;
    } else {
      this.riskassessmentInfo.lossamount = '-$' + Math.trunc((this.retirementsavingsInfo.amountsaved * Number(event)) / 100).toLocaleString('en-GB');
      this.riskassessmentInfo.profitamount = '+$' + Math.trunc((this.retirementsavingsInfo.amountsaved * Number(event)) / 100).toLocaleString('en-GB');
      this.needleValue = Number(event) * 5;
    }
  }

  next = (): void => {
    this.riskassessmentInfo.percentageValue = this.bottomLabelVal;
    this.sessionStorageService.updateSessionValue('riskAssessmentInfo', this.riskassessmentInfo);
    const merge = Object.assign(this.riskassessmentInfo, this.retirementsavingsInfo);
    this.riskassessmentInfo = merge;
    this.llRiskAssessmentService.updateRiskAssessmentInfo(this.riskassessmentInfo);
    this.saveRiskassessment();
  };

  getMenu(dat) {
    console.log('dat is in 3', this.parentData, dat);
  }

  getMessage(message: string) {
    console.log('message-------------retment', message);
    if (this.parentData === message) {
      this.moveToRiskAssessment1 = false;
      this.onSliderChange(String(this.bottomLabelVal));
    } else {
      this.getMenu(message);
    }
  }

  goBack = (): void => {
    this.router.navigate(['../retirement-savings'], {relativeTo : this.route.parent});
  };

  getRetirementSavings() {
    const retirementSaving = this.getRetirementsData;
    console.log(this.getRetirementsData);
    this.riskQuestions = retirementSaving[1];
    console.log(this.riskQuestions);
  }

  saveRiskassessment() {
    this.showLoader = true;
    const riskDataArr = [];
    riskDataArr.push({
      user_id: this.userId,
      risk_question_id: this.riskQuestion.id,
      risk_answer: this.retirementsavingsInfo.displayAmount,
      risk_question_text: this.riskQuestion.text,
    });
    riskDataArr.push({
      user_id: this.userId,
      risk_question_id: this.riskQuestions.id,
      risk_answer: this.bottomLabelVal,
      risk_question_text: this.riskQuestions.text,
    });
    console.log('riskDataArrpirrrr', riskDataArr);
    this.sessionStorageService.updateSessionValue('retirementSaving', riskDataArr);
    // this.commenService.saveRiskassessment(riskDataArr).subscribe(
    //   (results) => {
    //     console.log('PostRiskData', results);
        this.getRiskAssessmentAnalysis();
        this.showLoader = false;
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.showLoader = false;
    //   }
    // );
  }
  getRiskAssessmentAnalysis() {
    const riskAnalysisStepOne = {
      risk_value: this.bottomLabelVal,
      amount: this.retirementsavingsInfo.amountsaved,
      step_number: '1',
      selected_option: ' ',
    };
    //  console.log(riskAnalysisStepOne);
    this.subscriptions.push(this.commenService.getRiskAssessmentAnalysis(riskAnalysisStepOne).subscribe(
      (results) => {
        console.log(results);
        this.riskAnalysisArr = results; 
        this.sessionStorageService.updateSessionValue('riskAnalysisArr', this.riskAnalysisArr);
        this.llRiskAssessmentService.updateRiskAnalysisArr(this.riskAnalysisArr);
        if (this.riskAnalysisArr) {
          this.router.navigate(['../risk-assessment1'], {relativeTo : this.route.parent});
          this.ref.detectChanges();
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  draw(val) {
    // document.getElementById("power-gauge").innerHTML = "";
     var self = this;
    var gauge = function (container, configuration) {
      if(document.getElementById("power-gauge") !== null){
        document.getElementById("power-gauge").innerHTML = "";
      }
      // else{

      // }
      var config = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 10,
        ringWidth: 10,

        pointerWidth: 20,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.62,

        minValue: 4,
        maxValue: 20,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 6,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#c3e1a0'), d3.rgb('#006738'))
      };
      var range = undefined;
      var r = undefined;
      var pointerHeadLength = undefined;
      var value = 0;

      var svg = undefined;
      var arc = undefined;
      var scale = undefined;
      var ticks = undefined;
      var tickData = undefined;
      var pointer = undefined;

      var donut = d3.pie();

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      function newAngle(d) {
        var ratio = scale(d);
        var newAngle = config.minAngle + (ratio * range);
        return newAngle;
      }

      function configure(configuration) {
        var prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d, i) {
            var ratio = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function (d, i) {
            var ratio = d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }
      self.gaugemap.configure = configure;

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        var centerTx = centerTranslation();

        var arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d, i) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        // var lg = svg.append('g')
        //   .attr('class', 'label')
        //   .attr('transform', centerTx);
        // lg.selectAll('text')
        //   .data(ticks)
        //   .enter().append('text')
        //   .attr('transform', function (d) {
        //     var ratio = scale(d);
        //     var newAngle = config.minAngle + (ratio * range);
        //     return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
        //   })
        //   .text(config.labelFormat);

        var lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        var pointerLine = d3.line().curve(d3.curveLinear)
        var pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg.append('path')
          .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')')
          .attr('fill', '#2a368e');

        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue, newConfiguration?) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    var powerGauge = gauge('#power-gauge', {
      size: this.canvasWidth,
      clipWidth: this.canvasWidth,
      clipHeight: this.canvasWidth - 75,
      ringWidth: 45,
      maxValue: 20,
      transitionMs: 0,
    });
    powerGauge.render(val);

  }

  ngOnDestroy() {
    this.gaugemap = null;
    this.parentData = null;
    this.moveToRiskAssessment1 = false;
    this.losspercent = null;
    this.profitpercent = null;
    this.lossamount = null;
    this.profitamount = null;
    this.categoryColor = null;
    this.plusColor = null;
    this.riskassessmentInfo = null;
    this.height = null;
    this.retirementsavingsInfo = null;
    this.getRetirementsData = null;
    this.riskQuestion = null;
    this.riskQuestions = null;
    this.riskAnalysisArr = null;
    this.userId = null;
    this.showLoader = false;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions = [];
  }
}
