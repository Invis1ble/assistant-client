import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { APP_CONFIG, TASK_DI_CONFIG } from './app-config';
import { APP_ROUTER_PROVIDER } from './app.routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDER,
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    { provide: APP_CONFIG, useValue: TASK_DI_CONFIG },
])
    .catch((err: any) => console.error(err));
