import { Component } from '@angular/core';

import { AuthService } from './security/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Assistant App';

    constructor(
        auth: AuthService
    ) {
        console.info('AppComponent.constructor()');

        auth.autologin();
    }
}
