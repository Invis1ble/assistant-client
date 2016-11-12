import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../user/user';

@Injectable()
export class SecurityEventBusService {

    userLoggedIn$ = new EventEmitter<User>();
    userLoggedOut$ = new EventEmitter();

}
