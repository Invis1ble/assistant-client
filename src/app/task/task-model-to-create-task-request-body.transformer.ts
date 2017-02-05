import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { TaskModel } from './task.model';
import { TaskRequestBody } from './task.request-body';

@Injectable()
export class TaskModelToCreateTaskRequestBodyTransformer implements Transformer<TaskModel, TaskRequestBody> {

    transform(task: TaskModel): TaskRequestBody {
        return {
            title: task.title,
            description: task.description,
            rate: task.rate
        };
    }

}
