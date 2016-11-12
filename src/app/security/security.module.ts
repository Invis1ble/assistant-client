import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { JwtModule } from './jwt/jwt.module';
import { SecurityEventBusService } from './security-event-bus.service';

@NgModule({
    imports: [
        JwtModule
    ],
    providers: [
        AuthService,
        SecurityEventBusService
    ],
    exports: [
        JwtModule
    ]
})
export class SecurityModule {



}