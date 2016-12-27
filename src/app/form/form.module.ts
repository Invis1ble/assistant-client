import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdIconModule } from '@angular/material';

import { FormErrorComponent } from './form-error/form-error.component';
import { FormControlContainerComponent } from './form-control-container/form-control-container.component';
import { IterablePipe } from './form-error/iterable.pipe';

const FORM_DIRECTIVES = [
    FormControlContainerComponent,
    FormErrorComponent
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MdIconModule
    ],
    declarations: [
        FORM_DIRECTIVES,
        IterablePipe
    ],
    exports: [
        FORM_DIRECTIVES,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FormModule {



}
