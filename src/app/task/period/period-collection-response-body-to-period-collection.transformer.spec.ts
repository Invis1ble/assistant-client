/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period-collection-response-body-to-period-collection.transformer';

describe('PeriodCollectionResponseBodyToPeriodCollectionTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PeriodCollectionResponseBodyToPeriodCollectionTransformer]
        });
    });

    it('should ...', inject([PeriodCollectionResponseBodyToPeriodCollectionTransformer], (service: PeriodCollectionResponseBodyToPeriodCollectionTransformer) => {
        expect(service).toBeTruthy();
    }));
});
