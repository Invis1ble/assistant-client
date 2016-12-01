import { Inject, Injectable } from '@angular/core';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { JwtModel } from './jwt.model';
import { JwtStorage } from './jwt-storage';

@Injectable()
export class JwtLocalStorageService implements JwtStorage {

    constructor(
        @Inject(CONFIG) private config: Config
    ) {

    }

    hasToken(): boolean {
        return localStorage.getItem(this.config.jwtName) !== null;
    }

    getToken(): JwtModel | null {
        const jwt = localStorage.getItem(this.config.jwtName);

        if (null === jwt) {
            return null;
        }

        return JSON.parse(jwt);
    }

    setToken(jwt: JwtModel): void {
        return localStorage.setItem(this.config.jwtName, JSON.stringify(jwt));
    }

    removeToken(): void {
        return localStorage.removeItem(this.config.jwtName);
    }

}
