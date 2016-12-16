import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserModel } from '../user/user.model';

@Injectable()
export class SecurityEventBus {

    userLoggedIn$ = new ReplaySubject<UserModel>(1);
    userLoggedOut$ = new ReplaySubject(1);

}
