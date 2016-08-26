import { Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../app-config';
import { JwtModel } from './jwt.model';
import { JwtStorage } from './jwt-storage';

@Injectable()
export class JwtLocalStorage implements JwtStorage {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig
    ) {

    }

    getToken(): JwtModel {
        let jwt = localStorage.getItem(this.config.jwtName);

        if (null === jwt) {
            return null;
        }

        return JSON.parse(jwt);
    }

    setToken(jwt: JwtModel) {
        localStorage.setItem(this.config.jwtName, JSON.stringify(jwt));
    }
}