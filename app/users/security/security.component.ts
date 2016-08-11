import { Component } from '@angular/core';

import { JwtModel } from '../shared/jwt.model';
import { JwtStorage } from '../shared/jwt-storage';
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
        private jwtStorage: JwtStorage
    ) {

    }

    onLoggedIn(token: JwtModel) {
        this.jwtStorage.setToken(token);
    }
}