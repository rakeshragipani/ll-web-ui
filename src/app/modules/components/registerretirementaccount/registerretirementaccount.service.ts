import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class RegisterRetirementAccountService {
    private registerRetirementAccountInfo = {};

    getRegisterRetirementAccountInfo(){
        return this.registerRetirementAccountInfo;
    }

    updateRegisterRetirementAccountInfo(registerRetirementAccountInfo){
        this.registerRetirementAccountInfo = registerRetirementAccountInfo;
    }
}
