import {Component} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector : 'll-subscription',
    template : '<div> </div>'
})

export class LlSubscriptionPage {

    constructor(private router : Router, private route : ActivatedRoute){
        this.router.navigate(['../../subscription1'], {relativeTo : this.route});
    }
    
}