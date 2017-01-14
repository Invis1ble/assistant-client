import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { JwtModelToRefreshTokenRequestBodyTransformer } from './jwt-model-to-refresh-token-request-body.transformer';
import { JwtResponseBodyToJwtModelTransformer } from './jwt-response-body-to-jwt-model.transformer';
import { JwtService } from './jwt.service';
import { JwtStorage } from './jwt-storage';

// Workaround for compiling errors issue, see https://github.com/auth0/angular2-jwt/issues/258#issuecomment-272223420
export function authHttpServiceFactory(http: Http, config: Config, jwtStorage: JwtStorage) {
    return new AuthHttp(new AuthConfig({
        tokenGetter() {
            return jwtStorage.getToken().token;
        },
        tokenName: config.jwtName
    }), http);
}

@NgModule({
    providers: [
        JwtHelper,
        JwtResponseBodyToJwtModelTransformer,
        JwtService,
        JwtModelToRefreshTokenRequestBodyTransformer,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, CONFIG, JwtStorage]
        }
    ]
})
export class JwtModule {



}
