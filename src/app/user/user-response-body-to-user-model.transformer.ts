import { Injectable } from '@angular/core';

import { UserModel } from './user.model';
import { UserResponseBody } from './user.response-body';

@Injectable()
export class UserResponseBodyToUserModelTransformer {

    transform(data: UserResponseBody): UserModel {
        return new UserModel(
            data.id,
            data.username,
            data.plainPassword,
            new Date(data.createdAt * 1000)
        );
    }

}
