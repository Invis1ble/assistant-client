/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskPeriodService } from './task-period.service';

describe('Service: TaskPeriod', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskPeriodService]
        });
    });

    it('should ...', inject([TaskPeriodService], (service: TaskPeriodService) => {
        expect(service).toBeTruthy();
    }));
});
