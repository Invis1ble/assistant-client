import { Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { Body, DefaultHeaders, GET, POST, Path, Produces } from '../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { CONFIG } from '../config/config-token';
import { Config } from '../config/config';
import { NewUserModel } from './new-user.model';
import { RestService } from '../rest/rest.service';
import { UserModel } from './user.model';
import { UserResponseBody } from './user.response-body';
import { UserResponseBodyToUserModelTransformer } from './user-response-body-to-user-model.transformer';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class UserService extends RestService {

    constructor(
        http: AuthHttp,
        @Inject(CONFIG) config: Config,
        private responseToModelTransformer: UserResponseBodyToUserModelTransformer
    ) {
        super(http, config);
    }

    getUserById(id: string): Observable<UserModel> {
        return this.getUserRaw(id)
            .map((data: UserResponseBody): UserModel => {
                return this.responseToModelTransformer.transform(data);
            });
    }

    registerUser(user: NewUserModel): Observable<Response> {
        return this.registerUserRaw(user);
    }

    @POST('/users')
    private registerUserRaw(@Body user: NewUserModel): Observable<Response> {
        return null;
    }

    @GET('/users/{id}')
    @Produces<UserResponseBody>()
    private getUserRaw(@Path('id') id: string): Observable<UserResponseBody> {
        return null;
    }

}
