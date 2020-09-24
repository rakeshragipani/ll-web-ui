import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'll-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
