import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../security/auth.service';
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
export class SidenavComponent {

    user: User;
    sections: SidenavSection[] = [];

    constructor(
        securityEventBus: SecurityEventBusService,
        private auth: AuthService,
        private router: Router
    ) {
        securityEventBus.userLoggedIn$.subscribe((user: User) => {
            this.onUserLoggedIn(user);
        });

        securityEventBus.userLoggedOut$.subscribe(() => {
            this.onUserLoggedOut();
        });

        this.syncSections();
    }

    logout() {
        this.auth.logout();
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

}
