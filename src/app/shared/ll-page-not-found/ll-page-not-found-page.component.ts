import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'll-page-not-found-page',
  templateUrl: './ll-page-not-found-page.component.html',
  styleUrls: ['./ll-page-not-found-page.component.scss']
})

export class LlPageNotFoundPageComponent {
}
