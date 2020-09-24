import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessment5Service {
    private riskAssessmentInfo4 = {};

    getRiskAssessmentInfo4(){
        return this.riskAssessmentInfo4;
    }

    updateRiskAssessmentInfo4(riskAssessmentInfo4){
        this.riskAssessmentInfo4 = riskAssessmentInfo4;
    }
}
