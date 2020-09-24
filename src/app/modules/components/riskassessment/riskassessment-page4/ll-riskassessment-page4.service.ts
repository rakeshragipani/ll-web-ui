import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessment4Service {
    private riskAssessmentInfo5 = {};

    getRiskAssessmentInfo5(){
        return this.riskAssessmentInfo5;
    }

    updateRiskAssessmentInfo5(riskAssessmentInfo5){
        this.riskAssessmentInfo5 = riskAssessmentInfo5;
    }
}
