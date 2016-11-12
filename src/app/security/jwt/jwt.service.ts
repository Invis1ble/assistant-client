import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { Body, DefaultHeaders, POST, Produces } from '../../ng2-http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { Credentials } from '../credentials';
import { Jwt } from './jwt';
import { JwtRaw } from './jwt-raw';
import { RestService } from '../../rest/rest.service';
import { JwtHydratorService } from './jwt-hydrator.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class JwtService extends RestService {

    constructor(
        http: Http,
        @Inject(CONFIG) config: Config,
        private jwtHydrator: JwtHydratorService
    ) {
        super(http, config);
    }

    createJwt(credentials: Credentials): Observable<Jwt> {
        return this.createJwtRaw(credentials)
            .map((data: JwtRaw): Jwt => {
                return this.jwtHydrator.hydrate(data);
            });
    }

    @POST('/tokens')
    @Produces<JwtRaw>()
    createJwtRaw(@Body credentials: Credentials): Observable<JwtRaw> {
        return null;
    }

}

