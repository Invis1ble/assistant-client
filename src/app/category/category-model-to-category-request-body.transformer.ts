import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { CategoryModel } from './category.model';
import { CategoryRequestBody } from './category.request-body';

@Injectable()
export class CategoryModelToCategoryRequestBodyTransformer implements Transformer<CategoryModel, CategoryRequestBody> {

    transform(task: CategoryModel): CategoryRequestBody {
        return {
            name: task.name,
            description: task.description,
            rate: task.rate
        };
    }

}
