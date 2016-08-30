import { NgModule } from '@angular/core';

import { APP_VALIDATORS_DIRECTIVES } from './app-validators';

@NgModule({
    declarations: [
        APP_VALIDATORS_DIRECTIVES
    ],
    exports: [
        APP_VALIDATORS_DIRECTIVES
    ]
})
export class AppValidatorsModule {

}