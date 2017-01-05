import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period/period-collection-response-body-to-period-collection.transformer';
import { TaskModel } from './task.model';
import { TaskResponseBody } from './task.response-body';
import { isPresent } from '../facade/lang';

@Injectable()
export class TaskResponseBodyToTaskModelTransformer implements Transformer<TaskResponseBody, TaskModel> {

    constructor(
        private responseToCollectionTransformer: PeriodCollectionResponseBodyToPeriodCollectionTransformer
    ) {

    }

    transform(data: TaskResponseBody): TaskModel {
        if (!isPresent(data.periods)) {
            data.periods = {
                entities: []
            };
        }

        return new TaskModel(
            data.id,
            data.title,
            data.description,
            data.rate,
            new Date(data.createdAt * 1000),
            data.categoryId,
            this.responseToCollectionTransformer.transform(data.periods)
        );
    }

}
