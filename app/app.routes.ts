import { provideRouter, RouterConfig } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SecurityComponent } from './users/security/security.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'security',
        component: SecurityComponent,
        canActivate: [ AuthGuard ]
    }
];

export const APP_ROUTER_PROVIDER = [
    provideRouter(routes)
];
