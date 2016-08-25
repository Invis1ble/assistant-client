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
import { MdInputModule } from '@angular2-material/input';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';

import { TASK_DI_CONFIG, APP_CONFIG } from './app-config';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SecurityComponent } from './users/security/security.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './users/shared/user.service';
import { TaskService } from './tasks/shared/task.service';
import { PeriodService } from './tasks/shared/period.service';
import { JwtStorage } from './users/shared/jwt-storage';
import { JwtLocalStorage } from './users/shared/jwt-local-storage';
import { DurationPipe } from './duration.pipe';

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
        routing
    ],
    declarations: [
        AppComponent,
        SecurityComponent,
        TaskListComponent,
        DurationPipe
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        TaskService,
        PeriodService,
        provideAuth({
            globalHeaders: [{'Content-Type': 'application/json'}],
            // TODO: use JwtLocalStorage.prototype.getToken as tokenGetter
            tokenGetter: () => JSON.parse(localStorage.getItem(TASK_DI_CONFIG.jwtName)).token,
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