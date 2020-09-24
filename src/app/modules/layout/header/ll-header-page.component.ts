import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'll-header-page',
  templateUrl: './ll-header-page.component.html',
  styleUrls: ['./ll-header-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlHeaderPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  back = () => {
    // console.log("Back");
  }

}
