import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AbstractService } from '../../shared/abstract.service';
import { JwtModel } from './jwt.model';
import { CredentialsModel } from './credentials.model';

@Injectable()
export class JwtService extends AbstractService {
    constructor(
        private http: Http
    ) {
        super();
    }

    getToken(credentials: CredentialsModel): Observable<JwtModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post('http://assistant/app_dev.php/api/tokens', credentials, {
                headers: headers
            })
            .map(this.extractData)
            .map(this.createModel)
            .catch(this.handleError);
    }

    private createModel(data: any) {
        let tokenModel = new JwtModel();

        tokenModel.token = data.token;
        tokenModel.data = data.data;

        return tokenModel;
    }

    private extractData(response: Response) {
        return response.json();
    }
}
