import { Injectable } from '@angular/core';

import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Credentials } from './credentials';
import { Jwt } from './jwt/jwt';
import { JwtService } from './jwt/jwt.service';
import { JwtStorage } from './jwt/jwt-storage';
import { SecurityEventBusService } from './security-event-bus.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    private requestedUrl: string;
    private refreshTokenSubscription: Subscription;

    constructor(
        private authHttp: AuthHttp,
        private jwtHelper: JwtHelper,
        private jwtService: JwtService,
        private jwtStorage: JwtStorage,
        private userService: UserService,
        private securityEventBus: SecurityEventBusService
    ) {

    }

    login(credentials: Credentials): Observable<User> {
        return this.jwtService.createJwt(credentials)
            .do((jwt: Jwt) => {
                this.setAuthenticated(jwt);
                this.scheduleTokenRefresh();
            })
            .mergeMap((): Observable<User> => {
                return this.getUser();
            });
    }

    autologin(): void {
        this.getUser()
            .filter((user: User | null): boolean => null !== user)
            .subscribe(() => {
                this.startupTokenRefresh();
            });
    }

    logout(): void {
        this.unscheduleRefresh();
        this.jwtStorage.removeToken();
        this.securityEventBus.userLoggedOut$.next(null);
    }

    getRequestedUrl(): string | undefined {
        return this.requestedUrl;
    }

    isAuthenticated(): boolean {
        let jwt = this.jwtStorage.getToken();

        if (null === jwt) {
            return false;
        }

        return !this.jwtHelper.isTokenExpired(jwt.token);
    }

    setAuthenticated(jwt: Jwt): void {
        return this.jwtStorage.setToken(jwt);
    }

    setRequestedUrl(url: string): void {
        this.requestedUrl = url;
    }

    private scheduleTokenRefresh(): void {
        this.refreshTokenSubscription = this.authHttp.tokenStream
            .mergeMap((token) => {
                const decodedToken = this.jwtHelper.decodeToken(token);

                return Observable.interval(
                    new Date(0).setUTCSeconds(decodedToken.exp) - new Date(0).setUTCSeconds(decodedToken.iat)
                );
            })
            .mergeMap((): Observable<Jwt> => {
                return this.refreshJwt();
            })
            .subscribe();
    }

    private unscheduleRefresh(): void {
        if (this.refreshTokenSubscription) {
            this.refreshTokenSubscription.unsubscribe();
        }
    }

    private startupTokenRefresh(): void {
        this.authHttp.tokenStream
            .mergeMap((token) => {
                const exp: Date = new Date(0);
                exp.setUTCSeconds(this.jwtHelper.decodeToken(token).exp);

                return Observable.timer(exp.valueOf() - new Date().valueOf());
            })
            .mergeMap((): Observable<Jwt> => {
                return this.refreshJwt();
            })
            .subscribe(() => {
                this.scheduleTokenRefresh();
            });
    }

    private refreshJwt(): Observable<Jwt> {
        return this.jwtService.refreshJwt(this.jwtStorage.getToken())
            .do((jwt: Jwt) => {
                console.log(this.jwtHelper.decodeToken(jwt.token));

                this.setAuthenticated(jwt);
            });
    }

    private getUser(): Observable<User | null> {
        if (!this.isAuthenticated()) {
            return Observable.of(null);
        }

        return this.userService.getUserById(this.jwtStorage.getToken().data.id)
            .do((user: User) => {
                console.log('Emitting user');

                this.securityEventBus.userLoggedIn$.next(user);
            });
    }

}
