import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { provideAuth } from 'angular2-jwt/angular2-jwt';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdMenuModule } from '@angular2-material/menu';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon'; // TODO: remove MdIconRegistry
import { OVERLAY_PROVIDERS } from '@angular2-material/core'; // TODO: remove OVERLAY_PROVIDERS
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';

import { TASK_DI_CONFIG, APP_CONFIG } from './app-config';
import { AppValidatorsModule } from './shared/app-validators/app-validators.module';
import { AppFormModule } from './shared/app-form/app-form.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
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
import { JwtStorage } from './users/shared/jwt-storage';
import { JwtLocalStorage } from './users/shared/jwt-local-storage';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { IterablePipe } from './shared/pipes/iterable.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdToolbarModule,
        MdCardModule,
        MdMenuModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdProgressCircleModule,
        AppValidatorsModule,
        AppFormModule,
        routing
    ],
    declarations: [
        AppComponent,
        SecurityComponent,
        LoginFormComponent,
        RegistrationComponent,
        RegistrationFormComponent,
        TaskFormComponent,
        TaskListComponent,
        TaskListItemComponent,
        DurationPipe,
        IterablePipe
    ],
    providers: [
        AuthGuard,
        AuthService,
        AnonymousGuard,
        UserService,
        TaskService,
        PeriodService,
        MdIconRegistry,
        OVERLAY_PROVIDERS,
        provideAuth({
            globalHeaders: [{'Content-Type': 'application/json'}],
            // TODO: use JwtLocalStorage.prototype.getToken as tokenGetter
            // tokenGetter: () => JSON.parse(localStorage.getItem(TASK_DI_CONFIG.jwtName)).token,
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