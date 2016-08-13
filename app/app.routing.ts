import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SecurityComponent } from './users/security/security.component';
import { AuthGuard } from './shared/auth-guard.service';

const appRoutes: Routes = [
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

export const routing = RouterModule.forRoot(appRoutes);
