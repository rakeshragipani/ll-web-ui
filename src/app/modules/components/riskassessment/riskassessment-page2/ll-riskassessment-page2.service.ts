import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessment2Service {
    private riskAssessmentInfo2 = {};

    getRiskAssessmentInfo2(){
        return this.riskAssessmentInfo2;
    }

    updateRiskAssessmentInfo2(riskAssessmentInfo2){
        this.riskAssessmentInfo2 = riskAssessmentInfo2;
    }

    private riskAnalysisArrStepThree;

    getRiskAnalysisArrStepThree(){
        return this.riskAnalysisArrStepThree;
    }

    updateRiskAnalysisArrStepThree(riskAnalysisArrStepThree){
        this.riskAnalysisArrStepThree = riskAnalysisArrStepThree;
    }
}
