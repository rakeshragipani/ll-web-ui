import { Injectable } from '@angular/core';
import { CommonService } from './CommonService';

@Injectable({
  providedIn: 'root',
})
export class ActivityHistroyService {
  constructor(private commenService: CommonService) {}

  activityHistroy(whereType, whatEventType) {
    const activityHistory = {
      process_info: whereType,
      what: whatEventType,
      comments_info: '',
      showtouser: 'y',
    };
    this.commenService.postActivityHistory(activityHistory).subscribe((res) => {
      console.log(res);
    });
  }
}
