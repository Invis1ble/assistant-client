import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AppValidators } from '../../shared/app-validators';
import { AbstractFormComponent } from '../../shared/abstract-form.component';
import { NewUserModel } from '../shared/new-user.model';
import { UserModel } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'assistant-registration-form',
    templateUrl: 'app/users/registration-form/registration-form.component.html',
    styleUrls: [
        'app/users/registration-form/registration-form.component.css'
    ]
})
export class RegistrationFormComponent extends AbstractFormComponent {
    @Output() onRegister = new EventEmitter<UserModel>();
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
            'plainPassword[first]': [this.user.plainPassword.first, [
                Validators.required,
                Validators.minLength(6)
            ]],
            'plainPassword[second]': [this.user.plainPassword.second, [
                Validators.required,
                AppValidators.equalTo('plainPassword[first]')
            ]]
        });
    }

    protected onSubmit() {
        super.onSubmit();

        this.user.username = this.form.value.username;
        this.user.plainPassword.first = this.form.value['plainPassword[first]'];
        this.user.plainPassword.second = this.form.value['plainPassword[second]'];

        this.register(this.user);
    }

    private register(user: NewUserModel) {
        this.userService.registerUser(user)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (user: UserModel) => {
                    this.onRegister.emit(user);
                },
                (response: Response) => {
                    if (400 === response.status) {
                        this.setErrors(response.json().errors);
                        return;
                    }

                    if (undefined === this.errors.errors) {
                        this.errors.errors = [];
                    }

                    this.errors.errors.push(`${response.statusText ? response.statusText : 'Unknown Error'}.`);
                }
            );
    }
}