import { NgModule } from '@angular/core';

import { FormErrorComponent } from './form-error/form-error.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { IterablePipe } from './form-error/iterable.pipe';
import { MdIconModule, MdInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const FORM_DIRECTIVES = [
    FormGroupComponent,
    FormErrorComponent
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
