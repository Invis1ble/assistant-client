/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskHydratorService } from './task-hydrator.service';

describe('Service: TaskHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskHydratorService]
        });
    });

    it('should ...', inject([TaskHydratorService], (service: TaskHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
