import {Injectable} from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LlYourInfoService {
    private userInfo = {};

    getUserInfo(){
        return this.userInfo;
    }

    updateUserInfo(userInfo){
        this.userInfo = userInfo;
    }
}