import { Inject, Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from '../app-config';
import { JwtModel } from '../users/shared/jwt.model';
import { JwtStorage } from '../users/shared/jwt-storage';
import { UserModel } from '../users/shared/user.model';
import { UserService } from '../users/shared/user.service';

@Injectable()
export class AuthService {
    private jwtHelper = new JwtHelper();
    private requestedUrl: string;

    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private jwtStorage: JwtStorage,
        private userService: UserService
    ) {

    }

    getRequestedUrl() {
        return this.requestedUrl;
    }

    getUser(): Observable<UserModel> {
        let user = <UserModel> this.jwtStorage.getToken().data;

        return this.userService
            .getUser(this.config.apiEndpoint.href.replace('{id}', user.id));
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

    setRequestedUrl(url: string) {
        this.requestedUrl = url;
    }
}
