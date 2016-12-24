/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryCollectionResponseBodyToCategoryCollectionTransformer } from './category-collection-response-body-to-category-collection.transformer';

describe('CategoryCollectionResponseBodyToCategoryCollectionTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CategoryCollectionResponseBodyToCategoryCollectionTransformer]
        });
    });

    it('should ...', inject([CategoryCollectionResponseBodyToCategoryCollectionTransformer], (service: CategoryCollectionResponseBodyToCategoryCollectionTransformer) => {
        expect(service).toBeTruthy();
    }));
});
