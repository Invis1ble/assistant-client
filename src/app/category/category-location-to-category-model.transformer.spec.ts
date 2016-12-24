/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryLocationToCategoryModelTransformer } from './category-location-to-category-model.transformer';

describe('CategoryLocationToCategoryModelTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CategoryLocationToCategoryModelTransformer]
        });
    });

    it('should ...', inject([CategoryLocationToCategoryModelTransformer], (service: CategoryLocationToCategoryModelTransformer) => {
        expect(service).toBeTruthy();
    }));
});
