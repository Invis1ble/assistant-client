import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AbstractService } from '../../shared/abstract.service';
import { JwtModel } from './jwt.model';
import { CredentialsModel } from './credentials.model';
import { UrlGenerator } from '../../shared/url-generator.service';

@Injectable()
export class JwtService extends AbstractService {
    private endpoint = '/api/tokens';

    constructor(
        private http: Http,
        private urlGenerator: UrlGenerator
    ) {
        super();
    }

    getToken(credentials: CredentialsModel, url: string): Observable<JwtModel> {
        return this.post(credentials, url);
    }

    getUrl(credentials?: CredentialsModel): string {
        return this.urlGenerator.generate({href: this.endpoint});
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

    private post(credentials: CredentialsModel, url: string): Observable<JwtModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(url, credentials, {
                headers: headers
            })
            .catch(this.handleError)
            .map(this.extractData)
            .map(this.createModel);
    }
}
