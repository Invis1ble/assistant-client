import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import { AbstractForm } from '../form/abstract-form';
import { AuthService } from '../security/auth.service';
import { Credentials } from '../security/credentials';
import { Jwt } from '../security/jwt/jwt';
import { JwtService } from '../security/jwt/jwt.service';
import { NewUser } from '../user/new-user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-registration.primary-component-layout',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends AbstractForm {

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private jwtService: JwtService,
        private userService: UserService
    ) {
        super();

        this.form = formBuilder.group({
            username: ['', [
                Validators.required,
                Validators.minLength(2)
            ]],
            plainPassword: formBuilder.group({
                first: ['', [
                    Validators.required,
                    Validators.minLength(6)
                ]],
                second: ['', [
                    Validators.required,
                    // AppValidators.equalTo('plainPassword.first')
                ]]
            })
        });
    }

    onSubmit() {
        super.onSubmit();

        this.register(new NewUser(this.form.value.username, {
            first: this.form.value.plainPassword.first,
            second: this.form.value.plainPassword.second
        }));
    }

    private register(user: NewUser) {
        this.userService.registerUser(user)
            .switchMap(() => {
                return this.jwtService.createJwt(new Credentials(user.username, user.plainPassword.first));
            })
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (jwt: Jwt) => {
                    let requestedUrl = this.authService.getRequestedUrl();

                    this.authService.setAuthenticated(jwt);

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
