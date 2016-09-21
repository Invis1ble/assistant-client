import { Injectable, EventEmitter } from '@angular/core';

import { UserModel } from '../../users/shared/user.model';

@Injectable()
export class SecurityEventBusService {
    userLoggedIn$ = new EventEmitter<UserModel>();
    userLoggedOut$ = new EventEmitter();
}