import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdCardModule, MdIconModule, MdMenuModule } from '@angular/material';

import { DurationPipe } from '../shared/duration.pipe';
import { PeriodLocationToPeriodModelTransformer } from './period/period-location-to-period-model.transformer';
import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period/period-collection-response-body-to-period-collection.transformer';
import { PeriodModelToPeriodRequestBodyTransformer } from './period/period-model-to-period-request-body.transformer';
import { PeriodResponseBodyToPeriodModelTransformer } from './period/period-response-body-to-period-model.transformer';
import { PeriodService } from './period/period.service';
import { TaskComponent } from './task.component';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';
import { TaskLocationToTaskModelTransformer } from './task-location-to-task-model.transformer';
import { TaskModelToUpdateTaskRequestBodyTransformer } from './task-model-to-update-task-request-body.transformer';
import { TaskModelToCreateTaskRequestBodyTransformer } from './task-model-to-create-task-request-body.transformer';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';
import { TaskService } from './task.service';
import { TaskEventBus } from './task.event-bus';

@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        MdIconModule,
        MdMenuModule
    ],
    providers: [
        PeriodLocationToPeriodModelTransformer,
        PeriodCollectionResponseBodyToPeriodCollectionTransformer,
        PeriodModelToPeriodRequestBodyTransformer,
        PeriodResponseBodyToPeriodModelTransformer,
        PeriodService,
        TaskCollectionResponseBodyToTaskCollectionTransformer,
        TaskEventBus,
        TaskLocationToTaskModelTransformer,
        TaskModelToCreateTaskRequestBodyTransformer,
        TaskModelToUpdateTaskRequestBodyTransformer,
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
