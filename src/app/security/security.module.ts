import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { JwtModule } from './jwt/jwt.module';
import { SecurityEventBus } from './security.event-bus';

@NgModule({
    imports: [
        JwtModule
    ],
    providers: [
        AuthService,
        SecurityEventBus
    ],
    exports: [
        JwtModule
    ]
})
export class SecurityModule {



}