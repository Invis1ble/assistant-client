import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'assistant-registration.primary-component-layout',
    templateUrl: 'app/users/registration/registration.component.html',
    styleUrls: [
        'app/users/registration/registration.component.css'
    ]
})
export class RegistrationComponent {
    constructor(
        private router: Router
    ) {

    }

    onRegister() {
        console.log('onRegister');

        // let requestedUrl = this.authService.getRequestedUrl();
        //
        // this.authService.setLoggedIn(jwt);
        //
        // if (undefined === requestedUrl) {
        //     requestedUrl = '';
        // }
        //
        // this.router.navigate([ requestedUrl ]);
    }
}