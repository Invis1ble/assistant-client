import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideAuth } from 'angular2-jwt';

import { APP_CONFIG, TASK_DI_CONFIG } from './app-config';
import { APP_ROUTER_PROVIDER } from './app.routes';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { JwtStorage } from './users/shared/jwt-storage';
import { JwtLocalStorage } from './users/shared/jwt-local-storage';
import { UserService } from './users/shared/user.service';
import { PeriodService } from './tasks/shared/period.service';
import { TaskService } from './tasks/shared/task.service';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDER,
    AuthGuard,
    AuthService,
    HTTP_PROVIDERS,
    UserService,
    PeriodService,
    TaskService,
    disableDeprecatedForms(),
    provideAuth({
        globalHeaders: [{'Content-Type': 'application/json'}],
        // TODO: use JwtLocalStorage.prototype.getToken as tokenGetter
        tokenGetter: () => JSON.parse(localStorage.getItem(TASK_DI_CONFIG.jwtName)).token,
        tokenName: TASK_DI_CONFIG.jwtName,
    }),
    provideForms(),
    { provide: APP_CONFIG, useValue: TASK_DI_CONFIG },
    { provide: JwtStorage, useClass: JwtLocalStorage }
])
    .catch((err: any) => console.error(err));
