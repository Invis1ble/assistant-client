import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { AbstractForm } from '../form/abstract-form';
import { AuthService } from '../security/auth.service';
import { Credentials } from '../security/credentials';
import { Jwt } from '../security/jwt/jwt';
import { JwtService } from '../security/jwt/jwt.service';

@Component({
    selector: 'app-login.primary-component-layout',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractForm {

    constructor(
        formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private jwtService: JwtService
    ) {
        super();

        this.form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        super.onSubmit();

        this.logIn(new Credentials(this.form.value.username, this.form.value.password));
    }

    logIn(credentials: Credentials): void {
        this.jwtService.createJwt(credentials)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (jwt: Jwt) => {
                    let requestedUrl = this.authService.getRequestedUrl();

                    this.authService.setLoggedIn(jwt);

                    if (undefined === requestedUrl) {
                        requestedUrl = '';
                    }

                    this.router.navigate([ requestedUrl ]);
                },
                (response: Response) => {
                    let errors;

                    switch (response.status) {
                        case 400:
                            errors = response.json().errors;
                            break;

                        case 401:
                            errors = {
                                errors: ['Неверное имя пользователя или пароль.']
                            };

                            break;

                        default:
                            errors = {
                                errors: [`${response.statusText ? response.statusText : 'Unknown Error'}.`]
                            };
                    }

                    this.setFormErrors(errors);
                }
            );
    }

}
