import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export abstract class AbstractService {
    protected handleError(error: any) {
        let errorMessage;

        if (undefined === error.message) {
            if (undefined === error.status) {
                errorMessage = 'Server Error';
            } else {
                errorMessage = `${error.status} - ${error.statusText}`;
            }
        } else {
            errorMessage = error.message;
        }

        console.error(errorMessage);

        return Observable.throw(error);
    }
}