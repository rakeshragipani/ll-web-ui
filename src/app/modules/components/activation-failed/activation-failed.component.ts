import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'll-activation-failure',
  templateUrl: './activation-failed.component.html',
  styleUrls: ['./activation-failed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivationFailedComponent implements OnInit {
  url: string;
  constructor(private router: Router) {
    this.url = window.location.href;
  }
  ngOnInit(): void {}

  activationFailed() {
    this.router.navigate(['/signup']);
  }
}
