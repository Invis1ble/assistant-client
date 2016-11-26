import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { Body, DefaultHeaders, POST, Produces } from '../../ng2-http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { Credentials } from '../credentials';
import { Jwt } from './jwt';
import { JwtResponseBody } from './jwt.response-body';
import { JwtResponseBodyToJwtTransformer } from './jwt-response-body-to-jwt.transformer';
import { JwtToRefreshTokenRequestBodyTransformer } from './jwt-to-refresh-token-request-body.transformer';
import { RefreshTokenRequestBody } from './refresh-token.request-body';
import { RefreshTokenResponseBody } from './refresh-token.response-body';
import { RestService } from '../../rest/rest.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class JwtService extends RestService {

    constructor(
        http: Http,
        @Inject(CONFIG) config: Config,
        private jwtResponseBodyToJwtTransformer: JwtResponseBodyToJwtTransformer,
        private jwtToRefreshTokenRequestBodyTransformer: JwtToRefreshTokenRequestBodyTransformer
    ) {
        super(http, config);
    }

    createJwt(credentials: Credentials): Observable<Jwt> {
        return this.createJwtRaw(credentials)
            .map((data: JwtResponseBody): Jwt => {
                return this.jwtResponseBodyToJwtTransformer.transform(data);
            });
    }

    refreshJwt(jwt: Jwt): Observable<Jwt> {
        return this.createRefreshToken(this.jwtToRefreshTokenRequestBodyTransformer.transform(jwt))
            .map((data: RefreshTokenResponseBody) => {
                jwt.refreshToken = data.refresh_token;
                jwt.token = data.token;

                return jwt;
            });
    }

    @POST('/tokens')
    @Produces<JwtResponseBody>()
    private createJwtRaw(@Body credentials: Credentials): Observable<JwtResponseBody> {
        return null;
    }

    @POST('/refresh-tokens')
    @Produces<RefreshTokenResponseBody>()
    private createRefreshToken(@Body body: RefreshTokenRequestBody): Observable<RefreshTokenResponseBody> {
        return null;
    }

}

