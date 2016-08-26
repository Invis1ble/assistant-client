import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/finally';

import { AppValidators } from '../../shared/app-validators';
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
    private error: string;
    private form: FormGroup;
    @Output() onRegister = new EventEmitter<UserModel>();
    private pending = false;
    private user = new UserModel();

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            username: [this.user.username, Validators.required],
            password: [this.user.password, Validators.required],
            passwordConfirmation: [this.user.password, [Validators.required, AppValidators.equalTo('password')]]
        });
    }

    private onSubmit() {
        this.error = null;
        this.pending = true;
        this.register(this.form.value);
    }

    private hasError(name: string): boolean {
        return !this.form.controls[name].valid && !this.form.controls[name].pristine;
    }

    private register(user: UserModel) {
        this.userService.saveUser(user)
            .finally(() => this.pending = false)
            .subscribe(
                (user: UserModel) => {
                    this.onRegister.emit(user);
                },
                (error: any) => {
                    // todo: improve validation
                    this.error = `${error.statusText}.`;
                }
            );
    }
}