import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { JwtStorage } from '../security/jwt/jwt-storage';
import { SecurityEventBusService } from '../security/security-event-bus.service';
import { SidenavItem } from './sidenav-item';
import { SidenavSection } from './sidenav-section';
import { User } from '../user/user';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

    user: User;
    sections: SidenavSection[] = [];

    private userLoggedInSubscription: Subscription;
    private userLoggedOutSubscription: Subscription;

    constructor(
        private securityEventBus: SecurityEventBusService,
        private jwtStorage: JwtStorage,
        private router: Router
    ) {
        this.userLoggedInSubscription = this.securityEventBus.userLoggedIn$
            .subscribe((user: User) => {
                this.onUserLoggedIn(user);
            });

        this.userLoggedOutSubscription = this.securityEventBus.userLoggedOut$
            .subscribe(() => {
                this.onUserLoggedOut();
            });

        this.syncSections();
    }

    logout() {
        this.jwtStorage.removeToken();
        this.securityEventBus.userLoggedOut$.emit();
    }

    private syncSections(): void {
        const accountItems: SidenavItem[] = [];

        this.sections = [
            { title: 'Аккаунт', items: accountItems },
        ];

        if (isPresent(this.user)) {
            this.sections.push(
                { items: [
                    { title: 'Задачи', icon: 'mdi-format-list-bulleted', routerLink: 'tasks' }
                ]}
            );
        } else {
            accountItems.push(
                { title: 'Вход', icon: 'mdi-login', routerLink: 'login' },
                { title: 'Регистрация', icon: 'mdi-account-plus', routerLink: 'register' }
            );
        }
    }

    private onUserLoggedIn(user: User): void {
        this.user = user;
        this.syncSections();
    }

    private onUserLoggedOut(): void {
        this.user = null;
        this.syncSections();
        this.router.navigate(['login']);
    }

    ngOnDestroy(): void {
        this.userLoggedInSubscription.unsubscribe();
        this.userLoggedOutSubscription.unsubscribe();
    }
}
