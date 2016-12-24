import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { CategoryCollection } from './category.collection';
import { CategoryCollectionResponseBody } from './category-collection.response-body';
import { CategoryResponseBodyToCategoryModelTransformer } from './category-response-body-to-category-model.transformer';

@Injectable()
export class CategoryCollectionResponseBodyToCategoryCollectionTransformer implements Transformer<CategoryCollectionResponseBody, CategoryCollection> {

    constructor(
        private responseToModelTransformer: CategoryResponseBodyToCategoryModelTransformer
    ) {

    }

    transform(data: CategoryCollectionResponseBody): CategoryCollection {
        return new CategoryCollection(
            data.entities.map(this.responseToModelTransformer.transform, this.responseToModelTransformer)
        );
    }

}
