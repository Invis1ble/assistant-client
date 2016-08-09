import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle/progress-circle';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { UserModel } from '../shared/user.model';
import { JWTModel } from '../shared/jwt.model';
import { JWTService } from '../shared/jwt.service';

@Component({
    selector: 'assistant-login-form',
    templateUrl: 'app/users/login-form/login-form.component.html',
    styleUrls: [
        'app/users/login-form/login-form.component.css'
    ],
    providers: [
        JWTService,
        MdIconRegistry
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MdIcon,
        REACTIVE_FORM_DIRECTIVES
    ]
})
export class LoginFormComponent {
    error: string;
    form: FormGroup;
    @Output() onLoggedIn = new EventEmitter();
    pending = false;

    constructor(
        private tokenService: JWTService,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.error = null;
        this.pending = true;
        this.logIn(this.form.value);
    }

    logIn(user: UserModel) {
        this.tokenService.getToken(user)
            .subscribe(
                (token: JWTModel) => {
                    this.onLoggedIn.emit(token);
                    this.pending = false;
                },
                (error: any) => {
                    this.pending = false;

                    if (401 === error.status) {
                        this.error = 'Неверное имя пользователя или пароль.';
                        return;
                    }

                    this.error = `${error.statusText}.`;
                }
            );
    }
}