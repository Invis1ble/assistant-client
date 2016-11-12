/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskPeriodHydratorService } from './task-period-hydrator.service';

describe('Service: TaskPeriodHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskPeriodHydratorService]
        });
    });

    it('should ...', inject([TaskPeriodHydratorService], (service: TaskPeriodHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
