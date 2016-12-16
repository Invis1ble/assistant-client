import { Injector } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { Resource } from 'ng2-rest-service';

import { Config } from '../config/config';
import { PreconfiguredRestService } from './preconfigured-rest.service';

@Resource({
    client: AuthHttp
})
export abstract class AuthenticatedRestService extends PreconfiguredRestService {

    constructor(
        injector: Injector,
        config: Config
    ) {
        super(injector, config);
    }

}
