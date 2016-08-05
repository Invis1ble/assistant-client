import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JWTModel } from './jwt.model';
import { UserModel } from './user.model';

@Injectable()
export class JWTService {
    constructor(
        private http: Http
    ) {

    }

    getToken(user: UserModel): Observable<JWTModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post('http://assistant/app_dev.php/api/tokens', JSON.stringify({
                username: user.username,
                password: user.password
            }), {
                headers: headers
            })
            .map(this.extractData)
            .map(this.createModel)
            .catch(this.handleError);
    }

    private createModel(data: any) {
        let tokenModel = new JWTModel();

        tokenModel.token = data.token;

        return tokenModel;
    }

    private extractData(response: Response) {
        return response.json();
    }

    private handleError(error: any) {
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
        return Observable.throw(errorMessage);
    }
}
