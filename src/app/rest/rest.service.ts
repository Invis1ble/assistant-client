import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { RESTClient } from '../ng2-http';

import { Config } from '../config/config';

export abstract class RestService extends RESTClient {

    constructor(
        http: Http | AuthHttp,
        private config: Config
    ) {
        super(http);
    }

    protected getBaseUrl(): string {
        return this.config.apiEndpoint;
    }

}
