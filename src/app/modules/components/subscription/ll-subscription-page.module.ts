import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { LlSubscriptionPage } from './ll-subscription-page.component';

import { LlSubscriptionPageRoutingModule } from './ll-subscription-routing.module';

@NgModule({
    declarations: [LlSubscriptionPage],
    imports: [
        RouterModule,
        LlSubscriptionPageRoutingModule
    ],
})

export class LlSubscriptionModule {

}