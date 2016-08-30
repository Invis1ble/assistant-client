import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AbstractFormComponent } from '../../shared/abstract-form.component';
import { UserModel } from '../shared/user.model';
import { JwtModel } from '../shared/jwt.model';
import { JwtService } from '../shared/jwt.service';

@Component({
    selector: 'assistant-login-form',
    templateUrl: 'app/users/login-form/login-form.component.html',
    styleUrls: [
        'app/users/login-form/login-form.component.css'
    ],
    providers: [
        JwtService
    ]
})
export class LoginFormComponent extends AbstractFormComponent {
    @Output() onLoggedIn = new EventEmitter<JwtModel>();

    constructor(
        private tokenService: JwtService,
        private formBuilder: FormBuilder
    ) {
        super();

        this.form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    private logIn(user: UserModel) {
        this.tokenService.getToken(user)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (jwt: JwtModel) => {
                    this.onLoggedIn.emit(jwt);
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

    protected onSubmit() {
        super.onSubmit();

        let user = new UserModel();

        user.username = this.form.value.username;
        user.plainPassword = this.form.value.password;

        this.logIn(user);
    }
}