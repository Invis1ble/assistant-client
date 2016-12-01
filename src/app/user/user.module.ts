import { NgModule } from '@angular/core';

import { RestModule } from '../rest/rest.module';
import { UserResponseBodyToUserModelTransformer } from './user-response-body-to-user-model.transformer';
import { UserService } from './user.service';

@NgModule({
    imports: [
        RestModule
    ],
    providers: [
        UserResponseBodyToUserModelTransformer,
        UserService
    ]
})
export class UserModule {



}
