import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdProgressCircleModule
} from '@angular/material';

import { FormModule } from '../form/form.module';
import { TaskFormComponent } from './task-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        MdButtonModule,
        MdDialogModule,
        MdInputModule,
        MdProgressCircleModule
    ],
    entryComponents: [
        TaskFormComponent
    ],
    declarations: [
        TaskFormComponent
    ]
})
export class TaskFormModule {



}
