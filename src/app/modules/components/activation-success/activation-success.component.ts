import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'll-activation-success',
  templateUrl: './activation-success.component.html',
  styleUrls: ['./activation-success.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivationSuccessComponent implements OnInit {
  url: string;
  constructor(private router: Router) {
    this.url = window.location.href;
  }
  ngOnInit(): void {}

  activationSuccess() {
    this.router.navigate(['/login']);
  }
}
