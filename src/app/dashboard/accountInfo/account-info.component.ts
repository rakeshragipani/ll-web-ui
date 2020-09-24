import { Component, OnInit, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "@app/shared/session-storage.service";

@Component({
  selector: "account-info",
  templateUrl: "./account-info.component.html",
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  yourInfo: any;
  disabledNext = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.yourInfo = this.sessionStorageService.getSingleValueFromSession(
      "YourInfoValue"
    );
    this.router.navigate(["account-optimization"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.yourInfo = null;
    this.disabledNext = false;
  }
}

