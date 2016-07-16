import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDER } from './app.routes';
import { APP_CONFIG, TASK_DI_CONFIG } from './app-config';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDER,
    { provide: APP_CONFIG, useValue: TASK_DI_CONFIG },
]);
