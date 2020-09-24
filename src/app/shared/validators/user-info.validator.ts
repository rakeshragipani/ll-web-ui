import {Injectable} from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn : 'root'
})
export class UserInfoValidator {

    validateFirstName(control : FormControl) : any{
        console.log(control.value);
        let value = control.value || '';
        if(value.length < 3){
            return {'invalidLength' : true};
        }else if(!/[a-zA-Z ]*/.test(value)){
            return {
                'invalidFirstName':true 
            }
        }
        else {
            return null;
        }
    }
}


// pattern('[a-zA-Z ]*')