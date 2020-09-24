import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '@app/shared/CommonService';

@Component({
  selector: 'll-reportsandstatements',
  templateUrl: './reportsandstatements.component.html',
  styleUrls: ['./reportsandstatements.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsandstatementsComponent implements OnInit {
  reportsandStatemets: any;
  reportsType = [
    { id: 1, type: 'all' },
    { id: 2, type: 'reports' },
    { id: 3, type: 'statements' },
  ];
  constructor(private commonService: CommonService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getReportsAndStatements('all');
  }

  getReportsAndStatements(value) {
    const reportId = '123456';
    this.commonService.reportsAndStatements(reportId).subscribe((response: any) => {
      this.reportsandStatemets = response;
      this.ref.detectChanges();
    });
  }
}
