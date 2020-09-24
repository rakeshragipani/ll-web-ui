import { Injectable } from '@angular/core';

//This service is being eager loaded. So it satisfies singleton design pattern.

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    updateSessionValue(key, value) {
        let parsedSessionObject = this.getSessionContent();
        parsedSessionObject = {
            ...parsedSessionObject,
            [key]: value
        };
        sessionStorage.setItem('ll-storage', JSON.stringify(parsedSessionObject));
    }

    resetSessionValue(key) {
        let parsedSessionObject = this.getSessionContent();
        parsedSessionObject = {
            ...parsedSessionObject,
            [key]: null
        };
        sessionStorage.setItem('ll-storage', JSON.stringify(parsedSessionObject));
    }

    getSingleValueFromSession(key) {
        let parsedSessionObject = this.getSessionContent();
        return parsedSessionObject[key] || null;
    }

    private getSessionContent() {
        let sessionObject: string = sessionStorage.getItem('ll-storage') || '';
        let parsedSessionObject: {} = (sessionObject) ? JSON.parse(sessionObject) : {};
        return parsedSessionObject;
    }

    resetSession() {
        sessionStorage.removeItem('ll-storage');
    }

}