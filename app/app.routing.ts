import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SecurityComponent } from './users/security/security.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AnonymousGuard } from './shared/anonymous-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: SecurityComponent,
        canActivate: [ AnonymousGuard ]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [ AnonymousGuard ]
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [ AuthGuard ]
    }
];

export const routing = RouterModule.forRoot(appRoutes);
