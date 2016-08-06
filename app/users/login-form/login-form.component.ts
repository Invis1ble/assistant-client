import { Component, EventEmitter, Output } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';

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
        JWTService
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_INPUT_DIRECTIVES
    ]
})
export class LoginFormComponent {
    user = new UserModel();
    @Output() onSignedIn = new EventEmitter();

    constructor(
        private tokenService: JWTService
    ) {

    }

    onSubmit() {
        console.log('onSubmit()');
    }

    signIn() {
        this.tokenService.getToken(this.user)
            .subscribe((token: JWTModel) => {
                this.onSignedIn.emit(token);
            });
    }
}