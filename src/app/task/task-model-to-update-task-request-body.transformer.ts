import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { TaskModel } from './task.model';
import { TaskRequestBody } from './task.request-body';

@Injectable()
export class TaskModelToUpdateTaskRequestBodyTransformer implements Transformer<TaskModel, TaskRequestBody> {

    transform(task: TaskModel): TaskRequestBody {
        return {
            title: task.title,
            description: task.description,
            rate: task.rate,
            category: task.categoryId
        };
    }

}
