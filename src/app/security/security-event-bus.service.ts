import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { User } from '../user/user';

@Injectable()
export class SecurityEventBusService {

    userLoggedIn$ = new ReplaySubject<User>(1);
    userLoggedOut$ = new ReplaySubject(1);

}
