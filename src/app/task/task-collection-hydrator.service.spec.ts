/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskCollectionHydratorService } from './task-collection-hydrator.service';

describe('Service: TaskCollectionHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskCollectionHydratorService]
        });
    });

    it('should ...', inject([TaskCollectionHydratorService], (service: TaskCollectionHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
