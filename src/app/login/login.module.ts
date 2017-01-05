import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule
} from '@angular/material';

import { FormModule } from '../form/form.module';
import { LoginComponent } from './login.component';
import { RoutingModule } from '../routing/routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdProgressSpinnerModule,
        RoutingModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {



}
