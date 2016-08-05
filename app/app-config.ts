import { OpaqueToken } from '@angular/core';

export interface AppConfig {
    apiEndpoint: string;
}

export const TASK_DI_CONFIG: AppConfig = {
    apiEndpoint: 'http://assistant/app_dev.php/api/users'
};

export let APP_CONFIG = new OpaqueToken('app.config');