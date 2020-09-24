
import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlRetirementSavingsService {
    private retirementSavingsInfo = {};

    getRetirementSavingsInfo(){
        return this.retirementSavingsInfo;
    }

    updateRetirementSavingsInfo(retirementSavingsInfo){
        this.retirementSavingsInfo = retirementSavingsInfo;
    }

    private retirementData = {};

    getRetirementData(){
        return this.retirementData;
    }

    updateRetirementData(retirementData){
        this.retirementData = retirementData;
    }

    private riskQuestion = {};

    getRiskQuestion(){
        return this.riskQuestion;
    }

    updateRiskQuestion(riskQuestion){
        this.riskQuestion = riskQuestion;
    }
}
