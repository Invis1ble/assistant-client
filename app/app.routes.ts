import { provideRouter, RouterConfig } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TaskListComponent
    }
];

export const APP_ROUTER_PROVIDER = [
    provideRouter(routes)
];
