import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlSubscription1PageService {
    private paymentPlanDetails = {};

    getPaymentPlanDetails(){
        return this.paymentPlanDetails;
    }

    updatePaymentPlanDetails(paymentPlanDetails){
        this.paymentPlanDetails = paymentPlanDetails;
    }
}
