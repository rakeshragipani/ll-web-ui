import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonService } from '@app/shared/CommonService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'll-avtivityhistory',
  templateUrl: './avtivityhistory.component.html',
  styleUrls: ['./avtivityhistory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvtivityhistoryComponent implements OnInit, OnDestroy {
  showLoader = false;
  getActivityHistoryData: any;
  subscriptions: Subscription[] = [];

  constructor(private commonService: CommonService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getActivityHistory();
  }

  getActivityHistory() {
    this.showLoader = true;
    this.subscriptions.push(
      this.commonService.getActivityHistory().subscribe(
        (res) => {
          this.getActivityHistoryData = res;
          this.showLoader = false;
          this.cd.detectChanges();
        },
        (error) => {
          this.showLoader = false;
          this.cd.detectChanges();
        }
      )
    );
  }

  ngOnDestroy() {
    this.resetVariables();
  }

  resetVariables() {
    this.showLoader = false;
    this.getActivityHistoryData = null;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
