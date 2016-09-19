import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { SidenavItem } from './sidenav-item';
import { SidenavSection } from './sidenav-section';

@Component({
    selector: 'assistant-sidenav',
    templateUrl: 'app/shared/sidenav/sidenav.component.html',
    styleUrls: [
        'app/shared/sidenav/sidenav.component.css'
    ]
})
export class SidenavComponent {
    sections: SidenavSection[] = [];

    constructor(
        private authService: AuthService
    ) {
        let accountItems: SidenavItem[] = [];

        this.sections = [
            { title: 'Аккаунт', items: accountItems },
        ];

        if (this.authService.isLoggedIn()) {
            accountItems.push(
                { title: 'Выход', icon: 'mdi-logout', routerLink: 'logout' }
            );

            this.sections.push(
                { items: [
                    { title: 'Задачи', icon: 'power_settings_new', routerLink: 'tasks' }
                ]}
            );
        } else {
            accountItems.push(
                { title: 'Вход', icon: 'mdi-login', routerLink: 'login' },
                { title: 'Регистрация', icon: 'mdi-account-plus', routerLink: 'register' }
            );
        }
    }
}
