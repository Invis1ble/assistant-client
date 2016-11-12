import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';

import { Jwt } from './jwt/jwt';
import { JwtStorage } from './jwt/jwt-storage';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { isPresent } from '../facade/lang';

@Injectable()
export class AuthService {

    private requestedUrl: string;

    constructor(
        private jwtStorage: JwtStorage,
        private userService: UserService
    ) {

    }

    getRequestedUrl(): string | undefined {
        return this.requestedUrl;
    }

    isLoggedIn(): boolean {
        let jwt = this.jwtStorage.getToken();

        if (null === jwt) {
            return false;
        }

        return !(new JwtHelper()).isTokenExpired(jwt.token);
    }

    setLoggedIn(jwt: Jwt): void {
        return this.jwtStorage.setToken(jwt);
    }

    setRequestedUrl(url: string): void {
        this.requestedUrl = url;
    }

    getUser(): Observable<User> {
        const jwt = this.jwtStorage.getToken();

        if (!isPresent(jwt)) {
            throw new Error('Token is not found.');
        }

        return this.userService.getUserById(jwt.data.id);
    }

}
