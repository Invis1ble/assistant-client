import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';
import { JwtModel } from '../shared/jwt.model';

@Component({
    selector: 'assistant-registration.primary-component-layout',
    templateUrl: 'app/users/registration/registration.component.html',
    styleUrls: [
        'app/users/registration/registration.component.css'
    ]
})
export class RegistrationComponent {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    onRegister(jwt: JwtModel): void {
        let requestedUrl = this.authService.getRequestedUrl();

        this.authService.setLoggedIn(jwt);

        if (undefined === requestedUrl) {
            requestedUrl = '';
        }

        this.router.navigate([ requestedUrl ]);
    }
}