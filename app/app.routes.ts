import { provideRouter, RouterConfig } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SecurityComponent } from './users/security/security.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: SecurityComponent
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [ AuthGuard ]
    }
];

export const APP_ROUTER_PROVIDER = [
    provideRouter(routes)
];
