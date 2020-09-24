import { Component, OnInit, OnDestroy} from '@angular/core';
import { LlClientGuardService } from '../ll-common/ll-client-guard/ll-client-guard.service';
import { SessionStorageService } from '@app/shared/session-storage.service';

@Component({
  selector: 'll-home-page',
  templateUrl: './ll-home-page.component.html',
  styleUrls: ['./ll-home-page.component.scss'],
})
export class LlHomePageComponent implements OnInit, OnDestroy {
  data: any;
  constructor(private tenantService: LlClientGuardService, private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.sessionStorageService.resetSession();
    this.data = JSON.parse(this.tenantService.getTenant());
  }

  toogle() {
    let header = document.getElementById('landing-page-header');
    header.classList.toggle('active');
  }

  ngOnDestroy() {
    this.data = null;
  }

}
