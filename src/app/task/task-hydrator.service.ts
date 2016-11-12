import { Injectable } from '@angular/core';

import { Task } from './task';
import { TaskPeriodCollectionHydratorService } from './task-period/task-period-collection-hydrator.service';
import { TaskRequestBody } from './task.request-body';
import { TaskResponseBody } from './task.response-body';
import { isPresent } from '../facade/lang';

@Injectable()
export class TaskHydratorService {

    constructor(
        private taskPeriodCollectionHydrator: TaskPeriodCollectionHydratorService
    ) {

    }

    hydrate(data: TaskResponseBody): Task {
        if (!isPresent(data.periods)) {
            data.periods = {
                entities: []
            };
        }

        return new Task(
            data.id,
            data.title,
            data.description,
            data.rate,
            new Date(data.createdAt * 1000),
            this.taskPeriodCollectionHydrator.hydrate(data.periods)
        );
    }

    dehydrate(task: Task): TaskRequestBody {
        return {
            title: task.title,
            description: task.description,
            rate: task.rate
        };
    }

}
