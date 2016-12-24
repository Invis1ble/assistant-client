import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdIconModule,
    MdProgressCircleModule
} from '@angular/material';

import { TaskFormModule } from '../task-form/task-form.module';
import { TaskListComponent } from './task-list.component';
import { TaskModule } from '../task/task.module';

@NgModule({
    imports: [
        CommonModule,
        TaskFormModule,
        TaskModule,
        MdButtonModule,
        MdIconModule,
        MdProgressCircleModule
    ],
    declarations: [
        TaskListComponent
    ]
})
export class TaskListModule {



}
