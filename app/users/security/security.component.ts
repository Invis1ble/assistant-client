import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';
import { JwtModel } from '../shared/jwt.model';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
    selector: 'assistant-security.primary-component-layout',
    templateUrl: 'app/users/security/security.component.html',
    styleUrls: [
        'app/users/security/security.component.css'
    ],
    directives: [
        LoginFormComponent
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

        if (null === requestedUrl) {
            requestedUrl = '';
        }

        this.router.navigate([ requestedUrl ]);
    }
}