import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { JwtModelToRefreshTokenRequestBodyTransformer } from './jwt-model-to-refresh-token-request-body.transformer';
import { JwtResponseBodyToJwtModelTransformer } from './jwt-response-body-to-jwt-model.transformer';
import { JwtService } from './jwt.service';
import { JwtStorage } from './jwt-storage';

@NgModule({
    providers: [
        JwtHelper,
        JwtResponseBodyToJwtModelTransformer,
        JwtService,
        JwtModelToRefreshTokenRequestBodyTransformer,
        {
            provide: AuthHttp,
            useFactory: (http: Http, config: Config, jwtStorage: JwtStorage) => {
                return new AuthHttp(new AuthConfig({
                    tokenGetter() {
                        return jwtStorage.getToken().token;
                    },
                    tokenName: config.jwtName
                }), http);
            },
            deps: [Http, CONFIG, JwtStorage]
        }
    ]
})
export class JwtModule {



}
