import { NgModule } from '@angular/core';

import { provideAuth } from 'angular2-jwt';

import { CONFIG_DEV } from '../../config/config.dev';
import { JwtHydratorService } from './jwt-hydrator.service';
import { JwtService } from './jwt.service';
import { RestModule } from '../../rest/rest.module';

@NgModule({
    imports: [
        RestModule
    ],
    providers: [
        JwtHydratorService,
        JwtService,
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
