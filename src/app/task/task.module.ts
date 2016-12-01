import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdCardModule, MdIconModule, MdMenuModule } from '@angular/material';

import { DurationPipe } from '../shared/duration.pipe';
import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period/period-collection-response-body-to-period-collection.transformer';
import { PeriodModelToPeriodRequestBodyTransformer } from './period/period-model-to-period-request-body.transformer';
import { PeriodResponseBodyToPeriodModelTransformer } from './period/period-response-body-to-period-model.transformer';
import { PeriodService } from './period/period.service';
import { TaskComponent } from './task.component';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';
import { TaskModelToTaskRequestBodyTransformer } from './task-model-to-task-request-body.transformer';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';
import { TaskService } from './task.service';

@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        MdIconModule,
        MdMenuModule
    ],
    providers: [
        PeriodCollectionResponseBodyToPeriodCollectionTransformer,
        PeriodModelToPeriodRequestBodyTransformer,
        PeriodResponseBodyToPeriodModelTransformer,
        PeriodService,
        TaskCollectionResponseBodyToTaskCollectionTransformer,
        TaskModelToTaskRequestBodyTransformer,
        TaskResponseBodyToTaskModelTransformer,
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
