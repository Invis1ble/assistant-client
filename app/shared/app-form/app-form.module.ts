import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdInputModule } from '@angular/material';

import { IterablePipe } from './iterable.pipe';
import { AppFormGroupComponent } from './app-form-group/app-form-group.component';
import { AppFormErrorComponent } from './app-form-error/app-form-error.component';

const APP_FORM_DIRECTIVES = [
    AppFormGroupComponent,
    AppFormErrorComponent
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MdInputModule,
        MdIconModule
    ],
    declarations: [
        APP_FORM_DIRECTIVES,
        IterablePipe
    ],
    exports: [
        APP_FORM_DIRECTIVES
    ]
})
export class AppFormModule {

}