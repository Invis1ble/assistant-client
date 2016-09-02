import { Directive, NgModule } from '@angular/core';

@Directive({
    selector: 'md-input-error'
})
export class AppInputError {

}
@Directive({
    selector: 'md-form-error'
})
export class AppFormError {

}

const APP_FORM_DIRECTIVES = [
    AppInputError,
    AppFormError
];

@NgModule({
    declarations: [
        APP_FORM_DIRECTIVES
    ],
    exports: [
        APP_FORM_DIRECTIVES
    ]
})
export class AppFormModule {

}