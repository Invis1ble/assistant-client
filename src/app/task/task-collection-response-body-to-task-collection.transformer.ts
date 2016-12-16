import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { TaskCollection } from './task.collection';
import { TaskCollectionResponseBody } from './task-collection.response-body';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';

@Injectable()
export class TaskCollectionResponseBodyToTaskCollectionTransformer implements Transformer<TaskCollectionResponseBody, TaskCollection> {

    constructor(
        private responseToModelTransformer: TaskResponseBodyToTaskModelTransformer
    ) {

    }

    transform(data: TaskCollectionResponseBody): TaskCollection {
        return new TaskCollection(
            data.entities.map(this.responseToModelTransformer.transform, this.responseToModelTransformer)
        );
    }

}
