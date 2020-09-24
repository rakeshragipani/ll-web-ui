
import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessment1Service {
    private riskAssessmentInfo1 = {};

    getRiskAssessmentInfo1(){
        return this.riskAssessmentInfo1;
    }

    updateRiskAssessmentInfo1(riskAssessmentInfo1){
        this.riskAssessmentInfo1 = riskAssessmentInfo1;
    }

    private riskAnalysisArrStepTwo;

    getRiskAnalysisArrStepTwo(){
        return this.riskAnalysisArrStepTwo;
    }

    updateRiskAnalysisArrStepTwo(riskAnalysisArrStepTwo){
        this.riskAnalysisArrStepTwo = riskAnalysisArrStepTwo;
    }

}
