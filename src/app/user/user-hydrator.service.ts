import { Injectable } from '@angular/core';

import { User } from './user';
import { UserRaw } from './user-raw';

@Injectable()
export class UserHydratorService {

    hydrate(data: UserRaw): User {
        return new User(
            data.id,
            data.username,
            data.plainPassword,
            new Date(data.createdAt * 1000)
        );
    }

}
