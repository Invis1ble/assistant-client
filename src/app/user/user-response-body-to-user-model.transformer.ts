import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service/dist/transformer';

import { UserModel } from './user.model';
import { UserResponseBody } from './user.response-body';

@Injectable()
export class UserResponseBodyToUserModelTransformer implements Transformer<UserResponseBody, UserModel> {

    transform(data: UserResponseBody): UserModel {
        return new UserModel(
            data.id,
            data.username,
            data.plainPassword,
            new Date(data.createdAt * 1000)
        );
    }

}
