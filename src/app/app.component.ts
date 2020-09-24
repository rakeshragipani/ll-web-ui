import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import {LlAlertService, LlLogEntry, LlLogLevelEnum, LlLogService, LlMessageService} from '@app/ll-common';

import { SessionStorageService } from '@app/shared/session-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  private subscriptionDataError: Subscription;
  loading = false;
  constructor(private LlAlertService: LlAlertService, private LlLogService: LlLogService, private LlMessageService: LlMessageService, private sessionStorageService: SessionStorageService, private router: Router) {
    this.LlLogService.log(new LlLogEntry('LlAppComponent constructor', LlLogLevelEnum.INFO));
      this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  ngOnDestroy() {
    this.subscriptionDataError.unsubscribe();
  }

  private subscribeToMessages(): void {
    this.subscriptionDataError = this.LlMessageService.subscribe('data.responseError', (payload) => {
      // this.LlAlertService.openAlert(payload.alertType, payload.alertMessage);
    });
  }
}
