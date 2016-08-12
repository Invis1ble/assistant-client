import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { JwtModel } from '../users/shared/jwt.model';
import { JwtStorage } from '../users/shared/jwt-storage';

@Injectable()
export class AuthService {
    private jwtHelper = new JwtHelper();
    private requestedUrl: string;

    constructor(
        private jwtStorage: JwtStorage
    ) {

    }

    isLoggedIn(): boolean {
        let jwt = this.jwtStorage.getToken();

        if (null === jwt) {
            return false;
        }

        return !this.jwtHelper.isTokenExpired(jwt.token);
    }

    setLoggedIn(jwt: JwtModel) {
        this.jwtStorage.setToken(jwt);
    }

    getRequestedUrl() {
        return this.requestedUrl;
    }

    setRequestedUrl(url: string) {
        this.requestedUrl = url;
    }
}
