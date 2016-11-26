import { Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { Body, DefaultHeaders, GET, POST, Path, Produces } from '../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { CONFIG } from '../config/config-token';
import { Config } from '../config/config';
import { NewUser } from './new-user';
import { RestService } from '../rest/rest.service';
import { User } from './user';
import { UserHydratorService } from './user-hydrator.service';
import { UserRaw } from './user-raw';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class UserService extends RestService {

    constructor(
        http: AuthHttp,
        @Inject(CONFIG) config: Config,
        private userHydrator: UserHydratorService
    ) {
        super(http, config);
    }

    getUserById(id: string): Observable<User> {
        return this.getUserRaw(id)
            .map((data: UserRaw): User => {
                return this.userHydrator.hydrate(data);
            });
    }

    registerUser(user: NewUser): Observable<Response> {
        return this.registerUserRaw(user);
    }

    @POST('/users')
    private registerUserRaw(@Body user: NewUser): Observable<Response> {
        return null;
    }

    @GET('/users/{id}')
    @Produces<UserRaw>()
    private getUserRaw(@Path('id') id: string): Observable<UserRaw> {
        return null;
    }

}
