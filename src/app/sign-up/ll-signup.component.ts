import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '@app/shared/session-storage.service';

@Component({
  selector: 'll-signup',
  templateUrl: './ll-signup.component.html',
})
export class LlSignupComponent implements OnInit {

  constructor(private router: Router,  private route: ActivatedRoute, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.sessionStorageService.resetSession();
    if(this.router.url == '/signup'){ // Need to find a better way
      this.router.navigate(['your-info'], {relativeTo : this.route, replaceUrl: true});
    }
  }

}
