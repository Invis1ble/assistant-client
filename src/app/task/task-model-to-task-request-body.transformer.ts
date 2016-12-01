import { Injectable } from '@angular/core';

import { TaskModel } from './task.model';
import { TaskRequestBody } from './task.request-body';

@Injectable()
export class TaskModelToTaskRequestBodyTransformer {

    transform(task: TaskModel): TaskRequestBody {
        return {
            title: task.title,
            description: task.description,
            rate: task.rate
        };
    }

}
