import { provideRouter, RouterConfig } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SecurityComponent } from './users/security/security.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/security',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TaskListComponent
    },
    {
        path: 'security',
        component: SecurityComponent
    }
];

export const APP_ROUTER_PROVIDER = [
    provideRouter(routes)
];
