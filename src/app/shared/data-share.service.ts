// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable()
// export class DataShareService {

// name = new Subject<any>();
// // name$ = this.name.asObservable();

// // publishData(data: any) {
// // console.log('data', data);
// // if(data){
// // return this.name.next(data);
// // } else{
// // return this.name.next('');
// // }
// // }

// }

import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  invokeFirstComponentFunction = new EventEmitter();
  invokeAmountChangeFunction = new EventEmitter();
  subsVar: Subscription;
  amountVar: Subscription;
  private subscriptionId = '';
  private selectedPlan: any;

  constructor() { }

  onFirstComponentButtonClick(name: any) {
    if (name.type === 'image') {
      this.invokeFirstComponentFunction.emit(name.profileimage);
    } else if (name.type === 'age') {
      this.invokeAmountChangeFunction.emit(name.age);
    }

  }

  updateSubscriptionId(id: any) {
    this.subscriptionId = id;
  }

  getSubscriptionId() {
    return this.subscriptionId;
  }

  updateSelectedPlan(plan: any) {
    this.selectedPlan = plan;
  }

  getSelectedPlan() {
    return this.selectedPlan;
  }

}

