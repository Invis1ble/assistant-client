import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule
} from '@angular/material';

import { FormModule } from '../form/form.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdProgressSpinnerModule
    ],
    declarations: [
        RegistrationComponent
    ]
})
export class RegistrationModule {



}
