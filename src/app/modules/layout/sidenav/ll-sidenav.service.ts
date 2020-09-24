import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class LlSideNavService {

    subjectObservable = new Subject();

    updateSideNavValue(value){
       this.subjectObservable.next(value);
    }

    getSideNavSubscribableSubject(){
        return this.subjectObservable;
    }

}