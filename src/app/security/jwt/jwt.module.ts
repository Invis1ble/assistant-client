import { NgModule } from '@angular/core';

import { JwtHelper, provideAuth } from 'angular2-jwt';

import { CONFIG_DEV } from '../../config/config.dev';
import { JwtResponseBodyToJwtTransformer } from './jwt-response-body-to-jwt.transformer';
import { JwtService } from './jwt.service';
import { JwtToRefreshTokenRequestBodyTransformer } from './jwt-to-refresh-token-request-body.transformer';
import { RestModule } from '../../rest/rest.module';

@NgModule({
    imports: [
        RestModule
    ],
    providers: [
        JwtHelper,
        JwtResponseBodyToJwtTransformer,
        JwtService,
        JwtToRefreshTokenRequestBodyTransformer,
        provideAuth({
            globalHeaders: [{'Content-Type': 'application/json'}],
            // TODO: use JwtLocalStorage.prototype.getToken as tokenGetter
            tokenGetter: () => {
                let jwt = localStorage.getItem(CONFIG_DEV.jwtName);

                if (null === jwt) {
                    return null;
                }

                return JSON.parse(jwt).token;
            },
            tokenName: CONFIG_DEV.jwtName
        })
    ]
})
export class JwtModule {



}
