import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdCardModule, MdIconModule, MdMenuModule } from '@angular/material';

import { DurationPipe } from '../shared/duration.pipe';
import { TaskCollectionHydratorService } from './task-collection-hydrator.service';
import { TaskComponent } from './task.component';
import { TaskHydratorService } from './task-hydrator.service';
import { TaskPeriodCollectionHydratorService } from './task-period/task-period-collection-hydrator.service';
import { TaskPeriodHydratorService } from './task-period/task-period-hydrator.service';
import { TaskPeriodService } from './task-period/task-period.service';
import { TaskService } from './task.service';

@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        MdIconModule,
        MdMenuModule
    ],
    providers: [
        TaskCollectionHydratorService,
        TaskHydratorService,
        TaskPeriodCollectionHydratorService,
        TaskPeriodHydratorService,
        TaskPeriodService,
        TaskService
    ],
    declarations: [
        DurationPipe,
        TaskComponent
    ],
    exports: [
        TaskComponent
    ]
})
export class TaskModule {



}
