/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryResponseBodyToCategoryModelTransformer } from './category-response-body-to-category-model.transformer';

describe('CategoryResponseBodyToCategoryModelTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CategoryResponseBodyToCategoryModelTransformer]
        });
    });

    it('should ...', inject([CategoryResponseBodyToCategoryModelTransformer], (service: CategoryResponseBodyToCategoryModelTransformer) => {
        expect(service).toBeTruthy();
    }));
});
