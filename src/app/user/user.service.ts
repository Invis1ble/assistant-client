import { Inject, Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Action, Body, Parameter } from 'ng2-rest-service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../config/config-token';
import { Config } from '../config/config';
import { NewUserModel } from './new-user.model';
import { PreconfiguredRestService } from '../rest/preconfigured-rest.service';
import { UserModel } from './user.model';
import { UserResponseBodyToUserModelTransformer } from './user-response-body-to-user-model.transformer';

@Injectable()
export class UserService extends PreconfiguredRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config
    ) {
        super(injector, config);
    }

    @Action({
        client: AuthHttp,
        path: '/users/{id}',
        responseTransformer: UserResponseBodyToUserModelTransformer
    })
    getUserById(@Parameter('id') id: string): Observable<UserModel> {
        return null;
    }

    @Action({
        path: '/users',
        method: 'POST',
        useRawResponse: true
    })
    registerUser(@Body user: NewUserModel): Observable<Response> {
        return null;
    }

}
