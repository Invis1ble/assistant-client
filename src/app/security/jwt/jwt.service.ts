import { Inject, Injectable, Injector } from '@angular/core';

import { Action, Body } from 'ng2-rest-service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { Credentials } from '../credentials';
import { JwtModel } from './jwt.model';
import { JwtModelToRefreshTokenRequestBodyTransformer } from './jwt-model-to-refresh-token-request-body.transformer';
import { JwtResponseBodyToJwtModelTransformer } from './jwt-response-body-to-jwt-model.transformer';
import { PreconfiguredRestService } from '../../rest/preconfigured-rest.service';
import { RefreshTokenResponseBody } from './refresh-token.response-body';

@Injectable()
export class JwtService extends PreconfiguredRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config
    ) {
        super(injector, config);
    }

    @Action({
        path: '/tokens',
        responseTransformer: JwtResponseBodyToJwtModelTransformer
    })
    createJwt(@Body credentials: Credentials): Observable<JwtModel> {
        return null;
    }

    refreshJwt(jwt: JwtModel): Observable<JwtModel> {
        return this.createRefreshToken(jwt)
            .map((data: RefreshTokenResponseBody): JwtModel => {
                jwt.refreshToken = data.refresh_token;
                jwt.token = data.token;

                return jwt;
            });
    }

    @Action({
        client: AuthHttp,
        path: '/refresh-tokens',
        requestTransformer: JwtModelToRefreshTokenRequestBodyTransformer
    })
    private createRefreshToken(jwt: JwtModel): Observable<RefreshTokenResponseBody> {
        return null;
    }

}

