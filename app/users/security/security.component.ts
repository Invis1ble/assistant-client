import { Component } from '@angular/core';

import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
    selector: 'assistant-security.primary-component-layout',
    templateUrl: 'app/users/security/security.component.html',
    styleUrls: [
        'app/users/security/security.component.css'
    ],
    directives: [
        LoginFormComponent
    ],
})
export class SecurityComponent {

}