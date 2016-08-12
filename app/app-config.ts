import { OpaqueToken } from '@angular/core';

import { Link } from './tasks/shared/link';

export interface AppConfig {
    apiEndpoint: Link;
    jwtName: string;
}

export const TASK_DI_CONFIG: AppConfig = {
    apiEndpoint: {
        href: 'http://assistant/app_dev.php/api/users/{id}',
        templated: true
    },
    jwtName: 'jwt'
};

export let APP_CONFIG = new OpaqueToken('app.config');