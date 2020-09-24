import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlCreateAccountService {
    private createAccountInfo = {};

    getCreateAccountInfo(){
        return this.createAccountInfo;
    }

    updateCreateAccountInfo(createAccountInfo){
        this.createAccountInfo = createAccountInfo;
    }
}