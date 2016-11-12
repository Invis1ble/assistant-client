import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnonymousGuardService } from './anonymous-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { TaskListComponent } from '../task-list/task-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ AnonymousGuardService ]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [ AnonymousGuardService ]
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [ AuthGuardService ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AnonymousGuardService,
        AuthGuardService
    ]
})
export class RoutingModule {



}
