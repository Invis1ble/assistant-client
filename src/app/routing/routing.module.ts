import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnonymousGuard } from './anonymous.guard';
import { AuthGuard } from './auth.guard';
import { CategoryListComponent } from '../category-list/category-list.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { TaskListComponent } from '../task-list/task-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/categories',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ AnonymousGuard ]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [ AnonymousGuard ]
    },
    {
        path: 'categories',
        component: CategoryListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'categories/:id/tasks',
        component: TaskListComponent,
        canActivate: [ AuthGuard ]
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
        AnonymousGuard,
        AuthGuard
    ]
})
export class RoutingModule {



}
