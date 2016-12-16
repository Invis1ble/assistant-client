import { Injector } from '@angular/core';

import { Resource, RestService } from 'ng2-rest-service';

import { Config } from '../config/config';

@Resource({
    baseUrl(): string {
        return this.config.apiEndpoint;
    }
})
export abstract class PreconfiguredRestService extends RestService {

    constructor(
        injector: Injector,
        private config: Config
    ) {
        super(injector);
    }

}
