
import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessment3Service {
    private riskAssessmentInfo3 = {};

    getRiskAssessmentInfo3(){
        return this.riskAssessmentInfo3;
    }

    updateRiskAssessmentInfo3(riskAssessmentInfo3){
        this.riskAssessmentInfo3 = riskAssessmentInfo3;
    }
}
