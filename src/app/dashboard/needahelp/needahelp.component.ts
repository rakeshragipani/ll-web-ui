import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector: 'll-needahelp',
  templateUrl: './needahelp.component.html',
  styleUrls: ['./needahelp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedahelpComponent implements OnInit, OnDestroy {
  support=false;
  constructor() { }
  ngOnInit(): void {
  }
  mouseEnter() {
    this.support = true;
  }
  mouseLeave() {
    this.support = false;
  }
 
  ngOnDestroy() {
    this.support=false;
  }
}
