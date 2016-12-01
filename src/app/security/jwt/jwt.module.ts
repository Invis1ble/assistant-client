import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { JwtResponseBodyToJwtModelTransformer } from './jwt-response-body-to-jwt-model.transformer';
import { JwtService } from './jwt.service';
import { JwtStorage } from './jwt-storage';
import { JwtModelToRefreshTokenRequestBodyTransformer } from './jwt-model-to-refresh-token-request-body.transformer';
import { RestModule } from '../../rest/rest.module';

@NgModule({
    imports: [
        RestModule
    ],
    providers: [
        JwtHelper,
        JwtResponseBodyToJwtModelTransformer,
        JwtService,
        JwtModelToRefreshTokenRequestBodyTransformer,
        {
            provide: AuthHttp,
            useFactory: (http: Http, config: Config, jwtStorage: JwtStorage) => {
                return new AuthHttp(new AuthConfig({
                    globalHeaders: [{'Content-Type': 'application/json'}],
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
