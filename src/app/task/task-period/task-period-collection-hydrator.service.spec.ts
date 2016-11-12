/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskPeriodCollectionHydratorService } from './task-period-collection-hydrator.service';

describe('Service: TaskPeriodCollectionHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskPeriodCollectionHydratorService]
        });
    });

    it('should ...', inject([TaskPeriodCollectionHydratorService], (service: TaskPeriodCollectionHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
