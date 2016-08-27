import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AppValidators } from '../../shared/app-validators';
import { FormErrors } from '../../shared/form-errors';
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
export class RegistrationFormComponent {
    private errors: FormErrors;
    private form: FormGroup;
    @Output() onRegister = new EventEmitter<UserModel>();
    private pending = false;
    private user = new NewUserModel();

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        this.resetErrors();

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

    private getControlError(controlName: string, errorCode: string): string {
        return this.form.controls[controlName].getError(errorCode);
    }

    private hasControlError(controlName: string, errorCode: string): boolean {
        return this.form.controls[controlName].hasError(errorCode);
    }

    private isControlValid(controlName: string): boolean {
        return !(
            this.errors.children &&
            this.errors.children[controlName] &&
            this.errors.children[controlName].errors &&
            this.errors.children[controlName].errors.length
        ) && (this.form.controls[controlName].valid || this.form.controls[controlName].pristine);
    }

    private onSubmit() {
        this.resetErrors();
        this.pending = true;

        this.user.username = this.form.value.username;
        this.user.plainPassword.first = this.form.value['plainPassword[first]'];
        this.user.plainPassword.second = this.form.value['plainPassword[second]'];

        this.register(this.user);
    }

    private register(user: NewUserModel) {
        this.userService.registerUser(user)
            .finally(() => this.pending = false)
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

                    this.errors.errors.push(`${response.statusText}.`);
                }
            );
    }

    private resetErrors() {
        this.setErrors({});
    }

    private setErrors(errors: FormErrors) {
        this.errors = errors;
    }
}