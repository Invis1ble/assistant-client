import { NgModule } from '@angular/core';

import { UserResponseBodyToUserModelTransformer } from './user-response-body-to-user-model.transformer';
import { UserService } from './user.service';

@NgModule({
    providers: [
        UserResponseBodyToUserModelTransformer,
        UserService
    ]
})
export class UserModule {



}
