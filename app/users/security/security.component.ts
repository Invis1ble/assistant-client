import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';
import { JwtModel } from '../shared/jwt.model';
import { LoginFormComponent } from '../login-form/login-form.component';
import { JwtStorage } from '../shared/jwt-storage';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

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
export class SecurityComponent implements OnInit {
    private jwtHelper = new JwtHelper();

    constructor(
        private authService: AuthService,
        private router: Router,
        private jwtStorage: JwtStorage
    ) {

    }

    ngOnInit() {
        let jwt = this.jwtStorage.getToken();

        console.log(jwt);

        if (null !== jwt) {
            console.log(this.jwtHelper.isTokenExpired(jwt.token));
            console.log(this.jwtHelper.decodeToken(jwt.token));
        }
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