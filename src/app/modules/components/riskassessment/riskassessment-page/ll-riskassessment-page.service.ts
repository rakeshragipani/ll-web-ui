
import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRiskAssessmentService {
    private riskAssessmentInfo = {};

    getRiskAssessmentInfo(){
        return this.riskAssessmentInfo;
    }

    updateRiskAssessmentInfo(riskAssessmentInfo){
        this.riskAssessmentInfo = riskAssessmentInfo;
    }

    private riskAnalysisArr =[];

    getRiskAnalysisArr(){
        return this.riskAnalysisArr;
    }

    updateRiskAnalysisArr(riskAnalysisArr){
        this.riskAnalysisArr = riskAnalysisArr;
    }
}

