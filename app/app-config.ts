import { OpaqueToken } from '@angular/core';

import { Link } from './tasks/shared/link';

export interface AppConfig {
    apiEndpoint: Link;
    jwtName: string;
}

export const TASK_DI_CONFIG: AppConfig = {
    apiEndpoint: {
        href: 'https://assistant'
    },
    jwtName: 'jwt'
};

export let APP_CONFIG = new OpaqueToken('app.config');