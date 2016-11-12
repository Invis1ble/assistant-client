import { NgModule } from '@angular/core';

import { RestModule } from '../rest/rest.module';
import { UserHydratorService } from './user-hydrator.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        RestModule
    ],
    providers: [
        UserHydratorService,
        UserService
    ]
})
export class UserModule {



}
