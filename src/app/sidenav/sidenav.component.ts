import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../security/auth.service';
import { SecurityEventBus } from '../security/security.event-bus';
import { SidenavItem } from './sidenav-item';
import { SidenavSection } from './sidenav-section';
import { UserModel } from '../user/user.model';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    user: UserModel;
    sections: SidenavSection[] = [];

    constructor(
        securityEventBus: SecurityEventBus,
        private auth: AuthService,
        private router: Router
    ) {
        securityEventBus.userLoggedIn$.subscribe((user: UserModel) => {
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

    private onUserLoggedIn(user: UserModel): void {
        this.user = user;
        this.syncSections();
    }

    private onUserLoggedOut(): void {
        this.user = null;
        this.syncSections();
        this.router.navigate(['login']);
    }

}
