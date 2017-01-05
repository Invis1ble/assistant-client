/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryModelToCategoryRequestBodyTransformer } from './category-model-to-category-request-body.transformer';

describe('CategoryModelToCategoryRequestBodyTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CategoryModelToCategoryRequestBodyTransformer]
        });
    });

    it('should ...', inject([CategoryModelToCategoryRequestBodyTransformer], (service: CategoryModelToCategoryRequestBodyTransformer) => {
        expect(service).toBeTruthy();
    }));
});
