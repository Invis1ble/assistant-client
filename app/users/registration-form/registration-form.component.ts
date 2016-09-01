import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AbstractFormComponent } from '../../shared/abstract-form.component';
import { AppValidators } from '../../shared/app-validators/app-validators';
import { NewUserModel } from '../shared/new-user.model';
import { UserService } from '../shared/user.service';
import { JwtModel } from '../shared/jwt.model';

@Component({
    selector: 'assistant-registration-form',
    templateUrl: 'app/users/registration-form/registration-form.component.html',
    styleUrls: [
        'app/users/registration-form/registration-form.component.css'
    ]
})
export class RegistrationFormComponent extends AbstractFormComponent {
    @Output() onRegister = new EventEmitter<JwtModel>();
    private user = new NewUserModel();

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        super();

        this.form = formBuilder.group({
            username: [this.user.username, [
                Validators.required,
                Validators.minLength(2)
            ]],
            plainPassword: formBuilder.group({
                first: [this.user.plainPassword.first, [
                    Validators.required,
                    Validators.minLength(6)
                ]],
                second: [this.user.plainPassword.second, [
                    Validators.required,
                    AppValidators.equalTo('plainPassword.first')
                ]]
            })
        });
    }

    protected onSubmit() {
        super.onSubmit();

        let newUser = new NewUserModel();

        newUser.username = this.form.value.username;
        newUser.plainPassword.first = this.form.value.plainPassword.first;
        newUser.plainPassword.second = this.form.value.plainPassword.second;

        this.register(newUser);
    }

    private register(user: NewUserModel) {
        this.userService.registerUser(user)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (jwt: JwtModel) => {
                    this.onRegister.emit(jwt);
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