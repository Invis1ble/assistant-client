/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeriodResponseBodyToPeriodModelTransformer } from './period-response-body-to-period-model.transformer';

describe('PeriodResponseBodyToPeriodModelTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PeriodResponseBodyToPeriodModelTransformer]
        });
    });

    it('should ...', inject([PeriodResponseBodyToPeriodModelTransformer], (service: PeriodResponseBodyToPeriodModelTransformer) => {
        expect(service).toBeTruthy();
    }));
});
