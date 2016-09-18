import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { provideAuth } from 'angular2-jwt/angular2-jwt';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdMenuModule } from '@angular2-material/menu';
import { MdIconModule } from '@angular2-material/icon';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list';

import { TASK_DI_CONFIG, APP_CONFIG } from './app-config';
import { AppValidatorsModule } from './shared/app-validators/app-validators.module';
import { AppFormModule } from './shared/app-form/app-form.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SecurityComponent } from './users/security/security.component';
import { LoginFormComponent } from './users/login-form/login-form.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { RegistrationFormComponent } from './users/registration-form/registration-form.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListItemComponent } from './tasks/task-list-item/task-list-item.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { AnonymousGuard } from './shared/anonymous-guard.service';
import { UserService } from './users/shared/user.service';
import { TaskService } from './tasks/shared/task.service';
import { PeriodService } from './tasks/shared/period.service';
import { JwtService } from './users/shared/jwt.service';
import { JwtStorage } from './users/shared/jwt-storage';
import { JwtLocalStorage } from './users/shared/jwt-local-storage';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { UrlGenerator } from './shared/url-generator.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdToolbarModule.forRoot(),
        MdCardModule.forRoot(),
        MdMenuModule.forRoot(),
        MdButtonModule.forRoot(),
        MdIconModule.forRoot(),
        MdProgressCircleModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdListModule.forRoot(),
        AppValidatorsModule,
        AppFormModule,
        routing
    ],
    declarations: [
        AppComponent,
        SidenavComponent,
        SecurityComponent,
        LoginFormComponent,
        RegistrationComponent,
        RegistrationFormComponent,
        TaskFormComponent,
        TaskListComponent,
        TaskListItemComponent,
        DurationPipe
    ],
    providers: [
        AuthGuard,
        AuthService,
        AnonymousGuard,
        JwtService,
        UserService,
        TaskService,
        PeriodService,
        UrlGenerator,
        provideAuth({
            globalHeaders: [{'Content-Type': 'application/json'}],
            // TODO: use JwtLocalStorage.prototype.getToken as tokenGetter
            tokenGetter: () => {
                let jwt = localStorage.getItem(TASK_DI_CONFIG.jwtName);

                if (null === jwt) {
                    return null;
                }

                return JSON.parse(jwt).token;
            },
            tokenName: TASK_DI_CONFIG.jwtName,
        }),
        { provide: APP_CONFIG, useValue: TASK_DI_CONFIG },
        { provide: JwtStorage, useClass: JwtLocalStorage }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}