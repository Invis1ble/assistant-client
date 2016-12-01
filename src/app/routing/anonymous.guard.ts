import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../security/auth.service';

@Injectable()
export class AnonymousGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.authService.isAuthenticated()) {
            return true;
        }

        this.authService.setRequestedUrl(state.url);

        return false;
    }

}
