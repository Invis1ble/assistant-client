import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/finally';

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
export class LoginFormComponent {
    error: string;
    form: FormGroup;
    @Output() onLoggedIn = new EventEmitter();
    pending = false;

    constructor(
        private tokenService: JwtService,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    logIn(user: UserModel) {
        this.tokenService.getToken(user)
            .finally(() => this.pending = false)
            .subscribe(
                (jwt: JwtModel) => {
                    this.onLoggedIn.emit(jwt);
                },
                (error: any) => {
                    if (401 === error.status) {
                        this.error = 'Неверное имя пользователя или пароль.';
                        return;
                    }

                    this.error = `${error.statusText}.`;
                }
            );
    }

    onSubmit() {
        this.error = null;
        this.pending = true;
        this.logIn(this.form.value);
    }
}