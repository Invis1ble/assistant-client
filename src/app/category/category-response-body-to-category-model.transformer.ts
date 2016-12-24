import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { CategoryModel } from './category.model';
import { CategoryResponseBody } from './category.response-body';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from '../task/task-collection-response-body-to-task-collection.transformer';
import { isPresent } from '../facade/lang';

@Injectable()
export class CategoryResponseBodyToCategoryModelTransformer implements Transformer<CategoryResponseBody, CategoryModel> {

    constructor(
        private responseToCollectionTransformer: TaskCollectionResponseBodyToTaskCollectionTransformer
    ) {

    }

    transform(data: CategoryResponseBody): CategoryModel {
        if (!isPresent(data.tasks)) {
            data.tasks = {
                entities: []
            };
        }

        return new CategoryModel(
            data.id,
            data.name,
            data.description,
            data.rate,
            this.responseToCollectionTransformer.transform(data.tasks)
        );
    }

}
