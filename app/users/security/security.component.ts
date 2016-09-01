import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';
import { JwtModel } from '../shared/jwt.model';

@Component({
    selector: 'assistant-security.primary-component-layout',
    templateUrl: 'app/users/security/security.component.html',
    styleUrls: [
        'app/users/security/security.component.css'
    ]
})
export class SecurityComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    onLoggedIn(jwt: JwtModel) {
        let requestedUrl = this.authService.getRequestedUrl();

        this.authService.setLoggedIn(jwt);

        if (undefined === requestedUrl) {
            requestedUrl = '';
        }

        this.router.navigate([ requestedUrl ]);
    }
}