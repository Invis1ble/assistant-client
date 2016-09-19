import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { JwtStorage } from '../shared/jwt-storage';

@Component({
    template: ''
})
export class LogoutComponent {
    constructor(
        private jwtStorage: JwtStorage,
        private router: Router
    ) {
        jwtStorage.removeToken();

        this.router.navigate(['']);
    }
}