import {Component} from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector : 'll-account-analysis',
  template : '<div> </div>'
})
export class llAccountAnalysisPage {

    constructor(private router : Router, private route : ActivatedRoute){
        this.router.navigate(['../account-analysis1'],{relativeTo : this.route.parent});
    }
}